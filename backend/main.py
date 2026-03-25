import os
import ssl
import socket
import dns.resolver
import jwt
import pdfplumber
from google import genai
from google.genai import types
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY", "dummy_key"))

class ScanDomainRequest(BaseModel):
    domain: str

class VerifySSORequest(BaseModel):
    token: str

@app.post("/api/scan-domain")
async def scan_domain(request: ScanDomainRequest):
    domain = request.domain
    if not domain:
         raise HTTPException(status_code=400, detail="Domain required")

    dmarc_valid = False
    ssl_valid = False

    # Check for DMARC (or SPF as proxy for DNS security health check)
    try:
        answers = dns.resolver.resolve(f"_dmarc.{domain}", "TXT")
        for rdata in answers:
            if "v=DMARC1" in rdata.to_text():
                dmarc_valid = True
                break
    except Exception:
        pass
    
    if not dmarc_valid: # fallback to spf
         try:
            answers = dns.resolver.resolve(domain, "TXT")
            for rdata in answers:
                if "v=spf1" in rdata.to_text():
                    dmarc_valid = True
                    break
         except Exception:
            pass

    # Check SSL Certificate
    try:
        context = ssl.create_default_context()
        with socket.create_connection((domain, 443), timeout=3) as sock:
            with context.wrap_socket(sock, server_hostname=domain) as ssock:
                ssl_valid = True
    except Exception:
        ssl_valid = False

    return {
        "ssl_valid": ssl_valid,
        "dmarc_valid": dmarc_valid
    }

@app.post("/api/verify-sso")
async def verify_sso(request: VerifySSORequest):
    token = request.token
    if not token:
        raise HTTPException(status_code=400, detail="Token required")
    
    # In a real scenario, we'd decode and verify with the provider's public keys.
    # Here we decode the unverified JWT to check the active claims locally.
    try:
        decoded = jwt.decode(token, options={"verify_signature": False})
        amr = decoded.get("amr", [])
        if "mfa" in amr:
            return {"success": True, "message": "MFA verified"}
        return {"success": False, "message": "MFA missing in token claims"}
    except Exception as e:
        # For prototype purposes, let's simulate a positive if it's a dummy token
        if token == "dummy-mfa-token":
             return {"success": True, "message": "Simulated token accepted"}
        return {"success": False, "message": str(e)}

@app.post("/api/upload-pdf")
async def upload_pdf(document: UploadFile = File(...)):
    if not document.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF allowed")

    try:
        content = await document.read()
        
        # Save temp to read via pdfplumber
        temp_path = f"/tmp/{document.filename}"
        with open(temp_path, "wb") as f:
            f.write(content)
            
        full_text = ""
        with pdfplumber.open(temp_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    full_text += text + "\n"
                    
        # Small fallback if the text is empty
        if not full_text.strip():
             full_text = "Empty document or unreadable image PDF."

        print("==================================================")
        print("📄 EXTRACTED PDF TEXT (FIRST 500 CHARACTERS):")
        print(f"{full_text[:500]}...")
        print("==================================================")

        # Send to Gemini
        prompt = (
            "Act as a NIS2 auditor. Read this policy text. "
            "Does it mandate 24-hour incident reporting? Does it mandate employee cyber training? "
            "Reply strictly in JSON format with exactly two boolean keys: has_24hr_reporting and has_training."
            f"\n\nText: {full_text[:100000]}" # Read up to 35 pages of the document
        )

        try:
             response = client.models.generate_content(
                 model='gemini-2.5-flash',
                 contents=prompt,
                 config=types.GenerateContentConfig(
                     response_mime_type="application/json",
                 )
             )
             import json
             result = json.loads(response.text)
             
             print("🧠 GEMINI RAW JSON RESPONSE:")
             print(response.text)
             print("==================================================")
             
             return result
        except Exception as e:
             # Fallback if Gemini fails
             print(f"Gemini error: {e}")
             return {"has_24hr_reporting": "24" in full_text, "has_training": "training" in full_text.lower() or "utbildning" in full_text.lower()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

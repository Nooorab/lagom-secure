import React, { useState } from 'react';
import { Lock, FileText, Search, ArrowRight, ShieldCheck, CheckCircle, Activity, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const SupplierPortal = () => {
  const [step, setStep] = useState(1);
  const [authToken, setAuthToken] = useState('');
  const [domain, setDomain] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const [ssoLoading, setSsoLoading] = useState(false);

  // 1. SSO Login simulation
  const handleLogin = async (e) => {
    e?.preventDefault();
    setSsoLoading(true);

    // Simulate 2000ms network latency
    setTimeout(async () => {
      try {
        const res = await fetch('https://lagom-secure.onrender.com/api/verify-sso', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: "dummy-mfa-token" })
        });
        const data = await res.json();
        if (data.success) {
          setStep(2);
        } else {
          alert("SSO Verification failed: " + data.message);
        }
      } catch (err) {
        console.error(err);
        alert("SSO Verification failed check console");
      } finally {
        setSsoLoading(false);
      }
    }, 2000);
  };

  // 2. Scan Domain
  const handleScan = async (e) => {
    e.preventDefault();
    setScanLoading(true);
    try {
      const res = await fetch('https://lagom-secure.onrender.com/api/scan-domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain })
      });
      const data = await res.json();
      setScanResult(data);
    } catch (err) {
      console.error(err);
      alert("Scan failed check console");
    }
    setScanLoading(false);
  };

  // 3. Document AI Upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadLoading(true);
    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await fetch('https://lagom-secure.onrender.com/api/upload-pdf', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setAiAnalysis(data);
    } catch (err) {
      console.error(err);
      alert("Upload failed check console");
    }
    setUploadLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 animate-fade-in text-white font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 text-white">Interactive Verification Portal</h1>
        <p className="text-gray-400 text-lg">Live API verification of SSO, Infrastructure, and Policies.</p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-6 mb-10">
        {[1, 2, 3].map(i => (
          <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${step >= i ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'border-gray-700 text-gray-500 bg-gray-900/50'}`}>
            {i}
          </div>
        ))}
      </div>

      {/* Step 1: SSO */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-10 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <Lock size={48} className="mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-3">1. Identity & Access</h2>
            <p className="text-gray-400 text-lg">Connect your enterprise identity provider to securely authenticate and verify MFA claims.</p>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLogin}
              disabled={ssoLoading}
              className="w-full max-w-md bg-[#242424] hover:bg-[#333333] border border-[#0078D4]/40 hover:border-[#0078D4] text-white font-medium py-5 px-6 rounded-xl transition-all flex justify-center items-center gap-4 shadow-[0_4px_20px_rgba(0,120,212,0.15)] disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <div className="grid grid-cols-2 gap-[3px] p-0.5 pointer-events-none">
                <div className="w-3 h-3 bg-[#F25022]"></div>
                <div className="w-3 h-3 bg-[#7FBA00]"></div>
                <div className="w-3 h-3 bg-[#00A4EF]"></div>
                <div className="w-3 h-3 bg-[#FFB900]"></div>
              </div>
              {ssoLoading ? (
                <>
                  <Activity className="animate-spin text-[#0078D4]" size={22} />
                  <span className="text-lg">Awaiting Identity Provider...</span>
                </>
              ) : (
                <span className="text-lg font-semibold tracking-wide">Authenticate via Microsoft Entra ID</span>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Scan */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">2. Network Telemetry Scan</h2>
            <button onClick={() => setStep(3)} className="text-sm px-4 py-2 border border-white/10 rounded hover:bg-white/5 transition-colors">Skip <ArrowRight size={14} className="inline ml-1" /></button>
          </div>
          <p className="text-gray-400 mb-6">Checking live domain for TLS/SSL certificates and DMARC/SPF presence.</p>

          <form onSubmit={handleScan} className="flex gap-4 mb-8">
            <input type="text" className="flex-1 bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary" placeholder="e.g. volvo.com" value={domain} onChange={e => setDomain(e.target.value)} required />
            <button type="submit" className="bg-primary hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50" disabled={scanLoading}>
              {scanLoading ? 'Scanning...' : 'Scan Domain'} <Search size={18} />
            </button>
          </form>

          {scanResult && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-black/30 border border-white/10 rounded-xl space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="font-bold text-lg">Results for {domain}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${scanResult.ssl_valid && scanResult.dmarc_valid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {scanResult.ssl_valid && scanResult.dmarc_valid ? 'Secure' : 'Issues Found'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-sm text-gray-400 mb-1">SSL Certificate</p>
                  <p className={`font-medium ${scanResult.ssl_valid ? 'text-green-400' : 'text-red-400'}`}>{scanResult.ssl_valid ? 'Valid & Active' : 'Invalid or Missing'}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-sm text-gray-400 mb-1">DMARC/SPF Records</p>
                  <p className={`font-medium ${scanResult.dmarc_valid ? 'text-green-400' : 'text-red-400'}`}>{scanResult.dmarc_valid ? 'Present (Protected)' : 'Missing/Misconfigured'}</p>
                </div>
              </div>
              <button onClick={() => setStep(3)} className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-lg transition-all">Proceed to AI Audit</button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Step 3: AI Document Scan */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <FileText size={48} className="mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold">3. Hybrid Evidence AI Engine</h2>
            <p className="text-gray-400 mt-2">Upload your security PDF. We use Advanced Semantic AI to verify exact NIS2 mandates.</p>
          </div>

          {!aiAnalysis && (
            <div className="border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 transition-colors rounded-xl p-12 text-center relative">
              <input type="file" accept=".pdf" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-transparent file:hidden z-50" disabled={uploadLoading} />
              {uploadLoading ? (
                <div className="flex flex-col items-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="mb-4">
                    <Activity size={32} className="text-primary" />
                  </motion.div>
                  <h3 className="font-medium text-lg text-white">Extracting & Analyzing...</h3>
                  <p className="text-sm text-gray-400">Communicating with OpenAI API</p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-xl mb-2 text-white">Drag & Drop PDF here</p>
                  <p className="text-gray-400 text-sm">Validating 24-hour reporting & cyber training policies</p>
                </div>
              )}
            </div>
          )}

          {aiAnalysis && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center gap-4 p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="p-3 bg-green-500/20 rounded-full">
                  <ShieldCheck size={32} className="text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-400">AI Audit Complete</h3>
                  <p className="text-sm text-green-200">Extracted requirements matched against NIS2 obligations.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className={`p-5 rounded-r-lg border-l-4 ${aiAnalysis.has_24hr_reporting ? 'border-green-500 bg-black/40' : 'border-red-500 bg-black/40'}`}>
                  <div className="flex justify-between mb-2">
                    <h5 className="font-bold">24-Hour Incident Reporting</h5>
                    <span className={aiAnalysis.has_24hr_reporting ? 'text-green-400 font-medium text-sm' : 'text-red-400 font-medium text-sm'}>{aiAnalysis.has_24hr_reporting ? 'Pass' : 'Fail'}</span>
                  </div>
                  <p className="text-sm text-gray-400">Does the policy explicitly mandate reporting incidents to MSB within 24 hours?</p>
                </div>

                <div className={`p-5 rounded-r-lg border-l-4 ${aiAnalysis.has_training ? 'border-green-500 bg-black/40' : 'border-red-500 bg-black/40'}`}>
                  <div className="flex justify-between mb-2">
                    <h5 className="font-bold">Mandatory Employee Cyber Training</h5>
                    <span className={aiAnalysis.has_training ? 'text-green-400 font-medium text-sm' : 'text-red-400 font-medium text-sm'}>{aiAnalysis.has_training ? 'Pass' : 'Fail'}</span>
                  </div>
                  <p className="text-sm text-gray-400">Does the policy require all staff to undergo regular security awareness training?</p>
                </div>
              </div>

              <div className="text-center mt-8">
                <button onClick={() => setStep(4)} className="bg-primary hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-primary/30 transition-all">Submit Evidence Pack to Customer</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Step 4: Final Screen */}
      {step === 4 && (() => {
        const allPassed = aiAnalysis?.has_24hr_reporting && aiAnalysis?.has_training && scanResult?.ssl_valid && scanResult?.dmarc_valid;
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`p-12 text-center rounded-2xl bg-gray-900/60 backdrop-blur-xl border flex flex-col items-center mt-10 ${allPassed ? 'border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.15)]' : 'border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.15)]'}`}>
            {allPassed ? (
              <>
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle size={48} className="text-green-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white">Evidence Successfully Submitted and Verified</h2>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">Your NIS2 compliance data has been securely routed to your enterprise customer.</p>
              </>
            ) : (
              <>
                <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mb-6 border border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  <AlertTriangle size={48} className="text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white">Report Submitted to Enterprise: Action Required</h2>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">Your compliance report has been shared with your buyer, but critical NIS2 gaps were found. Please review the highlighted failures and upload a revised policy.</p>
              </>
            )}
            <a href="/" className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center gap-2 border border-white/10">
              Close Portal <ArrowRight size={18} />
            </a>
          </motion.div>
        );
      })()}
    </div>
  );
};

export default SupplierPortal;

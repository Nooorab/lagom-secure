import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "dashboard": "Enterprise Dashboard",
        "portal": "Supplier Portal",
        "footer": "© 2026 KLARA Prototype. Built for Swedish Security."
      },
      "landing": {
        "hero_title": "Verifiable, AI-Driven",
        "hero_highlight": "Supply Chain Compliance",
        "hero_desc": "Moving the market from \"blind trust\" to verifiable proof. KLARA automates the administrative burden of vetting thousands of suppliers against NIS2 requirements.",
        "features_title": "The AI-Driven Evidence Engine",
        "feat1_title": "1. Secure Ingestion",
        "feat1_desc": "Ingests key internal security documents directly from suppliers, protecting sensitive data within Swedish borders.",
        "feat2_title": "2. Semantic Analysis",
        "feat2_desc": "Pre-audits documentation against NIS2 requirements using advanced sovereign AI models.",
        "feat3_title": "3. Evidence Output",
        "feat3_desc": "Generates structured compliance evidence reports mapping content directly to legal obligations.",
        "team_title": "Our Team",
        "role_comm": "Communication & Compliance",
        "role_biz": "Business & Market",
        "role_tech": "Tech Architecture"
      },
      "dashboard": {
        "title": "Enterprise Dashboard",
        "subtitle": "Supply Chain NIS2 Compliance Overview",
        "system_active": "System Active",
        "stat_total": "Total Suppliers",
        "stat_pass": "Compliant (Pass)",
        "stat_pending": "Pending Review",
        "stat_fail": "Non-Compliant (Fail)",
        "list_title": "Connected Suppliers",
        "col_name": "Supplier Name",
        "col_status": "NIS2 Status",
        "col_date": "Last Checked",
        "col_action": "Action",
        "btn_details": "View Details",
        "lbl_pass": "Pass",
        "lbl_fail": "Fail",
        "lbl_pending": "Pending"
      },
      "portal": {
        "title": "Interactive Verification Portal",
        "subtitle": "Live API verification of SSO, Infrastructure, and Policies.",
        "step1_title": "1. Identity & Access",
        "step1_desc": "Connect your enterprise identity provider to securely authenticate and verify MFA claims.",
        "btn_sso_wait": "Awaiting Identity Provider...",
        "btn_sso": "Authenticate via Microsoft Entra ID",
        "step2_title": "2. Network Telemetry Scan",
        "step2_desc": "Checking live domain for TLS/SSL certificates and DMARC/SPF presence.",
        "btn_skip": "Skip",
        "placeholder_domain": "e.g. volvo.com",
        "btn_scan_load": "Scanning...",
        "btn_scan": "Scan Domain",
        "res_title": "Results for",
        "res_secure": "Secure",
        "res_issues": "Issues Found",
        "lbl_ssl": "SSL Certificate",
        "val_ssl_pass": "Valid & Active",
        "val_ssl_fail": "Invalid or Missing",
        "lbl_dns": "DMARC/SPF Records",
        "val_dns_pass": "Present (Protected)",
        "val_dns_fail": "Missing/Misconfigured",
        "btn_proceed": "Proceed to AI Audit",
        "step3_title": "3. Hybrid Evidence AI Engine",
        "step3_desc": "Upload your security PDF. We use Advanced Semantic AI to verify exact NIS2 mandates.",
        "upload_load": "Extracting & Analyzing...",
        "upload_sub": "Communicating with AI API",
        "upload_drag": "Drag & Drop PDF here",
        "upload_hint": "Validating 24-hour reporting & cyber training policies",
        "audit_complete": "AI Audit Complete",
        "audit_sub": "Extracted requirements matched against NIS2 obligations.",
        "chk1_title": "24-Hour Incident Reporting",
        "chk1_pass": "Pass",
        "chk1_fail": "Fail",
        "chk1_desc": "Does the policy explicitly mandate reporting incidents to MSB within 24 hours?",
        "chk2_title": "Mandatory Employee Cyber Training",
        "chk2_pass": "Pass",
        "chk2_fail": "Fail",
        "chk2_desc": "Does the policy require all staff to undergo regular security awareness training?",
        "btn_submit": "Submit Evidence Pack to Customer",
        "success_title": "Evidence Successfully Submitted and Verified",
        "success_desc": "Your NIS2 compliance data has been securely routed to your enterprise customer.",
        "fail_title": "Report Submitted to Enterprise: Action Required",
        "fail_desc": "Your compliance report has been shared with your buyer, but critical NIS2 gaps were found. Please review the highlighted failures and upload a revised policy.",
        "btn_close": "Close Portal"
      }
    }
  },
  sv: {
    translation: {
      "nav": {
        "dashboard": "Företagsöversikt",
        "portal": "Leverantörsportal",
        "footer": "© 2026 KLARA Prototyp. Byggd för Svensk Säkerhet."
      },
      "landing": {
        "hero_title": "Verifierbar, AI-Driven",
        "hero_highlight": "Leverantörsefterlevnad",
        "hero_desc": "Vi flyttar marknaden från \"blind tillit\" till verifierbara bevis. KLARA automatiserar det administrativa arbetet med att granska tusentals leverantörer mot NIS2-kraven.",
        "features_title": "Vår AI-Drivna Bevis-motor",
        "feat1_title": "1. Säker Datainsamling",
        "feat1_desc": "Samlar in viktiga interna säkerhetsdokument direkt från leverantörer och skyddar känslig data inom Sveriges gränser.",
        "feat2_title": "2. Semantisk Analys",
        "feat2_desc": "Förgranskar dokumentation mot NIS2-kraven med hjälp av avancerade och suveräna AI-modeller.",
        "feat3_title": "3. Bevisgenerering",
        "feat3_desc": "Skapar strukturerade bevisrapporter som mappar innehållet direkt mot juridiska skyldigheter.",
        "team_title": "Vårt Team",
        "role_comm": "Kommunikation & Efterlevnad",
        "role_biz": "Affärer & Marknad",
        "role_tech": "Teknisk Arkitektur"
      },
      "dashboard": {
        "title": "Företagsöversikt",
        "subtitle": "NIS2-efterlevnad för leveranskedjan",
        "system_active": "System Aktivt",
        "stat_total": "Totalt antal leverantörer",
        "stat_pass": "Godkända (Pass)",
        "stat_pending": "Avvaktar Granskning",
        "stat_fail": "Underkända (Fail)",
        "list_title": "Anslutna leverantörer",
        "col_name": "Leverantörsnamn",
        "col_status": "NIS2-status",
        "col_date": "Senast kontrollerad",
        "col_action": "Åtgärd",
        "btn_details": "Visa detaljer",
        "lbl_pass": "Godkänd",
        "lbl_fail": "Underkänd",
        "lbl_pending": "Avvaktar"
      },
      "portal": {
        "title": "Interaktiv Verifieringsportal",
        "subtitle": "Live API-verifiering av SSO, infrastruktur och policys.",
        "step1_title": "1. Identitet & Åtkomst",
        "step1_desc": "Anslut er företagsidentitetsleverantör för säker autentisering och MFA-verifiering.",
        "btn_sso_wait": "Väntar på Identitetsleverantör...",
        "btn_sso": "Autentisera via Microsoft Entra ID",
        "step2_title": "2. Nätverksavsökning",
        "step2_desc": "Kontrollerar domänen efter TLS/SSL-certifikat och DMARC/SPF-konfiguration.",
        "btn_skip": "Hoppa över",
        "placeholder_domain": "t.ex. volvo.com",
        "btn_scan_load": "Skannar...",
        "btn_scan": "Skanna Domän",
        "res_title": "Resultat för",
        "res_secure": "Säker",
        "res_issues": "Kända problem",
        "lbl_ssl": "SSL-certifikat",
        "val_ssl_pass": "Giltigt & Aktivt",
        "val_ssl_fail": "Ogiltigt eller saknas",
        "lbl_dns": "DMARC/SPF-poster",
        "val_dns_pass": "Närvarande (Skyddad)",
        "val_dns_fail": "Saknas/Felkonfigurerad",
        "btn_proceed": "Fortsätt till AI-Granskning",
        "step3_title": "3. Hybrid AI-bevis-motor",
        "step3_desc": "Ladda upp er säkerhetspolicy. Vi använder avancerad semantisk AI för att verifiera NIS2-kraven.",
        "upload_load": "Extraherar & Analyserar...",
        "upload_sub": "Kommunicerar med AI-motorn",
        "upload_drag": "Dra och släpp PDF här",
        "upload_hint": "Validerar krav på 24-timmars incidentrapportering & utbildning",
        "audit_complete": "AI-Granskning Slutförd",
        "audit_sub": "Extraherade krav matchade mot NIS2-skyldigheter.",
        "chk1_title": "24-timmars incidentrapportering",
        "chk1_pass": "Godkänd",
        "chk1_fail": "Underkänd",
        "chk1_desc": "Kräver policyn explicit att incidenter rapporteras till MSB inom 24 timmar?",
        "chk2_title": "Obligatorisk säkerhetsutbildning",
        "chk2_pass": "Godkänd",
        "chk2_fail": "Underkänd",
        "chk2_desc": "Kräver policyn att all personal genomgår regelbunden säkerhetsutbildning?",
        "btn_submit": "Skicka Bevispaket till Kund",
        "success_title": "Bevis Har Skickats och Verifierats",
        "success_desc": "Din NIS2-efterlevnadsdata har dirigerats säkert till din företagskund.",
        "fail_title": "Rapport Skickad till Företag: Åtgärd Krävs",
        "fail_desc": "Din rapport har delats med din köpare, men allvarliga NIS2-brister hittades. Läs igenom bristerna och ladda upp en reviderad policy.",
        "btn_close": "Stäng Portal"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    }
  });

export default i18n;

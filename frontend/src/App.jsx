import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LandingPage from './pages/LandingPage';
import EnterpriseDashboard from './pages/EnterpriseDashboard';
import SupplierPortal from './pages/SupplierPortal';

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('sv') ? 'en' : 'sv';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="app-container">
      <nav className="navbar glass">
        <div className="container">
          <Link to="/" className="logo" style={{ letterSpacing: '-1.5px', fontWeight: '400' }}>
            <Shield size={28} color="#38bdf8" style={{ letterSpacing: 'normal' }} />
            KLΛRA
          </Link>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>{t('nav.dashboard')}</Link>
            <Link to="/portal" className="btn btn-primary">{t('nav.portal')} <ChevronRight size={18} /></Link>
            <button onClick={toggleLanguage} className="btn" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '6px 12px', fontSize: '14px', borderRadius: '16px' }}>
              {i18n.language.startsWith('sv') ? '🇸🇪 SV' : '🇬🇧 EN'}
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<EnterpriseDashboard />} />
          <Route path="/portal" element={<SupplierPortal />} />
        </Routes>
      </main>

      <footer>
        <div className="container footer-content">
          <div className="logo" style={{ fontSize: '1.2rem', letterSpacing: '-1px', fontWeight: '400' }}>
            <Shield size={20} color="#38bdf8" style={{ letterSpacing: 'normal' }} />
            KLΛRA
          </div>
          <p className="nav-link" style={{ fontSize: '0.9rem' }}>{t('nav.footer')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

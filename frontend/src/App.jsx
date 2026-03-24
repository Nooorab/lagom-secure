import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, ChevronRight } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import EnterpriseDashboard from './pages/EnterpriseDashboard';
import SupplierPortal from './pages/SupplierPortal';

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <nav className="navbar glass">
        <div className="container">
          <Link to="/" className="logo">
            <Shield size={28} color="#38bdf8" />
            LagomSecure
          </Link>
          <div className="nav-links">
            <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Enterprise Dashboard</Link>
            <Link to="/portal" className="btn btn-primary">Supplier Portal <ChevronRight size={18} /></Link>
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
          <div className="logo" style={{ fontSize: '1.2rem' }}>
            <Shield size={20} color="#38bdf8" />
            LagomSecure
          </div>
          <p className="nav-link" style={{ fontSize: '0.9rem' }}>© 2026 LagomSecure Prototype. Built for Swedish Security.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

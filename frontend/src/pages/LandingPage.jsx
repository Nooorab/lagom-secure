import React from 'react';
import { Shield, CheckCircle, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="container mt-8 animate-fade-in">
        <div className="grid-2 align-center">
          <div className="hero-text">
            <h1 style={{ fontSize: '3.5rem', marginBottom: '24px' }}>
              Verifiable, AI-Driven <br />
              <span style={{ color: 'var(--primary)' }}>Supply Chain Compliance</span>
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '32px', maxWidth: '500px' }}>
              Moving the market from "blind trust" to verifiable proof. KLARA automates the administrative burden of vetting thousands of suppliers against NIS2 requirements.
            </p>
            <div className="flex gap-4">
              <Link to="/dashboard" className="btn btn-primary">View Enterprise Dashboard</Link>
              <Link to="/portal" className="btn btn-secondary">Supplier Portal</Link>
            </div>
          </div>
          <div className="hero-image glass-card" style={{ padding: '0', overflow: 'hidden', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <img src="/images/hero_bg.webp" alt="KLARA Abstract Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000' }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mt-8 animate-fade-in delay-200" style={{ paddingTop: '80px' }}>
        <h2 className="text-center mb-8" style={{ fontSize: '2.5rem' }}>The AI-Driven Evidence Engine</h2>
        <div className="grid-3">
          <div className="glass-card text-center">
            <div style={{ display: 'inline-block', padding: '16px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '50%', marginBottom: '20px' }}>
              <Shield size={32} color="var(--primary)" />
            </div>
            <h3 className="mb-4">1. Secure Ingestion</h3>
            <p>Ingests key internal security documents directly from suppliers, protecting sensitive data within Swedish borders.</p>
          </div>
          <div className="glass-card text-center">
            <div style={{ display: 'inline-block', padding: '16px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '50%', marginBottom: '20px' }}>
              <Database size={32} color="var(--primary)" />
            </div>
            <h3 className="mb-4">2. Semantic Analysis</h3>
            <p>Pre-audits documentation against NIS2 requirements using advanced sovereign AI models.</p>
          </div>
          <div className="glass-card text-center">
            <div style={{ display: 'inline-block', padding: '16px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '50%', marginBottom: '20px' }}>
              <CheckCircle size={32} color="var(--success)" />
            </div>
            <h3 className="mb-4">3. Evidence Output</h3>
            <p>Generates structured compliance evidence reports mapping content directly to legal obligations.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mt-8 animate-fade-in delay-300" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <h2 className="text-center mb-8" style={{ fontSize: '2.5rem' }}>Our Team</h2>
        <div className="grid-3">
          {[
            { name: 'Kajsa', role: 'Communication & Compliance' },
            { name: 'Monia', role: 'Business & Market' },
            { name: 'Noor', role: 'Tech Architecture' }
          ].map(member => (
            <motion.div whileHover={{ y: -5 }} className="glass-card text-center" key={member.name} style={{ padding: '40px 24px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.1)', border: '2px solid var(--primary)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '600', color: 'var(--primary)' }}>
                {member.name[0]}
              </div>
              <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{member.name}</h3>
              <p style={{ color: 'var(--primary)', margin: '8px 0 0 0' }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

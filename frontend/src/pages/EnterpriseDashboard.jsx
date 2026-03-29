import React, { useState, useEffect } from 'react';
import { Activity, Users, ShieldAlert, CheckCircle, Clock, Search, Filter, X, Lock, Server, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const EnterpriseDashboard = () => {
  const { t } = useTranslation();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    // Hardcoded mock data for the enterprise overview
    setTimeout(() => {
      setSuppliers([
        { id: '1', name: 'Nordic IT Systems', status: 'Pass', lastChecked: '2026-03-24', gap: 'gap_none', details: { tls: 'Valid', dmarc: 'Protected', p_24hr: 'Pass', p_train: 'Pass' } },
        { id: '2', name: 'Andersson Logistics', status: 'Fail', lastChecked: '2026-03-23', gap: 'gap_invalid', details: { tls: 'Expired Certificate', dmarc: 'Missing Record', p_24hr: 'Pass', p_train: 'Fail (No mandate)' } },
        { id: '3', name: 'Svea Cloud Services', status: 'Pass', lastChecked: '2026-03-22', gap: 'gap_none', details: { tls: 'Valid', dmarc: 'Protected', p_24hr: 'Pass', p_train: 'Pass' } },
        { id: '4', name: 'Dalarna Health Tech', status: 'Pending', lastChecked: '2026-03-24', gap: 'gap_awaiting', details: { tls: 'Valid', dmarc: 'Protected', p_24hr: 'Pending Upload', p_train: 'Pending Upload' } }
      ]);
      setLoading(false);
    }, 600);
  }, []);

  const stats = [
    { label: t('dashboard.stat_total'), value: suppliers.length, icon: Users, color: '#38bdf8' },
    { label: t('dashboard.stat_pass'), value: suppliers.filter(s => s.status === 'Pass').length, icon: CheckCircle, color: '#22c55e' },
    { label: t('dashboard.stat_pending'), value: suppliers.filter(s => s.status === 'Pending').length, icon: Clock, color: '#f59e0b' },
    { label: t('dashboard.stat_fail'), value: suppliers.filter(s => s.status === 'Fail').length, icon: ShieldAlert, color: '#ef4444' }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pass': return <span className="badge badge-pass"><CheckCircle size={14} /> {t('dashboard.lbl_pass')}</span>;
      case 'Fail': return <span className="badge badge-fail"><ShieldAlert size={14} /> {t('dashboard.lbl_fail')}</span>;
      case 'Pending': return <span className="badge badge-pending"><Clock size={14} /> {t('dashboard.lbl_pending')}</span>;
      default: return null;
    }
  };

  return (
    <div className="container animate-fade-in">
      <div className="flex justify-between align-center mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ marginBottom: '8px' }}>{t('dashboard.title')}</h1>
          <p>{t('dashboard.subtitle')}</p>
        </div>
        <div className="badge badge-pass" style={{ fontSize: '1rem', padding: '8px 16px' }}>
          <Activity size={18} /> {t('dashboard.system_active')}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid-3 mb-8" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {stats.map((stat, idx) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem' }}>{stat.label}</p>
                <h2 style={{ margin: 0, fontSize: '2rem' }}>{loading ? '-' : stat.value}</h2>
              </div>
              <div style={{ padding: '12px', background: `rgba(${stat.color === '#ef4444' ? '239, 68, 68' : stat.color === '#22c55e' ? '34, 197, 94' : stat.color === '#f59e0b' ? '245, 158, 11' : '56, 189, 248'}, 0.1)`, borderRadius: '12px' }}>
                <stat.icon size={24} color={stat.color} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Supplier List */}
      <div className="glass-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="m-0 text-xl font-bold">{t('dashboard.list_title')}</h3>
        </div>

        {/* Search & Filter Row */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={t('dashboard.search_placeholder')} 
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
            />
          </div>
          <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
            <Filter size={18} /> {t('dashboard.filter_btn')}
          </button>
        </div>
        {loading ? (
          <div className="text-center" style={{ padding: '40px' }}>Loading...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '16px 8px', fontWeight: '500' }}>{t('dashboard.col_name')}</th>
                  <th style={{ padding: '16px 8px', fontWeight: '500' }}>{t('dashboard.col_status')}</th>
                  <th style={{ padding: '16px 8px', fontWeight: '500' }}>{t('dashboard.col_gap')}</th>
                  <th style={{ padding: '16px 8px', fontWeight: '500' }}>{t('dashboard.col_date')}</th>
                  <th style={{ padding: '16px 8px', fontWeight: '500', textAlign: 'right' }}>{t('dashboard.col_action')}</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(supplier => (
                  <tr key={supplier.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px 8px', fontWeight: '500' }}>{supplier.name}</td>
                    <td style={{ padding: '16px 8px' }}>{getStatusBadge(supplier.status)}</td>
                    <td style={{ padding: '16px 8px' }}>
                      <span className={supplier.gap === 'gap_invalid' ? 'text-red-400 font-medium' : supplier.gap === 'gap_awaiting' ? 'text-yellow-400 font-medium' : 'text-gray-500'}>
                        {t(`dashboard.${supplier.gap}`)}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>{supplier.lastChecked}</td>
                    <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                      <button onClick={() => setSelectedSupplier(supplier)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.875rem' }}>{t('dashboard.btn_details')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Privacy-Preserving Supplier Details Modal */}
      <AnimatePresence>
        {selectedSupplier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
                <div>
                  <h2 className="text-2xl font-bold m-0">{selectedSupplier.name}</h2>
                  <p className="text-gray-400 text-sm mt-1">ID: {selectedSupplier.id} • Last Scan: {selectedSupplier.lastChecked}</p>
                </div>
                <button onClick={() => setSelectedSupplier(null)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Zero-Trust Privacy Info Banner */}
              <div className="bg-primary/10 border-b border-primary/20 p-4 flex gap-3 text-sm">
                <Lock size={20} className="text-primary flex-shrink-0" />
                <p className="text-gray-300 m-0 leading-tight">
                  <strong className="text-white">Zero-Trust Privacy Architecture:</strong> To protect supplier IP, raw security documents are encrypted and hidden. Only verified compliance telemetry and AI remediation summaries are exposed to the Enterprise tier.
                </p>
              </div>

              {/* Details Body */}
              <div className="p-6 space-y-6">
                
                {/* Network Telemetry */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold mb-4 border-b border-white/10 pb-2"><Server size={18} className="text-blue-400" /> Public Infrastructure (Telemetry)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                      <p className="text-gray-400 text-xs uppercase mb-1">TLS / SSL Certificate</p>
                      <p className={`font-semibold ${selectedSupplier.details.tls.includes('Valid') ? 'text-green-400' : 'text-red-400'}`}>{selectedSupplier.details.tls}</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                      <p className="text-gray-400 text-xs uppercase mb-1">DMARC / SPF DNS</p>
                      <p className={`font-semibold ${selectedSupplier.details.dmarc.includes('Protected') ? 'text-green-400' : 'text-red-400'}`}>{selectedSupplier.details.dmarc}</p>
                    </div>
                  </div>
                </div>

                {/* AI Document Audit */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold mb-4 border-b border-white/10 pb-2"><FileText size={18} className="text-purple-400" /> Internal Policy Audit (AI Verified)</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-white/5">
                      <div>
                        <p className="font-semibold text-sm">24-Hour Incident Reporting Mandate</p>
                        {selectedSupplier.details.p_24hr.includes('Fail') && <p className="text-red-400 text-xs mt-1">AI Note: Policy fails to specify a rigid 24-hr timeframe.</p>}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${selectedSupplier.details.p_24hr.includes('Pass') ? 'bg-green-500/20 text-green-400' : selectedSupplier.details.p_24hr.includes('Pending') ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {selectedSupplier.details.p_24hr}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-white/5">
                      <div>
                        <p className="font-semibold text-sm">Mandatory Employee Cyber Training</p>
                        {selectedSupplier.details.p_train.includes('Fail') && <p className="text-red-400 text-xs mt-1">AI Note: Policy explicitly states training is not mandatory.</p>}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${selectedSupplier.details.p_train.includes('Pass') ? 'bg-green-500/20 text-green-400' : selectedSupplier.details.p_train.includes('Pending') ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {selectedSupplier.details.p_train}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-black/40 border-t border-white/10 flex justify-end gap-3">
                <button className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors text-white font-medium flex items-center gap-2">
                  <ShieldAlert size={16} /> Request Remediation
                </button>
                <button onClick={() => setSelectedSupplier(null)} className="px-4 py-2 bg-primary hover:bg-blue-500 rounded-lg text-sm text-white font-medium transition-colors">
                  Close Window
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnterpriseDashboard;

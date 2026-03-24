import React, { useState, useEffect } from 'react';
import { Activity, Users, ShieldAlert, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const EnterpriseDashboard = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded mock data for the enterprise overview
    setTimeout(() => {
      setSuppliers([
        { id: '1', name: 'Nordic IT Systems', status: 'Pass', lastChecked: '2026-03-24' },
        { id: '2', name: 'Andersson Logistics', status: 'Fail', lastChecked: '2026-03-23' },
        { id: '3', name: 'Svea Cloud Services', status: 'Pass', lastChecked: '2026-03-22' },
        { id: '4', name: 'Dalarna Health Tech', status: 'Pending', lastChecked: '2026-03-24' }
      ]);
      setLoading(false);
    }, 600);
  }, []);

  const stats = [
    { label: 'Total Suppliers', value: suppliers.length, icon: Users, color: '#38bdf8' },
    { label: 'Compliant (Pass)', value: suppliers.filter(s => s.status === 'Pass').length, icon: CheckCircle, color: '#22c55e' },
    { label: 'Pending Review', value: suppliers.filter(s => s.status === 'Pending').length, icon: Clock, color: '#f59e0b' },
    { label: 'Non-Compliant (Fail)', value: suppliers.filter(s => s.status === 'Fail').length, icon: ShieldAlert, color: '#ef4444' }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pass': return <span className="badge badge-pass"><CheckCircle size={14} /> Pass</span>;
      case 'Fail': return <span className="badge badge-fail"><ShieldAlert size={14} /> Fail</span>;
      case 'Pending': return <span className="badge badge-pending"><Clock size={14} /> Pending</span>;
      default: return null;
    }
  };

  return (
    <div className="container animate-fade-in">
      <div className="flex justify-between align-center mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ marginBottom: '8px' }}>Enterprise Dashboard</h1>
          <p>Supply Chain NIS2 Compliance Overview</p>
        </div>
        <div className="badge badge-pass" style={{ fontSize: '1rem', padding: '8px 16px' }}>
          <Activity size={18} /> System Active
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
        <h3 className="mb-6">Connected Suppliers</h3>
        {loading ? (
          <div className="text-center" style={{ padding: '40px' }}>Loading suppliers...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '16px 8px', fontWeight: '500' }}>Supplier Name</th>
                  <th style={{ padding: '16px 8px', fontWeight: '500' }}>NIS2 Status</th>
                  <th style={{ padding: '16px 8px', fontWeight: '500' }}>Last Checked</th>
                  <th style={{ padding: '16px 8px', fontWeight: '500', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(supplier => (
                  <tr key={supplier.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px 8px', fontWeight: '500' }}>{supplier.name}</td>
                    <td style={{ padding: '16px 8px' }}>{getStatusBadge(supplier.status)}</td>
                    <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>{supplier.lastChecked}</td>
                    <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                      <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.875rem' }}>View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterpriseDashboard;

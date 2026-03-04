import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:8000/api/v1';

/* ── Mock data (hasta integración con compañero de KPIs) ── */
const kpiData = {
  totalSolicitudes: 1245,
  cumplimientoSLA: 82.5,
  promedioTAT: 4.2,
  alertasRojas: 18,
};
const chartDataAreas = [
  { name: 'RRHH',        enTiempo: 400, retrasado: 24 },
  { name: 'Finanzas',    enTiempo: 300, retrasado: 13 },
  { name: 'TI',          enTiempo: 200, retrasado: 48 },
  { name: 'Operaciones', enTiempo: 278, retrasado: 39 },
];
const chartDataEstados = [
  { name: 'Completado', value: 800 },
  { name: 'En Proceso',  value: 300 },
  { name: 'Pendiente',   value: 145 },
];
const COLORS = ['#10b981', '#f59e0b', '#94a3b8'];

/* ── Styles ── */
const S = {
  toolbar: {
    background: 'white', borderRadius: '12px', padding: '16px 20px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    display: 'flex', flexWrap: 'wrap',
    justifyContent: 'space-between', alignItems: 'center',
    gap: '12px', marginBottom: '24px',
  },
  filtersRow: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' },
  input: {
    border: '1px solid #e2e8f0', borderRadius: '8px',
    padding: '8px 12px', fontSize: '13px', color: '#374151',
    outline: 'none', background: '#f8fafc',
  },
  select: {
    border: '1px solid #e2e8f0', borderRadius: '8px',
    padding: '8px 12px', fontSize: '13px', color: '#374151',
    outline: 'none', background: '#f8fafc', cursor: 'pointer',
  },
  btnBlue: {
    background: '#3b82f6', color: 'white', border: 'none',
    borderRadius: '8px', padding: '8px 18px',
    fontSize: '13px', fontWeight: '600', cursor: 'pointer',
  },
  btnGreen: {
    background: 'linear-gradient(135deg, #059669, #10b981)',
    color: 'white', border: 'none', borderRadius: '8px',
    padding: '9px 18px', fontSize: '13px', fontWeight: '600',
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
    boxShadow: '0 2px 8px rgba(16,185,129,0.3)',
  },
  btnPurple: {
    background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
    color: 'white', border: 'none', borderRadius: '8px',
    padding: '9px 18px', fontSize: '13px', fontWeight: '600',
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
    boxShadow: '0 2px 8px rgba(139,92,246,0.3)',
  },
  exportRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px', marginBottom: '24px',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '20px', marginBottom: '24px',
  },
  card: {
    background: 'white', borderRadius: '12px', padding: '20px 24px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  cardTitle: {
    fontSize: '14px', fontWeight: '600', color: '#374151',
    marginBottom: '16px', paddingBottom: '12px',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
  th: {
    background: '#f8fafc', padding: '10px 14px', textAlign: 'left',
    fontWeight: '600', color: '#64748b', fontSize: '11px',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    borderBottom: '1px solid #e2e8f0',
  },
  td: { padding: '10px 14px', borderBottom: '1px solid #f1f5f9', color: '#374151' },
};

const badge = (sla) => ({
  display: 'inline-block', padding: '2px 10px', borderRadius: '20px',
  fontSize: '11px', fontWeight: '600',
  background: sla === 'Cumple' ? '#d1fae5' : '#fee2e2',
  color:      sla === 'Cumple' ? '#065f46' : '#991b1b',
});

const toastStyle = (type) => ({
  position: 'fixed', bottom: '24px', right: '24px',
  background: type === 'success' ? '#10b981' : '#ef4444',
  color: 'white', padding: '12px 20px', borderRadius: '10px',
  fontSize: '13px', fontWeight: '600', zIndex: 1000,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  transition: 'all 0.3s',
});

/* ── KPI Card ── */
function KPICard({ title, value, icon, accent, alert }) {
  return (
    <div style={{
      background: 'white', borderRadius: '12px', padding: '20px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderLeft: `4px solid ${accent}`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    }}>
      <div>
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
          {title}
        </p>
        <p style={{ fontSize: '28px', fontWeight: '700', color: alert ? '#ef4444' : '#1e293b', lineHeight: 1 }}>
          {value}
        </p>
      </div>
      <div style={{
        width: '44px', height: '44px', borderRadius: '10px',
        background: `${accent}18`, display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: '20px',
      }}>
        {icon}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px',
      padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '13px',
    }}>
      <p style={{ fontWeight: '600', color: '#374151', marginBottom: '6px' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
}

/* ── Main ── */
export default function Dashboard() {
  const [areaFilter, setAreaFilter]   = useState('Todas');
  const [loadingXlsx, setLoadingXlsx] = useState(false);
  const [loadingCsv, setLoadingCsv]   = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [toast, setToast]             = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleDownload = async (format) => {
    const setLoading = format === 'excel' ? setLoadingXlsx : setLoadingCsv;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/export/${format}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `Reporte_G8.${format === 'excel' ? 'xlsx' : 'csv'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showToast(`✅ Reporte ${format === 'excel' ? 'XLSX' : 'CSV'} descargado`);
    } catch {
      showToast('❌ No se pudo conectar con el servidor', 'error');
    } finally {
      setLoading(false);
    }
  };

  /* UC3 — previsualización JSON (lo que pedía el compañero) */
  const handlePreview = async () => {
    try {
      const res  = await fetch(`${API_BASE}/export/data`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setPreviewData(json);
      showToast(`📋 ${json.total} registros cargados`);
    } catch {
      showToast('❌ No se pudo obtener los datos', 'error');
    }
  };

  return (
    <div>
      {toast && <div style={toastStyle(toast.type)}>{toast.msg}</div>}

      {/* Toolbar */}
      <div style={S.toolbar}>
        <div style={S.filtersRow}>
          <span>🔍</span>
          <input type="date" style={S.input} />
          <select style={S.select} value={areaFilter} onChange={e => setAreaFilter(e.target.value)}>
            <option value="Todas">Todas las Áreas</option>
            <option value="RRHH">RRHH</option>
            <option value="TI">TI</option>
            <option value="Finanzas">Finanzas</option>
            <option value="Operaciones">Operaciones</option>
          </select>
          <button style={S.btnBlue}>Filtrar</button>
        </div>

        <div style={S.exportRow}>
          <button onClick={handlePreview} style={S.btnBlue}>
            👁 Ver JSON
          </button>
          <button
            onClick={() => handleDownload('excel')}
            disabled={loadingXlsx}
            style={{ ...S.btnGreen, opacity: loadingXlsx ? 0.6 : 1 }}
          >
            {loadingXlsx ? '⏳' : '⬇'} XLSX
          </button>
          <button
            onClick={() => handleDownload('csv')}
            disabled={loadingCsv}
            style={{ ...S.btnPurple, opacity: loadingCsv ? 0.6 : 1 }}
          >
            {loadingCsv ? '⏳' : '⬇'} CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={S.kpiGrid}>
        <KPICard title="Total Solicitudes" value={kpiData.totalSolicitudes}      icon="📋" accent="#3b82f6" />
        <KPICard title="Cumplimiento SLA"  value={`${kpiData.cumplimientoSLA}%`} icon="✅" accent="#10b981" />
        <KPICard title="Promedio TAT"      value={`${kpiData.promedioTAT} días`} icon="⏱" accent="#8b5cf6" />
        <KPICard title="Alertas Críticas"  value={kpiData.alertasRojas}          icon="⚠️" accent="#ef4444" alert />
      </div>

      {/* Charts */}
      <div style={S.chartsGrid}>
        <div style={S.card}>
          <h4 style={S.cardTitle}>📊 Carga por Área</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartDataAreas} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="enTiempo"  name="En Tiempo"  fill="#3b82f6" radius={[4,4,0,0]} />
              <Bar dataKey="retrasado" name="Retrasado"  fill="#f87171" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={S.card}>
          <h4 style={S.cardTitle}>🥧 Estado de Solicitudes</h4>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={chartDataEstados} innerRadius={70} outerRadius={105} paddingAngle={4} dataKey="value" stroke="none">
                {chartDataEstados.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Previsualización JSON — UC3 / UC4 */}
      {previewData && (
        <div style={S.card}>
          <div style={S.cardTitle}>
            <span>📋 Datos del Reporte — {previewData.total} registros</span>
            <button
              onClick={() => setPreviewData(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#94a3b8' }}
            >✕</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={S.table}>
              <thead>
                <tr>
                  {['ID Solicitud', 'Área', 'Estado', 'SLA', 'Días'].map(h => (
                    <th key={h} style={S.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.registros.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={S.td}><code style={{ color: '#6366f1', fontSize: '12px' }}>{row.ID_Solicitud}</code></td>
                    <td style={S.td}>{row.Area}</td>
                    <td style={S.td}>{row.Estado}</td>
                    <td style={S.td}><span style={badge(row.SLA)}>{row.SLA}</span></td>
                    <td style={S.td}>{row.Dias}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

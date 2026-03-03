/**
 * Dashboard Component - Main KPI dashboard view
 */
import { useKPISummary } from '../../hooks';
import './Dashboard.css';

function KPICard({ title, value, color }) {
  return (
    <div className="kpi-card" style={{ borderLeft: `4px solid ${color}` }}>
      <h3>{title}</h3>
      <span className="kpi-value">{value}</span>
    </div>
  );
}

function Dashboard() {
  const { data, loading, error } = useKPISummary();

  if (loading) return <div className="dashboard-loading">Cargando...</div>;
  if (error) return <div className="dashboard-error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard de KPIs</h1>
      <div className="kpi-cards">
        <KPICard title="Total Solicitudes" value={data?.total ?? 0} color="#2196f3" />
        <KPICard title="Pendientes" value={data?.pendientes ?? 0} color="#ff9800" />
        <KPICard title="En SLA" value={data?.en_sla ?? 0} color="#4caf50" />
      </div>
    </div>
  );
}

export default Dashboard;

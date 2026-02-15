/**
 * Dashboard Component - Main KPI dashboard view
 */
import { useKPISummary } from '../../hooks';
import './Dashboard.css';

function Dashboard() {
  const { data, loading, error } = useKPISummary();

  if (loading) return <div className="dashboard-loading">Cargando...</div>;
  if (error) return <div className="dashboard-error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard de KPIs</h1>
      <div className="dashboard-content">
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

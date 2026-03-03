/**
 * SLAChart Component - Display SLA statistics chart
 */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSLAStats } from '../../hooks';
import './Charts.css';

function SLAChart() {
  const { data, loading, error } = useSLAStats();

  if (loading) return <div className="chart-loading">Cargando gráfico...</div>;
  if (error) return <div className="chart-error">Error: {error}</div>;

  return (
    <div className="chart-container">
      <h2>Estadísticas de SLA</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pct" fill="#8884d8" name="Cumplimiento %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SLAChart;

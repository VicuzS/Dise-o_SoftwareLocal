import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileDown, Filter, AlertTriangle, Clock, CheckCircle, Activity } from 'lucide-react';

const kpiData = { totalSolicitudes: 1245, cumplimientoSLA: 82.5, promedioTAT: 4.2, alertasRojas: 18 };
const chartDataAreas = [
  { name: 'RRHH', enTiempo: 400, retrasado: 24 },
  { name: 'Finanzas', enTiempo: 300, retrasado: 13 },
  { name: 'TI', enTiempo: 200, retrasado: 48 },
  { name: 'Operaciones', enTiempo: 278, retrasado: 39 },
];
const chartDataEstados = [
  { name: 'Completado', value: 800 },
  { name: 'En Proceso', value: 300 },
  { name: 'Pendiente', value: 145 },
];
const COLORS = ['#10B981', '#F59E0B', '#6B7280'];

export default function Dashboard() {
  const [areaFilter, setAreaFilter] = useState('Todas');

  // CONEXIÓN REAL CON BACKEND (UC3)
  const handleExport = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/export/excel');
      if (!response.ok) throw new Error("Error en el servidor");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Reporte_G8_Export.xlsx';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar con el servidor de exportación.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtros y Exportación */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Filter className="text-gray-500" />
          <input type="date" className="border p-2 rounded text-sm" />
          <select className="border p-2 rounded text-sm" value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)}>
            <option value="Todas">Todas las Áreas</option>
            <option value="RRHH">RRHH</option>
            <option value="TI">TI</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700">Filtrar</button>
        </div>
        <button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-semibold transition-all">
          <FileDown size={18} /> Exportar XLSX
        </button>
      </div>

      {/* Tarjetas de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard title="Total Solicitudes" value={kpiData.totalSolicitudes} icon={<Activity className="text-blue-500"/>} color="border-blue-500" />
        <KPICard title="Cumplimiento SLA" value={`${kpiData.cumplimientoSLA}%`} icon={<CheckCircle className="text-green-500"/>} color="border-green-500" />
        <KPICard title="Promedio TAT" value={`${kpiData.promedioTAT} d`} icon={<Clock className="text-purple-500"/>} color="border-purple-500" />
        <KPICard title="Alertas Críticas" value={kpiData.alertasRojas} icon={<AlertTriangle className="text-red-500"/>} color="border-red-500" isAlert={true} />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-semibold mb-4 text-gray-700">Carga por Área</h4>
          <div className="h-64"><ResponsiveContainer><BarChart data={chartDataAreas}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="enTiempo" fill="#3B82F6" stackId="a"/><Bar dataKey="retrasado" fill="#EF4444" stackId="a"/></BarChart></ResponsiveContainer></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-semibold mb-4 text-gray-700">Estado de Solicitudes</h4>
          <div className="h-64"><ResponsiveContainer><PieChart><Pie data={chartDataEstados} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" label>{chartDataEstados.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon, color, isAlert }) {
  return (
    <div className={`bg-white p-5 rounded-lg shadow border-l-4 ${color}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-xs font-medium uppercase">{title}</p>
          <p className={`text-2xl font-bold ${isAlert ? 'text-red-600' : 'text-gray-800'}`}>{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}

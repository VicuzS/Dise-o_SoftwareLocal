import React from 'react';
import Dashboard from './components/Dashboard/Dashboard'; // Asegúrate de que la ruta coincida con tu carpeta
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header alineado con el UC1: Visualizar Dashboard */}
      <header className="bg-blue-900 text-white shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">G8: Panel de Control Estratégico</h1>
          <div className="text-sm">
            <span className="opacity-75">Usuario:</span> Jefe de Área Administrativa
          </div>
        </div>
      </header>

      {/* Área principal para los KPIs y Gráficos */}
      <main className="container mx-auto p-6">
        <Dashboard />
      </main>

      {/* Footer de cumplimiento de arquitectura */}
      <footer className="bg-white border-t mt-auto py-4 text-center text-gray-500 text-xs">
        Módulo G8 - Sistema Integrado de Reportes y KPIs 
      </footer>
    </div>
  );
}

export default App;
/**
 * ExportButton Component - Export data to Excel/CSV
 */
import { exportToExcel, exportToCSV } from '../../utils';
import './Export.css';

function ExportButton({ data, filename = 'report', format = 'excel' }) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    if (format === 'excel') {
      exportToExcel(data, filename);
    } else {
      exportToCSV(data, filename);
    }
  };

  return (
    <button className="export-button" onClick={handleExport}>
      Exportar a {format === 'excel' ? 'Excel' : 'CSV'}
    </button>
  );
}

export default ExportButton;

"""
Export Service - Handle Excel/PDF exports
"""
from typing import Any, List, Dict
import pandas as pd
from io import BytesIO


class ExportService:
    """Service class for exporting data to various formats."""
    
    def export_to_excel(self, data: List[Dict[str, Any]], filename: str = "report.xlsx") -> BytesIO:
        """
        Export data to Excel format.
        
        Args:
            data: List of dictionaries to export
            filename: Name for the Excel file
            
        Returns:
            BytesIO buffer with Excel file content
        """
        df = pd.DataFrame(data)
        buffer = BytesIO()
        df.to_excel(buffer, index=False, engine='openpyxl')
        buffer.seek(0)
        return buffer
    
    def export_to_csv(self, data: List[Dict[str, Any]]) -> BytesIO:
        """
        Export data to CSV format.
        
        Args:
            data: List of dictionaries to export
            
        Returns:
            BytesIO buffer with CSV content
        """
        df = pd.DataFrame(data)
        buffer = BytesIO()
        df.to_csv(buffer, index=False)
        buffer.seek(0)
        return buffer

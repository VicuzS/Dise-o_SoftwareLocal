"""
Exporters - Utility functions for generating export files
"""
from typing import List, Dict, Any
from io import BytesIO
import pandas as pd


def generate_excel_report(
    data: List[Dict[str, Any]], 
    sheet_name: str = "Report",
    include_headers: bool = True
) -> BytesIO:
    """
    Generate an Excel report from data.
    
    Args:
        data: List of dictionaries to export
        sheet_name: Name of the Excel sheet
        include_headers: Whether to include column headers
        
    Returns:
        BytesIO buffer with Excel content
    """
    df = pd.DataFrame(data)
    buffer = BytesIO()
    
    with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
        df.to_excel(writer, sheet_name=sheet_name, index=False, header=include_headers)
    
    buffer.seek(0)
    return buffer


def format_date_for_export(date_str: str, output_format: str = "%d/%m/%Y") -> str:
    """
    Format a date string for export.
    
    Args:
        date_str: Input date string (ISO format)
        output_format: Desired output format
        
    Returns:
        Formatted date string
    """
    from datetime import datetime
    try:
        dt = datetime.fromisoformat(date_str)
        return dt.strftime(output_format)
    except ValueError:
        return date_str

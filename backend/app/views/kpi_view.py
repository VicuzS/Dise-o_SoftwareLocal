"""
KPI View - Formatters for KPI data responses
"""
from typing import List, Dict, Any


def format_kpi_summary(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Format KPI summary data for API response.
    
    Args:
        data: Raw KPI summary data from model
        
    Returns:
        Formatted KPI summary dictionary
    """
    return data


def format_sla_chart_data(data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Format SLA chart data for API response.
    
    Args:
        data: Raw SLA chart data from model
        
    Returns:
        Formatted list of SLA chart data points
    """
    return data

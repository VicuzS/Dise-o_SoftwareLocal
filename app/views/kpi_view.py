from typing import List, Dict, Any
from app.schemas.kpi_schema import KPISummary, SLAChartData

def format_kpi_summary(data: Dict[str, Any]) -> KPISummary:
    """
    Formats KPI summary data for the view.
    """
    return KPISummary(**data)

def format_sla_chart_data(data: List[Dict[str, Any]]) -> List[SLAChartData]:
    """
    Formats SLA chart data for the view.
    """
    return [SLAChartData(**item) for item in data]

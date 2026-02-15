from typing import List, Dict, Any

def get_kpi_summary_data() -> Dict[str, Any]:
    """
    Retrieves KPI summary data.
    In a real application, this would fetch data from a database.
    """
    return {"total": 150, "pendientes": 45, "en_sla": 120}

def get_sla_chart_data() -> List[Dict[str, Any]]:
    """
    Retrieves SLA chart data.
    In a real application, this would fetch data from a database.
    """
    return [{"tipo": "Licencias", "pct": 92.0}, {"tipo": "Viaticos", "pct": 85.5}]

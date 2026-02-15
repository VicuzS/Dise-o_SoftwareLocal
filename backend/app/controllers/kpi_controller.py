from fastapi import APIRouter
from typing import List

from app.models import kpi_model
from app.views import kpi_view
from app.schemas.kpi_schema import KPISummary, SLAChartData

router = APIRouter()

@router.get("/summary", response_model=KPISummary)
async def get_summary():
    """
    Get KPI summary.
    """
    data = kpi_model.get_kpi_summary_data()
    return kpi_view.format_kpi_summary(data)

@router.get("/charts/sla-stats", response_model=List[SLAChartData])
async def get_sla_stats():
    """
    Get SLA chart statistics.
    """
    data = kpi_model.get_sla_chart_data()
    return kpi_view.format_sla_chart_data(data)

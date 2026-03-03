from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database.connection import get_db
from app.services.kpi_service import KPIService
from app.schemas.kpi_schema import KPISummary, SLAChartData

router = APIRouter()

@router.get("/summary", response_model=KPISummary)
async def get_summary(
    area_id: Optional[int] = None,
    db: Session = Depends(get_db)  # Inyección de dependencia — no instanciar dentro
):
    service = KPIService(db)
    return service.get_summary(area_id)

@router.get("/charts/sla-stats", response_model=List[SLAChartData])
async def get_sla_stats(db: Session = Depends(get_db)):
    service = KPIService(db)
    return service.get_sla_chart_data()

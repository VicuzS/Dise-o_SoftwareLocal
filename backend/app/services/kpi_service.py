from app.repositories.kpi_repository import KPIRepository
from app.schemas.kpi_schema import KPISummary, SLAChartData
from typing import List, Optional
from sqlalchemy.orm import Session

class KPIService:
    def __init__(self, db: Session):
        # Dependency injection — facilita testing con mocks
        self._repo = KPIRepository(db)

    def get_summary(self, area_id: Optional[int] = None) -> KPISummary:
        raw = self._repo.get_solicitudes_summary(area_id)
        return KPISummary(**raw)

    def get_sla_chart_data(self) -> List[SLAChartData]:
        raw = self._repo.get_sla_stats_by_tipo()
        return [SLAChartData(**item) for item in raw]

from pydantic import BaseModel

class KPISummary(BaseModel):
    total: int
    pendientes: int
    en_sla: int

class SLAChartData(BaseModel):
    tipo: str
    pct: float
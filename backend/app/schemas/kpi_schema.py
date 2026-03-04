from pydantic import BaseModel, Field
from typing import List, Optional

class KPISummary(BaseModel):
    total: int
    pendientes: int
    en_sla: int

class SLAChartData(BaseModel):
    tipo: str
    pct: float = Field(..., ge=0, le=100)  # Validación: entre 0 y 100 según doc arquitectura

class DateFilter(BaseModel):
    """UC2: Filtrar por Fechas/Áreas — ISO 8601 (YYYY-MM-DD)"""
    inicio: str
    fin: str

class ExportRecord(BaseModel):
    ID_Solicitud: str
    Area: str
    Estado: str
    SLA: str
    Dias: int

class ExportResponse(BaseModel):
    """Respuesta JSON del endpoint /export/data"""
    total: int
    registros: List[ExportRecord]
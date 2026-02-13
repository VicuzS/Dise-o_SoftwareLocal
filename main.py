from fastapi import FastAPI
from typing import List

from app.schemas.kpi_schema import KPISummary, SLAChartData

app = FastAPI(title="Modulo G8: Reportes y KPIs")

@app.get("/")
async def root():
    return {"status": "G8 Operativo - PE1"}

@app.get("/api/v1/kpi/summary", response_model=KPISummary)
async def get_summary():
    return {"total": 150, "pendientes": 45, "en_sla": 120}

@app.get("/api/v1/charts/sla-stats", response_model=List[SLAChartData])
async def get_sla_stats():
    return [{"tipo": "Licencias", "pct": 92.0}, {"tipo": "Viaticos", "pct": 85.5}]

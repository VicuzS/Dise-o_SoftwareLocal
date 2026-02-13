from fastapi import FastAPI
from app.controllers import kpi_controller

app = FastAPI(title="Modulo G8: Reportes y KPIs")

app.include_router(kpi_controller.router, prefix="/api/v1/kpi", tags=["kpi"])

@app.get("/")
async def root():
    return {"status": "G8 Operativo - PE1"}


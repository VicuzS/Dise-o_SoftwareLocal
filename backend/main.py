from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import kpi_controller
from app.database.connection import engine, Base
from app.controllers import export_controller

app = FastAPI(title="Modulo G8: Reportes y KPIs")

# Intenta crear las tablas, pero NO bloquea el arranque si la DB no está disponible
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"[WARNING] No se pudo conectar a la base de datos al iniciar: {e}")
    print("[INFO] El servidor arrancará igual. Los endpoints que no requieran DB funcionarán normalmente.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(kpi_controller.router, prefix="/api/v1/kpi", tags=["kpi"])
app.include_router(export_controller.router)

@app.get("/")
async def root():
    return {"status": "G8 Operativo - PE2"}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import kpi_controller
from app.database.connection import engine, Base
from app.controllers import export_controller

app = FastAPI(title="Modulo G8: Reportes y KPIs")

Base.metadata.create_all(bind=engine)

# CORS configuration for frontend development
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # Alternative React dev server
    "http://127.0.0.1:5173",
]

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
    return {"status": "G8 Operativo - PE1"}


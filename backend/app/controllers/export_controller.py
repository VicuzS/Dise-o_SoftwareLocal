from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.services.export_service import ExportService
from app.schemas.kpi_schema import ExportResponse
import uuid

router = APIRouter(prefix="/api/v1/export", tags=["Exportación"])

export_service = ExportService()

# Datos mock — se reemplazarán cuando G3 esté disponible
MOCK_DATA = [
    {"ID_Solicitud": "REQ-001", "Area": "RRHH",      "Estado": "Completado",  "SLA": "Cumple",  "Dias": 2},
    {"ID_Solicitud": "REQ-002", "Area": "TI",         "Estado": "Retrasado",   "SLA": "Vencido", "Dias": 8},
    {"ID_Solicitud": "REQ-003", "Area": "Finanzas",   "Estado": "En Proceso",  "SLA": "Cumple",  "Dias": 1},
    {"ID_Solicitud": "REQ-004", "Area": "Operaciones","Estado": "Completado",  "SLA": "Cumple",  "Dias": 3},
    {"ID_Solicitud": "REQ-005", "Area": "RRHH",       "Estado": "Retrasado",   "SLA": "Vencido", "Dias": 10},
]


@router.get("/data", summary="Obtener datos de exportación en formato JSON (UC3)")
def get_export_data():
    """
    Retorna los datos del reporte en formato JSON.
    Útil para previsualización o integración con otros módulos.
    Alineado con el contrato API del documento de arquitectura G8.
    """
    return {
        "total": len(MOCK_DATA),
        "registros": MOCK_DATA
    }


@router.get("/excel", summary="Descargar reporte en formato XLSX (UC3)")
def exportar_datos_excel():
    """
    Genera y descarga el reporte en formato Excel.
    Consume los mismos datos que /export/data para consistencia.
    """
    buffer = export_service.export_to_excel(MOCK_DATA)

    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=Reporte_Gerencial_G8.xlsx"}
    )


@router.get("/csv", summary="Descargar reporte en formato CSV (UC3)")
def exportar_datos_csv():
    """
    Genera y descarga el reporte en formato CSV.
    """
    buffer = export_service.export_to_csv(MOCK_DATA)

    return StreamingResponse(
        buffer,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=Reporte_Gerencial_G8.csv"}
    )
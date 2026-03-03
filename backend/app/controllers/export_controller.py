from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.services.export_service import ExportService

router = APIRouter(prefix="/api/v1/export", tags=["Exportación"])

# Instanciamos el servicio que ya tienes en el repo
export_service = ExportService()

@router.get("/excel")
def exportar_datos_excel():
    # Datos Mock: Estos se reemplazarán cuando los KPIs de tu compañero estén listos
    mock_data = [
        {"ID_Solicitud": "REQ-001", "Area": "RRHH", "Estado": "Completado", "SLA": "Cumple", "Dias": 2},
        {"ID_Solicitud": "REQ-002", "Area": "TI", "Estado": "Retrasado", "SLA": "Vencido", "Dias": 8},
        {"ID_Solicitud": "REQ-003", "Area": "Finanzas", "Estado": "En Proceso", "SLA": "Cumple", "Dias": 1}
    ]
    
    # Llamamos a tu método export_to_excel
    buffer = export_service.export_to_excel(mock_data)
    
    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=Reporte_Gerencial_G8.xlsx"}
    )
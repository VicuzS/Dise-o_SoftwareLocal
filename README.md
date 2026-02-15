# Módulo G8: Reportes y KPIs

Sistema de gestión de Reportes y KPIs con backend en FastAPI y frontend en React + Vite.

## Estructura del Proyecto

```
├── backend/
│   ├── app/
│   │   ├── controllers/      # Endpoints (rutas)
│   │   │   └── kpi_controller.py
│   │   ├── services/         # Lógica de negocio
│   │   │   ├── kpi_service.py
│   │   │   └── export_service.py
│   │   ├── models/           # SQLAlchemy models (ORM)
│   │   │   └── kpi_model.py
│   │   ├── repositories/     # Acceso a datos
│   │   ├── schemas/          # Pydantic (validación)
│   │   │   └── kpi_schema.py
│   │   ├── views/            # Formateo de respuestas
│   │   │   └── kpi_view.py
│   │   └── utils/
│   │       ├── calculators.py
│   │       └── exporters.py
│   ├── tests/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   ├── Reports/
│   │   │   ├── Charts/
│   │   │   └── Export/
│   │   ├── services/         # Llamadas a la API
│   │   ├── hooks/            # Custom hooks
│   │   └── utils/            # Utilidades (fechas, exportación)
│   ├── package.json
│   └── .env.example
│
├── tests/
│   └── smoke_test.py
├── .gitignore
└── README.md
```

## Tecnologías Utilizadas

### Backend
* **Lenguaje:** Python 3.x
* **Framework:** FastAPI
* **Base de Datos:** PostgreSQL
* **ORM:** SQLAlchemy
* **Validación:** Pydantic
* **Exportación:** Pandas, OpenPyXL
* **Documentación:** Swagger / OpenAPI (automática)

### Frontend
* **Framework:** React 18
* **Build Tool:** Vite
* **HTTP Client:** Axios
* **Gráficos:** Recharts
* **Tablas:** TanStack React Table
* **Exportación:** XLSX
* **Fechas:** date-fns

## Guía de Ejecución

### Requisitos Previos
- Python 3.8+
- Node.js 18+
- PostgreSQL (para producción)

### Backend

1. **Crear y activar entorno virtual:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # o en Windows: venv\Scripts\activate
   ```

2. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   # Editar .env con las credenciales de PostgreSQL
   ```

4. **Iniciar el servidor:**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

5. **Explorar la API:**
   - Documentación: http://localhost:8000/docs
   - Endpoint raíz: http://localhost:8000/

### Frontend

1. **Instalar dependencias:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   # Editar .env si es necesario
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación:**
   - http://localhost:5173/

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Estado del servidor |
| GET | `/api/v1/kpi/summary` | Resumen de KPIs |
| GET | `/api/v1/kpi/charts/sla-stats` | Estadísticas SLA para gráficos |

## Variables de Entorno

### Backend (`.env`)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/reportes_kpis
DEBUG=true
APP_ENV=development
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:8000/api/v1
```
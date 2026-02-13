# Módulo G8: Reportes y KPIs

Este repositorio contiene el **Skeleton Ejecutable** para el sistema de gestión de Reportes y KPIs. En esta etapa inicial (**PE1**), el objetivo es validar la infraestructura base y el contrato de servicios de la API.

## Estado de la Entrega (PE1)
Hemos completado satisfactoriamente los requisitos del prototipo mínimo recomendado:
* **Skeleton Ejecutable:** Servidor FastAPI operativo que expone endpoints iniciales con datos de prueba (stubs).
* **Estructura por Capas:** Organización modular del código siguiendo la separación de controladores y esquemas de datos.
* **Prueba de Humo (Smoke Test):** Validación de la conectividad con el servidor de base de datos PostgreSQL.
* **Versionamiento:** Entrega oficial marcada con el tag `v1-avance`.

## Estructura del Proyecto
* `app/controllers/`: Lógica de control para gestionar las solicitudes de la API.
* `app/models/`: Acceso y manipulación de datos.
* `app/views/`: Formateo de las respuestas de la API.
* `app/schemas/`: Definición de modelos de datos usando Pydantic.
* `main.py`: Punto de entrada de la aplicación y enrutamiento principal.
* `smoke_test.py`: Script de verificación técnica para la infraestructura de datos.
* `.gitignore`: Configuración para mantener el repositorio limpio de archivos temporales.

## Tecnologías Utilizadas
* **Lenguaje:** Python
* **Framework:** FastAPI
* **Base de Datos:** PostgreSQL
* **Documentación:** Swagger / OpenAPI

## Guía de Ejecución

1. **Instalar dependencias necesarias:**
   ```bash
   pip install fastapi uvicorn psycopg2-binary pydantic

2. **Iniciar el servidor:**
   python -m uvicorn main:app --reload --port 8001

3. **Explorar la API:**
   Visita http://127.0.0.1:8001/docs para interactuar con los endpoints documentados.

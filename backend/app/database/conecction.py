# backend/app/database/connection.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/reportes_kpis")

engine = create_engine(
    DATABASE_URL,
    pool_size=5,          # Pool de conexiones — no crear una por request
    max_overflow=10,
    isolation_level="READ COMMITTED"  # Como indica el documento de arquitectura
)

SessionLocal = sessionmaker(bind=engine)

def get_db() -> Generator[Session, None, None]:
    """Generador para inyección de dependencia en FastAPI."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
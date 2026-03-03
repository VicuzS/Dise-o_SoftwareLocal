from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator
import os
from dotenv import load_dotenv

load_dotenv()

# Prioriza la URL de PostgreSQL del .env, si no existe, usa SQLite para pruebas locales
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

# Solo aplicamos pool_size si no es SQLite (para evitar errores)
if DATABASE_URL.startswith("postgresql"):
    engine = create_engine(
        DATABASE_URL,
        pool_size=5,
        max_overflow=10,
        isolation_level="READ COMMITTED" # Requisito del doc de arquitectura 
    )
else:
    # Configuración simplificada para tu prueba local actual
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
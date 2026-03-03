from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List, Dict, Any

class KPIRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_solicitudes_summary(self, area_id: int = None) -> Dict[str, Any]:
        """
        Lee directamente de las tablas de G3 (Gestión de Solicitudes).
        G8 NO escribe, solo lee. Nivel de aislamiento Read Committed.
        """
        query = text("""
            SELECT 
                COUNT(*) as total,
                COUNT(*) FILTER (WHERE estado = 'pendiente') as pendientes,
                COUNT(*) FILTER (WHERE fecha_limite >= NOW()) as en_sla
            FROM g3_solicitudes.solicitudes
            WHERE (:area_id IS NULL OR area_id = :area_id)
        """)
        result = self.db.execute(query, {"area_id": area_id}).fetchone()
        return {"total": result.total, "pendientes": result.pendientes, "en_sla": result.en_sla}

    def get_sla_stats_by_tipo(self, fecha_inicio: str = None, fecha_fin: str = None) -> List[Dict]:
        """
        Cruza G3 (solicitudes) con G2 (catálogo/reglas de trámite) para calcular SLA.
        """
        query = text("""
            SELECT 
                rt.nombre_tramite as tipo,
                COUNT(s.id) as total,
                COUNT(s.id) FILTER (WHERE s.fecha_cierre <= s.fecha_inicio + rt.sla_horas * interval '1 hour') as cumplidos
            FROM g3_solicitudes.solicitudes s
            JOIN g2_catalogo.reglas_tramite rt ON s.tipo_tramite_id = rt.id
            WHERE s.estado = 'cerrado'
            GROUP BY rt.nombre_tramite
        """)
        rows = self.db.execute(query).fetchall()
        return [{"tipo": r.tipo, "pct": round((r.cumplidos / r.total) * 100, 2)} for r in rows if r.total > 0]
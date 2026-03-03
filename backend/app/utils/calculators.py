from datetime import datetime, timedelta
from typing import List, Dict

def calculate_sla_percentage(completed_on_time: int, total: int) -> float:
    """Ya existe — mantener."""
    if total == 0:
        return 0.0
    return round((completed_on_time / total) * 100, 2)

def calculate_tat(fecha_inicio: datetime, fecha_fin: datetime) -> float:
    """
    Turnaround Time en horas.
    Solo cuenta horas hábiles (8:00-18:00, lunes-viernes).
    """
    if fecha_fin <= fecha_inicio:
        return 0.0
    
    total_hours = 0.0
    current = fecha_inicio
    
    while current < fecha_fin:
        # Solo días hábiles (0=lunes, 4=viernes)
        if current.weekday() < 5:
            day_start = current.replace(hour=8, minute=0, second=0)
            day_end = current.replace(hour=18, minute=0, second=0)
            
            period_start = max(current, day_start)
            period_end = min(fecha_fin, day_end)
            
            if period_end > period_start:
                total_hours += (period_end - period_start).seconds / 3600
        
        current = (current + timedelta(days=1)).replace(hour=0, minute=0, second=0)
    
    return round(total_hours, 2)

def classify_sla_status(pct_consumido: float) -> str:
    """Semáforo de cumplimiento como indica el documento de arquitectura."""
    if pct_consumido <= 70:
        return "verde"
    elif pct_consumido <= 90:
        return "amarillo"
    return "rojo"

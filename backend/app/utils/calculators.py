"""
Calculators - Utility functions for metric calculations
"""
from typing import List, Dict, Any
from datetime import datetime, timedelta


def calculate_sla_percentage(completed_on_time: int, total: int) -> float:
    """
    Calculate SLA compliance percentage.
    
    Args:
        completed_on_time: Number of items completed within SLA
        total: Total number of items
        
    Returns:
        SLA percentage (0-100)
    """
    if total == 0:
        return 0.0
    return round((completed_on_time / total) * 100, 2)


def calculate_average_resolution_time(resolution_times: List[timedelta]) -> timedelta:
    """
    Calculate average resolution time.
    
    Args:
        resolution_times: List of resolution time deltas
        
    Returns:
        Average resolution time as timedelta
    """
    if not resolution_times:
        return timedelta(0)
    total_seconds = sum(rt.total_seconds() for rt in resolution_times)
    avg_seconds = total_seconds / len(resolution_times)
    return timedelta(seconds=avg_seconds)

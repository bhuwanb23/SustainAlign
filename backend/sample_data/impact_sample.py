"""
Sample Data for Impact Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json
from decimal import Decimal

# Sample Impact Metric Snapshots Data
SAMPLE_IMPACT_SNAPSHOTS = [
    {
        'id': 1,
        'company_id': 1,
        'as_of_date': date(2024, 3, 31),
        'beneficiaries': 2500,
        'trees_planted': 1500,
        'co2_reduced_tons': 45.5,
        'water_saved_liters': 250000,
        'energy_generated_kwh': 12000,
        'waste_reduced_tons': 8.5,
        'created_at': datetime(2024, 4, 1, 9, 30, 0)
    },
    {
        'id': 2,
        'company_id': 2,
        'as_of_date': date(2024, 3, 31),
        'beneficiaries': 1800,
        'trees_planted': 2200,
        'co2_reduced_tons': 78.2,
        'water_saved_liters': 450000,
        'energy_generated_kwh': 25000,
        'waste_reduced_tons': 12.3,
        'created_at': datetime(2024, 4, 1, 10, 15, 0)
    },
    {
        'id': 3,
        'company_id': 3,
        'as_of_date': date(2024, 3, 31),
        'beneficiaries': 3200,
        'trees_planted': 800,
        'co2_reduced_tons': 25.8,
        'water_saved_liters': 180000,
        'energy_generated_kwh': 8000,
        'waste_reduced_tons': 5.2,
        'created_at': datetime(2024, 4, 1, 11, 0, 0)
    },
    {
        'id': 4,
        'company_id': 4,
        'as_of_date': date(2024, 3, 31),
        'beneficiaries': 1500,
        'trees_planted': 500,
        'co2_reduced_tons': 15.3,
        'water_saved_liters': 120000,
        'energy_generated_kwh': 6000,
        'waste_reduced_tons': 3.8,
        'created_at': datetime(2024, 4, 1, 12, 30, 0)
    },
    {
        'id': 5,
        'company_id': 5,
        'as_of_date': date(2024, 3, 31),
        'beneficiaries': 2800,
        'trees_planted': 1800,
        'co2_reduced_tons': 52.7,
        'water_saved_liters': 320000,
        'energy_generated_kwh': 15000,
        'waste_reduced_tons': 9.1,
        'created_at': datetime(2024, 4, 1, 14, 45, 0)
    }
]

# Sample Impact Time Series Data
SAMPLE_IMPACT_TIME_SERIES = [
    # CO2 Reduction Time Series for Company 1
    {
        'id': 1,
        'metric_name': 'co2_reduced_tons',
        'ts_date': date(2024, 1, 31),
        'value': 12.5,
        'project_id': 1,
        'company_id': 1
    },
    {
        'id': 2,
        'metric_name': 'co2_reduced_tons',
        'ts_date': date(2024, 2, 29),
        'value': 28.3,
        'project_id': 1,
        'company_id': 1
    },
    {
        'id': 3,
        'metric_name': 'co2_reduced_tons',
        'ts_date': date(2024, 3, 31),
        'value': 45.5,
        'project_id': 1,
        'company_id': 1
    },
    # Beneficiaries Time Series for Company 1
    {
        'id': 4,
        'metric_name': 'beneficiaries',
        'ts_date': date(2024, 1, 31),
        'value': 800,
        'project_id': 1,
        'company_id': 1
    },
    {
        'id': 5,
        'metric_name': 'beneficiaries',
        'ts_date': date(2024, 2, 29),
        'value': 1650,
        'project_id': 1,
        'company_id': 1
    },
    {
        'id': 6,
        'metric_name': 'beneficiaries',
        'ts_date': date(2024, 3, 31),
        'value': 2500,
        'project_id': 1,
        'company_id': 1
    },
    # Water Saved Time Series for Company 2
    {
        'id': 7,
        'metric_name': 'water_saved_liters',
        'ts_date': date(2024, 1, 31),
        'value': 150000,
        'project_id': 2,
        'company_id': 2
    },
    {
        'id': 8,
        'metric_name': 'water_saved_liters',
        'ts_date': date(2024, 2, 29),
        'value': 320000,
        'project_id': 2,
        'company_id': 2
    },
    {
        'id': 9,
        'metric_name': 'water_saved_liters',
        'ts_date': date(2024, 3, 31),
        'value': 450000,
        'project_id': 2,
        'company_id': 2
    },
    # Trees Planted Time Series for Company 2
    {
        'id': 10,
        'metric_name': 'trees_planted',
        'ts_date': date(2024, 1, 31),
        'value': 800,
        'project_id': 2,
        'company_id': 2
    },
    {
        'id': 11,
        'metric_name': 'trees_planted',
        'ts_date': date(2024, 2, 29),
        'value': 1500,
        'project_id': 2,
        'company_id': 2
    },
    {
        'id': 12,
        'metric_name': 'trees_planted',
        'ts_date': date(2024, 3, 31),
        'value': 2200,
        'project_id': 2,
        'company_id': 2
    }
]

# Sample Impact Region Stats Data
SAMPLE_IMPACT_REGION_STATS = [
    {
        'id': 1,
        'country': 'India',
        'region': 'Rajasthan',
        'city': 'Jaipur',
        'metric_name': 'beneficiaries',
        'period_month': '2024-03',
        'value': 500,
        'project_id': 1,
        'company_id': 1
    },
    {
        'id': 2,
        'country': 'India',
        'region': 'Rajasthan',
        'city': 'Jaipur',
        'metric_name': 'co2_reduced_tons',
        'period_month': '2024-03',
        'value': 12.5,
        'project_id': 1,
        'company_id': 1
    },
    {
        'id': 3,
        'country': 'India',
        'region': 'Madhya Pradesh',
        'city': 'Bhopal',
        'metric_name': 'water_saved_liters',
        'period_month': '2024-03',
        'value': 180000,
        'project_id': 2,
        'company_id': 2
    },
    {
        'id': 4,
        'country': 'India',
        'region': 'Madhya Pradesh',
        'city': 'Bhopal',
        'metric_name': 'trees_planted',
        'period_month': '2024-03',
        'value': 800,
        'project_id': 2,
        'company_id': 2
    },
    {
        'id': 5,
        'country': 'India',
        'region': 'Maharashtra',
        'city': 'Mumbai',
        'metric_name': 'beneficiaries',
        'period_month': '2024-03',
        'value': 300,
        'project_id': 3,
        'company_id': 4
    },
    {
        'id': 6,
        'country': 'India',
        'region': 'Jharkhand',
        'city': 'Ranchi',
        'metric_name': 'beneficiaries',
        'period_month': '2024-03',
        'value': 1200,
        'project_id': 4,
        'company_id': 3
    },
    {
        'id': 7,
        'country': 'India',
        'region': 'Maharashtra',
        'city': 'Pune',
        'metric_name': 'trees_planted',
        'period_month': '2024-03',
        'value': 600,
        'project_id': 5,
        'company_id': 5
    },
    {
        'id': 8,
        'country': 'India',
        'region': 'Maharashtra',
        'city': 'Pune',
        'metric_name': 'co2_reduced_tons',
        'period_month': '2024-03',
        'value': 18.2,
        'project_id': 5,
        'company_id': 5
    }
]

# Sample Impact Goals Data
SAMPLE_IMPACT_GOALS = [
    {
        'id': 1,
        'metric_name': 'beneficiaries',
        'period_month': '2024-12',
        'target_value': 5000,
        'current_value': 2500,
        'status': 'on_track',
        'company_id': 1
    },
    {
        'id': 2,
        'metric_name': 'co2_reduced_tons',
        'period_month': '2024-12',
        'target_value': 100.0,
        'current_value': 45.5,
        'status': 'on_track',
        'company_id': 1
    },
    {
        'id': 3,
        'metric_name': 'trees_planted',
        'period_month': '2024-12',
        'target_value': 5000,
        'current_value': 2200,
        'status': 'on_track',
        'company_id': 2
    },
    {
        'id': 4,
        'metric_name': 'water_saved_liters',
        'period_month': '2024-12',
        'target_value': 1000000,
        'current_value': 450000,
        'status': 'on_track',
        'company_id': 2
    },
    {
        'id': 5,
        'metric_name': 'beneficiaries',
        'period_month': '2024-12',
        'target_value': 8000,
        'current_value': 3200,
        'status': 'on_track',
        'company_id': 3
    },
    {
        'id': 6,
        'metric_name': 'beneficiaries',
        'period_month': '2024-12',
        'target_value': 3000,
        'current_value': 1500,
        'status': 'at_risk',
        'company_id': 4
    },
    {
        'id': 7,
        'metric_name': 'trees_planted',
        'period_month': '2024-12',
        'target_value': 3000,
        'current_value': 1800,
        'status': 'on_track',
        'company_id': 5
    },
    {
        'id': 8,
        'metric_name': 'co2_reduced_tons',
        'period_month': '2024-12',
        'target_value': 80.0,
        'current_value': 52.7,
        'status': 'on_track',
        'company_id': 5
    }
]

def get_sample_impact_snapshots():
    """Return sample impact snapshots data"""
    return SAMPLE_IMPACT_SNAPSHOTS

def get_sample_impact_time_series():
    """Return sample impact time series data"""
    return SAMPLE_IMPACT_TIME_SERIES

def get_sample_impact_region_stats():
    """Return sample impact region stats data"""
    return SAMPLE_IMPACT_REGION_STATS

def get_sample_impact_goals():
    """Return sample impact goals data"""
    return SAMPLE_IMPACT_GOALS

def get_all_sample_data():
    """Return all sample data for impact models"""
    return {
        'impact_snapshots': SAMPLE_IMPACT_SNAPSHOTS,
        'impact_time_series': SAMPLE_IMPACT_TIME_SERIES,
        'impact_region_stats': SAMPLE_IMPACT_REGION_STATS,
        'impact_goals': SAMPLE_IMPACT_GOALS
    }

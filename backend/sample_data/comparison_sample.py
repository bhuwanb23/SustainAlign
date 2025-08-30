"""
Sample Data for Comparison Models
Contains realistic sample data for testing and development
"""

from datetime import datetime

# Sample Comparisons Data
SAMPLE_COMPARISONS = [
    {
        'id': 1,
        'user_id': 1,  # admin@techcorp.com
        'name': 'Education Projects Comparison',
        'description': 'Comparing different education-focused CSR projects for Q1 2024',
        'created_at': datetime(2024, 1, 15, 10, 0, 0),
        'updated_at': datetime(2024, 1, 20, 14, 30, 0)
    },
    {
        'id': 2,
        'user_id': 2,  # sustainability@greenenergy.com
        'name': 'Environmental Impact Projects',
        'description': 'Evaluating green energy and sustainability projects',
        'created_at': datetime(2024, 1, 18, 9, 15, 0),
        'updated_at': datetime(2024, 1, 22, 16, 45, 0)
    },
    {
        'id': 3,
        'user_id': 1,  # admin@techcorp.com
        'name': 'Healthcare Access Projects',
        'description': 'Comparing healthcare initiatives across different regions',
        'created_at': datetime(2024, 1, 25, 11, 20, 0),
        'updated_at': datetime(2024, 1, 28, 13, 10, 0)
    }
]

# Sample Comparison Items Data
SAMPLE_COMPARISON_ITEMS = [
    # Education Projects Comparison (ID: 1)
    {
        'id': 1,
        'comparison_id': 1,
        'project_id': 1,  # Digital Literacy for Rural Women
        'added_at': datetime(2024, 1, 15, 10, 30, 0),
        'notes': 'High impact potential, good NGO track record',
        'priority': 1
    },
    {
        'id': 2,
        'comparison_id': 1,
        'project_id': 3,  # Skill Development for Urban Youth
        'added_at': datetime(2024, 1, 15, 11, 0, 0),
        'notes': 'Urban focus, scalable model',
        'priority': 2
    },
    {
        'id': 3,
        'comparison_id': 1,
        'project_id': 4,  # Healthcare Access in Remote Areas
        'added_at': datetime(2024, 1, 15, 11, 30, 0),
        'notes': 'Healthcare + education component',
        'priority': 3
    },
    
    # Environmental Impact Projects (ID: 2)
    {
        'id': 4,
        'comparison_id': 2,
        'project_id': 2,  # Clean Water Access in Tribal Villages
        'added_at': datetime(2024, 1, 18, 9, 30, 0),
        'notes': 'Water sustainability focus, tribal community impact',
        'priority': 1
    },
    {
        'id': 5,
        'comparison_id': 2,
        'project_id': 5,  # Sustainable Agriculture Training
        'added_at': datetime(2024, 1, 18, 10, 0, 0),
        'notes': 'Agricultural sustainability, long-term impact',
        'priority': 2
    },
    
    # Healthcare Access Projects (ID: 3)
    {
        'id': 6,
        'comparison_id': 3,
        'project_id': 4,  # Healthcare Access in Remote Areas
        'added_at': datetime(2024, 1, 25, 11, 30, 0),
        'notes': 'Primary healthcare focus, remote area coverage',
        'priority': 1
    },
    {
        'id': 7,
        'comparison_id': 3,
        'project_id': 1,  # Digital Literacy for Rural Women
        'added_at': datetime(2024, 1, 25, 12, 0, 0),
        'notes': 'Includes health awareness component',
        'priority': 2
    }
]

def get_sample_comparisons():
    """Return sample comparisons data"""
    return SAMPLE_COMPARISONS

def get_sample_comparison_items():
    """Return sample comparison items data"""
    return SAMPLE_COMPARISON_ITEMS

def get_all_sample_data():
    """Return all sample data for comparison models"""
    return {
        'comparisons': SAMPLE_COMPARISONS,
        'comparison_items': SAMPLE_COMPARISON_ITEMS
    }

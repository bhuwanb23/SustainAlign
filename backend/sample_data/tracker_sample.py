"""
Sample Data for Tracker Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json

# Sample Project Trackers Data - Only including fields that exist in the model
SAMPLE_PROJECT_TRACKERS = [
    {
        'id': 1,
        'project_id': 1,
        'status': 'on-track',
        'progress_pct': 65,
        'due_date': date(2024, 12, 31),
        'subtitle': 'Digital Literacy for Rural Women',
        'metric_label': 'Women Trained',
        'icon': '👩‍💻',
        'gradient_from': 'blue',
        'gradient_to': 'indigo',
        'progress_from': 'blue',
        'progress_to': 'indigo',
        'metric_color': 'blue',
        'tooltip': '65% complete - On track to finish by December 2024',
        'team_user_ids': [1, 2, 3],
        'cta_label': 'View Details',
        'cta_color': 'blue',
        'details': {
            'sector': 'Education',
            'sdgs': [4, 5],
            'region': 'Rajasthan',
            'start': '2024-01-15',
            'end': '2024-12-31',
            'phase': 'Execution',
            'completedMilestones': 3,
            'totalMilestones': 5,
            'milestoneSummary': '3 of 5 milestones completed',
            'nextMilestone': 'Training Center Setup',
            'nextDue': '2024-05-15',
            'allocated': 1500000,
            'spent': 850000,
            'remaining': 650000,
            'utilizedPct': 57,
            'kpis': ['Women Trained: 500', 'Centers Established: 8'],
            'statusText': 'Project progressing well with strong community engagement',
            'issues': 'Limited internet connectivity in some areas',
            'aiSuggestions': 'Consider mobile training units for remote villages',
            'latestReport': 'Q1 2024 Progress Report',
            'evidenceLinks': ['https://example.com/reports/q1-2024.pdf'],
            'verification': 'Corporate verified'
        },
        'created_at': datetime(2024, 1, 15, 10, 0, 0),
        'updated_at': datetime(2024, 4, 15, 14, 30, 0)
    },
    {
        'id': 2,
        'project_id': 2,
        'status': 'completed',
        'progress_pct': 100,
        'due_date': date(2024, 5, 31),
        'subtitle': 'Clean Water for Tribal Villages',
        'metric_label': 'Households Served',
        'icon': '💧',
        'gradient_from': 'green',
        'gradient_to': 'emerald',
        'progress_from': 'green',
        'progress_to': 'emerald',
        'metric_color': 'green',
        'tooltip': '100% complete - Successfully completed in May 2024',
        'team_user_ids': [2, 4, 5],
        'cta_label': 'View Report',
        'cta_color': 'green',
        'details': {
            'sector': 'Water & Sanitation',
            'sdgs': [6, 3],
            'region': 'Madhya Pradesh',
            'start': '2023-06-01',
            'end': '2024-05-31',
            'phase': 'Completed',
            'completedMilestones': 5,
            'totalMilestones': 5,
            'milestoneSummary': 'All 5 milestones completed',
            'nextMilestone': 'N/A - Project completed',
            'nextDue': 'N/A',
            'allocated': 2000000,
            'spent': 2000000,
            'remaining': 0,
            'utilizedPct': 100,
            'kpis': ['Villages Covered: 12', 'Households Benefited: 1000'],
            'statusText': 'Project successfully completed with all objectives met',
            'issues': 'None - all targets achieved',
            'aiSuggestions': 'Consider replicating model in other regions',
            'latestReport': 'Final Project Report',
            'evidenceLinks': ['https://example.com/reports/final-report.pdf'],
            'verification': 'Third-party verified'
        },
        'created_at': datetime(2023, 6, 1, 9, 0, 0),
        'updated_at': datetime(2024, 5, 15, 16, 45, 0)
    },
    {
        'id': 3,
        'project_id': 3,
        'status': 'delayed',
        'progress_pct': 25,
        'due_date': date(2025, 2, 28),
        'subtitle': 'Youth Skill Development Program',
        'metric_label': 'Youth Enrolled',
        'icon': '🎓',
        'gradient_from': 'purple',
        'gradient_to': 'violet',
        'progress_from': 'purple',
        'progress_to': 'violet',
        'metric_color': 'purple',
        'tooltip': '25% complete - At risk of delay',
        'team_user_ids': [3, 6, 7],
        'cta_label': 'View Issues',
        'cta_color': 'red',
        'details': {
            'sector': 'Education',
            'sdgs': [4, 8],
            'region': 'Maharashtra',
            'start': '2024-03-01',
            'end': '2025-02-28',
            'phase': 'Planning',
            'completedMilestones': 1,
            'totalMilestones': 4,
            'milestoneSummary': '1 of 4 milestones completed',
            'nextMilestone': 'Curriculum Development',
            'nextDue': '2024-06-15',
            'allocated': 1200000,
            'spent': 300000,
            'remaining': 900000,
            'utilizedPct': 25,
            'kpis': ['Youth Enrolled: 100', 'Training Centers: 2'],
            'statusText': 'Project facing delays in curriculum development',
            'issues': 'Curriculum development taking longer than expected',
            'aiSuggestions': 'Consider using existing curriculum templates',
            'latestReport': 'Q1 2024 Progress Report',
            'evidenceLinks': ['https://example.com/reports/youth-q1-2024.pdf'],
            'verification': 'Pending verification'
        },
        'created_at': datetime(2024, 3, 1, 8, 30, 0),
        'updated_at': datetime(2024, 4, 10, 11, 20, 0)
    },
    {
        'id': 4,
        'project_id': 4,
        'status': 'on-track',
        'progress_pct': 80,
        'due_date': date(2024, 8, 31),
        'subtitle': 'Healthcare Access for Rural Communities',
        'metric_label': 'Patients Treated',
        'icon': '🏥',
        'gradient_from': 'red',
        'gradient_to': 'pink',
        'progress_from': 'red',
        'progress_to': 'pink',
        'metric_color': 'red',
        'tooltip': '80% complete - On track to finish by August 2024',
        'team_user_ids': [4, 8, 9],
        'cta_label': 'View Progress',
        'cta_color': 'red',
        'details': {
            'sector': 'Healthcare',
            'sdgs': [3, 10],
            'region': 'Tamil Nadu',
            'start': '2023-09-01',
            'end': '2024-08-31',
            'phase': 'Execution',
            'completedMilestones': 4,
            'totalMilestones': 5,
            'milestoneSummary': '4 of 5 milestones completed',
            'nextMilestone': 'Final Evaluation',
            'nextDue': '2024-07-15',
            'allocated': 1800000,
            'spent': 1440000,
            'remaining': 360000,
            'utilizedPct': 80,
            'kpis': ['Patients Treated: 1200', 'Communities Served: 4'],
            'statusText': 'Project progressing well with strong community engagement',
            'issues': 'Minor delays in equipment procurement',
            'aiSuggestions': 'Consider bulk procurement for cost savings',
            'latestReport': 'Q1 2024 Progress Report',
            'evidenceLinks': ['https://example.com/reports/healthcare-q1-2024.pdf'],
            'verification': 'Corporate verified'
        },
        'created_at': datetime(2023, 9, 1, 10, 0, 0),
        'updated_at': datetime(2024, 4, 12, 13, 15, 0)
    },
    {
        'id': 5,
        'project_id': 5,
        'status': 'delayed',
        'progress_pct': 45,
        'due_date': date(2024, 11, 30),
        'subtitle': 'Sustainable Agriculture Training',
        'metric_label': 'Farmers Trained',
        'icon': '🌾',
        'gradient_from': 'emerald',
        'gradient_to': 'teal',
        'progress_from': 'emerald',
        'progress_to': 'teal',
        'metric_color': 'emerald',
        'tooltip': '45% complete - Project delayed due to weather',
        'team_user_ids': [5, 10, 11],
        'cta_label': 'View Issues',
        'cta_color': 'yellow',
        'details': {
            'sector': 'Agriculture',
            'sdgs': [2, 15],
            'region': 'Karnataka',
            'start': '2024-02-01',
            'end': '2024-11-30',
            'phase': 'Execution',
            'completedMilestones': 2,
            'totalMilestones': 5,
            'milestoneSummary': '2 of 5 milestones completed',
            'nextMilestone': 'Field Training',
            'nextDue': '2024-06-30',
            'allocated': 1000000,
            'spent': 450000,
            'remaining': 550000,
            'utilizedPct': 45,
            'kpis': ['Farmers Trained: 200', 'Acres Covered: 150'],
            'statusText': 'Project delayed due to adverse weather conditions',
            'issues': 'Heavy rainfall affecting field training schedule',
            'aiSuggestions': 'Consider indoor training alternatives during monsoon',
            'latestReport': 'Q1 2024 Progress Report',
            'evidenceLinks': ['https://example.com/reports/agriculture-q1-2024.pdf'],
            'verification': 'Pending verification'
        },
        'created_at': datetime(2024, 2, 1, 9, 15, 0),
        'updated_at': datetime(2024, 4, 8, 15, 45, 0)
    }
]

# Sample Tracker Milestones Data - Only including fields that exist in the model
SAMPLE_TRACKER_MILESTONES = [
    # Milestones for Project 1 (Digital Literacy)
    {
        'id': 1,
        'color': 'blue',
        'text': 'Project Setup and Infrastructure - Establish training centers and procure equipment',
        'quarter': 'Q1 2024',
        'company_id': 1,
        'created_at': datetime(2024, 1, 15, 10, 0, 0)
    },
    {
        'id': 2,
        'color': 'green',
        'text': 'Trainer Recruitment and Training - Recruit and train digital literacy instructors',
        'quarter': 'Q1 2024',
        'company_id': 1,
        'created_at': datetime(2024, 1, 15, 10, 0, 0)
    },
    {
        'id': 3,
        'color': 'purple',
        'text': 'First Batch Training - Complete training for first batch of 200 women',
        'quarter': 'Q2 2024',
        'company_id': 1,
        'created_at': datetime(2024, 1, 15, 10, 0, 0)
    },
    {
        'id': 4,
        'color': 'orange',
        'text': 'Second Batch Training - Complete training for second batch of 200 women',
        'quarter': 'Q3 2024',
        'company_id': 1,
        'created_at': datetime(2024, 1, 15, 10, 0, 0)
    },
    {
        'id': 5,
        'color': 'red',
        'text': 'Third Batch Training - Complete training for third batch of 200 women',
        'quarter': 'Q4 2024',
        'company_id': 1,
        'created_at': datetime(2024, 1, 15, 10, 0, 0)
    },
    # Milestones for Project 2 (Clean Water)
    {
        'id': 6,
        'color': 'teal',
        'text': 'Water Quality Assessment - Conduct comprehensive water quality testing',
        'quarter': 'Q2 2023',
        'company_id': 2,
        'created_at': datetime(2023, 6, 1, 9, 0, 0)
    },
    {
        'id': 7,
        'color': 'cyan',
        'text': 'System Design and Procurement - Design water purification systems and procure equipment',
        'quarter': 'Q3 2023',
        'company_id': 2,
        'created_at': datetime(2023, 6, 1, 9, 0, 0)
    },
    {
        'id': 8,
        'color': 'blue',
        'text': 'Installation and Testing - Install systems and conduct initial testing',
        'quarter': 'Q4 2023',
        'company_id': 2,
        'created_at': datetime(2023, 6, 1, 9, 0, 0)
    },
    {
        'id': 9,
        'color': 'green',
        'text': 'Community Training - Train community members on system maintenance',
        'quarter': 'Q1 2024',
        'company_id': 2,
        'created_at': datetime(2023, 6, 1, 9, 0, 0)
    },
    {
        'id': 10,
        'color': 'emerald',
        'text': 'Project Completion - Final evaluation and handover to community',
        'quarter': 'Q2 2024',
        'company_id': 2,
        'created_at': datetime(2023, 6, 1, 9, 0, 0)
    }
]

def get_sample_project_trackers():
    """Return sample project trackers data"""
    return SAMPLE_PROJECT_TRACKERS

def get_sample_tracker_milestones():
    """Return sample tracker milestones data"""
    return SAMPLE_TRACKER_MILESTONES

def get_all_sample_data():
    """Return all sample data for tracker models"""
    return {
        'project_trackers': SAMPLE_PROJECT_TRACKERS,
        'tracker_milestones': SAMPLE_TRACKER_MILESTONES
    }

# Sample Data Package for SustainAlign
# This package contains comprehensive sample data for all models

# Import all sample data modules
from .user_sample import get_sample_users, get_all_sample_data as get_user_sample_data
from .company_details_sample import get_sample_companies, get_all_sample_data as get_company_sample_data
from .projects_sample import get_sample_projects, get_all_sample_data as get_project_sample_data
from .ai_matching_sample import get_sample_ai_matches, get_all_sample_data as get_ai_matching_sample_data
from .approval_sample import get_sample_approval_requests, get_sample_approval_steps, get_all_sample_data as get_approval_sample_data
from .audit_sample import get_sample_audit_events, get_all_sample_data as get_audit_sample_data
from .impact_sample import get_sample_impact_snapshots, get_sample_impact_time_series, get_sample_impact_region_stats, get_sample_impact_goals, get_all_sample_data as get_impact_sample_data
from .ngo_marketplace_sample import get_sample_ngo_profiles, get_sample_ngo_impact_events, get_sample_ngo_documents, get_sample_ngo_transparency_reports, get_sample_ngo_certificates, get_sample_ngo_testimonials, get_all_sample_data as get_ngo_sample_data
from .rationale_sample import get_sample_decision_rationales, get_sample_rationale_notes, get_all_sample_data as get_rationale_sample_data
from .reporting_sample import get_sample_report_jobs, get_sample_report_artifacts, get_all_sample_data as get_reporting_sample_data
from .risk_sample import get_sample_ngo_risk_assessments, get_all_sample_data as get_risk_sample_data
from .tracker_sample import get_sample_project_trackers, get_sample_tracker_milestones, get_all_sample_data as get_tracker_sample_data
from .comparison_sample import get_sample_comparisons, get_all_sample_data as get_comparison_sample_data

# Export all sample data functions
__all__ = [
    'get_sample_users',
    'get_sample_companies', 
    'get_sample_projects',
    'get_sample_ai_matches',
    'get_sample_approval_requests',
    'get_sample_approval_steps',
    'get_sample_audit_events',
    'get_sample_impact_snapshots',
    'get_sample_impact_time_series',
    'get_sample_impact_region_stats',
    'get_sample_impact_goals',
    'get_sample_ngo_profiles',
    'get_sample_ngo_impact_events',
    'get_sample_ngo_documents',
    'get_sample_ngo_transparency_reports',
    'get_sample_ngo_certificates',
    'get_sample_ngo_testimonials',
    'get_sample_decision_rationales',
    'get_sample_rationale_notes',
    'get_sample_report_jobs',
    'get_sample_report_artifacts',
    'get_sample_ngo_risk_assessments',
    'get_sample_project_trackers',
    'get_sample_tracker_milestones',
    'get_sample_comparisons',
    'get_all_sample_data'
]

def get_all_sample_data():
    """Get all sample data from all modules"""
    return {
        'users': get_user_sample_data(),
        'companies': get_company_sample_data(),
        'projects': get_project_sample_data(),
        'ai_matching': get_ai_matching_sample_data(),
        'approvals': get_approval_sample_data(),
        'audits': get_audit_sample_data(),
        'impacts': get_impact_sample_data(),
        'ngo_marketplace': get_ngo_sample_data(),
        'rationales': get_rationale_sample_data(),
        'reporting': get_reporting_sample_data(),
        'risks': get_risk_sample_data(),
        'trackers': get_tracker_sample_data(),
        'comparisons': get_comparison_sample_data()
    }
                     
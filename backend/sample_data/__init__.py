# Sample Data Package for SustainAlign
# This package contains comprehensive sample data for all models

# Import sample data functions from all modules
from .projects_sample import (
    get_sample_projects,
    get_sample_milestones,
    get_sample_applications,
    get_sample_impact_reports,
    get_all_sample_data as get_all_projects_sample_data
)

from .company_details_sample import (
    get_sample_companies,
    get_sample_branches,
    get_sample_csr_contacts,
    get_sample_budgets,
    get_sample_focus_areas,
    get_sample_compliance_documents,
    get_sample_ngo_preferences,
    get_sample_ai_configs,
    get_sample_user_roles,
    get_all_sample_data as get_all_company_sample_data
)

from .ai_matching_sample import (
    get_sample_ai_matches,
    get_all_sample_data as get_all_ai_matching_sample_data
)

from .approval_sample import (
    get_sample_approval_requests,
    get_sample_approval_steps,
    get_all_sample_data as get_all_approval_sample_data
)

from .audit_sample import (
    get_sample_audit_events,
    get_all_sample_data as get_all_audit_sample_data
)

from .impact_sample import (
    get_sample_impact_snapshots,
    get_sample_impact_time_series,
    get_sample_impact_region_stats,
    get_sample_impact_goals,
    get_all_sample_data as get_all_impact_sample_data
)

from .ngo_marketplace_sample import (
    get_sample_ngo_profiles,
    get_sample_ngo_impact_events,
    get_sample_ngo_documents,
    get_sample_ngo_transparency_reports,
    get_sample_ngo_certificates,
    get_sample_ngo_testimonials,
    get_all_sample_data as get_all_ngo_marketplace_sample_data
)

from .rationale_sample import (
    get_sample_decision_rationales,
    get_sample_rationale_notes,
    get_all_sample_data as get_all_rationale_sample_data
)

from .reporting_sample import (
    get_sample_report_jobs,
    get_sample_report_artifacts,
    get_all_sample_data as get_all_reporting_sample_data
)

from .risk_sample import (
    get_sample_ngo_risk_assessments,
    get_sample_risk_factors,
    get_all_sample_data as get_all_risk_sample_data
)

from .tracker_sample import (
    get_sample_project_trackers,
    get_sample_tracker_milestones,
    get_all_sample_data as get_all_tracker_sample_data
)

from .user_sample import (
    get_sample_users,
    get_all_sample_data as get_all_user_sample_data
)

# Convenience function to get all sample data from all modules
def get_all_sample_data():
    """Return all sample data from all modules"""
    return {
        'projects': get_all_projects_sample_data(),
        'company_details': get_all_company_sample_data(),
        'ai_matching': get_all_ai_matching_sample_data(),
        'approval': get_all_approval_sample_data(),
        'audit': get_all_audit_sample_data(),
        'impact': get_all_impact_sample_data(),
        'ngo_marketplace': get_all_ngo_marketplace_sample_data(),
        'rationale': get_all_rationale_sample_data(),
        'reporting': get_all_reporting_sample_data(),
        'risk': get_all_risk_sample_data(),
        'tracker': get_all_tracker_sample_data(),
        'users': get_all_user_sample_data()
    }

# Export all functions for easy access
__all__ = [
    # Projects
    'get_sample_projects',
    'get_sample_milestones',
    'get_sample_applications',
    'get_sample_impact_reports',
    'get_all_projects_sample_data',
    
    # Company Details
    'get_sample_companies',
    'get_sample_branches',
    'get_sample_csr_contacts',
    'get_sample_budgets',
    'get_sample_focus_areas',
    'get_sample_compliance_documents',
    'get_sample_ngo_preferences',
    'get_sample_ai_configs',
    'get_sample_user_roles',
    'get_all_company_sample_data',
    
    # AI Matching
    'get_sample_ai_matches',
    'get_all_ai_matching_sample_data',
    
    # Approval
    'get_sample_approval_requests',
    'get_sample_approval_steps',
    'get_all_approval_sample_data',
    
    # Audit
    'get_sample_audit_events',
    'get_all_audit_sample_data',
    
    # Impact
    'get_sample_impact_snapshots',
    'get_sample_impact_time_series',
    'get_sample_impact_region_stats',
    'get_sample_impact_goals',
    'get_all_impact_sample_data',
    
    # NGO Marketplace
    'get_sample_ngo_profiles',
    'get_sample_ngo_impact_events',
    'get_sample_ngo_documents',
    'get_sample_ngo_transparency_reports',
    'get_sample_ngo_certificates',
    'get_sample_ngo_testimonials',
    'get_all_ngo_marketplace_sample_data',
    
    # Rationale
    'get_sample_decision_rationales',
    'get_sample_rationale_notes',
    'get_all_rationale_sample_data',
    
    # Reporting
    'get_sample_report_jobs',
    'get_sample_report_artifacts',
    'get_all_reporting_sample_data',
    
    # Risk
    'get_sample_ngo_risk_assessments',
    'get_sample_risk_factors',
    'get_all_risk_sample_data',
    
    # Tracker
    'get_sample_project_trackers',
    'get_sample_tracker_milestones',
    'get_all_tracker_sample_data',
    
    # Users
    'get_sample_users',
    'get_all_user_sample_data',
    
    # Master function
    'get_all_sample_data'
]
                     
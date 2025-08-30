# Import all models from the models folder
from models import (
    db,
    User,
    Company,
    CompanyBranch,
    CSRContact,
    Budget,
    FocusArea,
    ComplianceDocument,
    NGOPreference,
    AIConfig,
    UserRole,
    Project,
    ProjectMilestone,
    ProjectApplication,
    ProjectImpactReport,
    NGOProfile,
    AIMatch,
    Comparison,
    ComparisonItem
)

# Re-export for backward compatibility
__all__ = [
    'db',
    'User',
    'Company',
    'CompanyBranch',
    'CSRContact',
    'Budget',
    'FocusArea',
    'ComplianceDocument',
    'NGOPreference',
    'AIConfig',
    'UserRole',
    'Project',
    'ProjectMilestone',
    'ProjectApplication',
    'ProjectImpactReport',
    'NGOProfile',
    'AIMatch',
    'Comparison',
    'ComparisonItem'
]



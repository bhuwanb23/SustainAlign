from .base import db
from .user import User
from .company_details import (
    Company,
    CompanyBranch,
    CSRContact,
    Budget,
    FocusArea,
    ComplianceDocument,
    NGOPreference,
    AIConfig,
    UserRole
)
from .projects import (
    Project,
    ProjectMilestone,
    ProjectApplication,
    ProjectImpactReport,
    NGOProfile
)
from .ai_matching import AIMatch

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
    'NGOProfile'
]

__all__.append('AIMatch')

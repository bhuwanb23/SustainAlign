"""
Sample Data for Reporting Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json

# Sample Report Jobs Data - Maps to ReportJob model
SAMPLE_REPORT_JOBS = [
    {
        'id': 1,
        'company_id': 1,
        'period': 'FY2023-24',
        'report_type': 'CSR Compliance',
        'metrics': {
            'carbonFootprint': True,
            'waterUsage': True,
            'socialImpact': True,
            'governance': True,
            'sdgAlignment': True,
            'stakeholderEngagement': True
        },
        'status': 'completed',
        'last_updated_human': '2 hours ago',
        'created_by': 1,
        'created_at': datetime(2024, 4, 1, 9, 0, 0),
        'updated_at': datetime(2024, 4, 1, 11, 0, 0)
    },
    {
        'id': 2,
        'company_id': 2,
        'period': 'Q1 2024',
        'report_type': 'ESG Progress',
        'metrics': {
            'carbonFootprint': True,
            'waterUsage': True,
            'socialImpact': True,
            'governance': True,
            'sdgAlignment': False,
            'stakeholderEngagement': True
        },
        'status': 'completed',
        'last_updated_human': '1 day ago',
        'created_by': 2,
        'created_at': datetime(2024, 4, 15, 14, 0, 0),
        'updated_at': datetime(2024, 4, 15, 15, 0, 0)
    },
    {
        'id': 3,
        'company_id': 1,
        'period': 'March 2024',
        'report_type': 'SDG Impact',
        'metrics': {
            'carbonFootprint': False,
            'waterUsage': False,
            'socialImpact': True,
            'governance': False,
            'sdgAlignment': True,
            'stakeholderEngagement': True
        },
        'status': 'generating',
        'last_updated_human': '5 minutes ago',
        'created_by': 1,
        'created_at': datetime(2024, 4, 5, 11, 0, 0),
        'updated_at': datetime(2024, 4, 5, 11, 20, 0)
    },
    {
        'id': 4,
        'company_id': 3,
        'period': 'Q4 2023',
        'report_type': 'CSR Compliance',
        'metrics': {
            'carbonFootprint': True,
            'waterUsage': True,
            'socialImpact': True,
            'governance': True,
            'sdgAlignment': True,
            'stakeholderEngagement': False
        },
        'status': 'completed',
        'last_updated_human': '3 days ago',
        'created_by': 3,
        'created_at': datetime(2024, 1, 15, 16, 0, 0),
        'updated_at': datetime(2024, 1, 15, 17, 30, 0)
    },
    {
        'id': 5,
        'company_id': 4,
        'period': 'Q4 2023',
        'report_type': 'ESG Progress',
        'metrics': {
            'carbonFootprint': True,
            'waterUsage': True,
            'socialImpact': True,
            'governance': True,
            'sdgAlignment': True,
            'stakeholderEngagement': True
        },
        'status': 'completed',
        'last_updated_human': '1 week ago',
        'created_by': 4,
        'created_at': datetime(2024, 1, 20, 10, 0, 0),
        'updated_at': datetime(2024, 1, 20, 11, 0, 0)
    },
    {
        'id': 6,
        'company_id': 1,
        'period': 'Q2 2024',
        'report_type': 'CSR Compliance',
        'metrics': {
            'carbonFootprint': True,
            'waterUsage': True,
            'socialImpact': True,
            'governance': True,
            'sdgAlignment': True,
            'stakeholderEngagement': True
        },
        'status': 'queued',
        'last_updated_human': 'Just queued',
        'created_by': 1,
        'created_at': datetime(2024, 4, 20, 9, 0, 0),
        'updated_at': datetime(2024, 4, 20, 9, 0, 0)
    }
]

# Sample Report Artifacts Data - Maps to ReportArtifact model
SAMPLE_REPORT_ARTIFACTS = [
    {
        'id': 1,
        'job_id': 1,
        'kind': 'pdf',
        'url': '/reports/techcorp-csr-2023-24.pdf',
        'content': None,
        'created_at': datetime(2024, 4, 1, 11, 0, 0)
    },
    {
        'id': 2,
        'job_id': 1,
        'kind': 'csv',
        'url': '/reports/techcorp-csr-2023-24-data.csv',
        'content': None,
        'created_at': datetime(2024, 4, 1, 11, 5, 0)
    },
    {
        'id': 3,
        'job_id': 1,
        'kind': 'json',
        'url': '/reports/techcorp-csr-2023-24.json',
        'content': '{"summary": "CSR Annual Report 2023-24", "projects": 5, "beneficiaries": 2500, "spend": "2.5 Cr"}',
        'created_at': datetime(2024, 4, 1, 11, 10, 0)
    },
    {
        'id': 4,
        'job_id': 2,
        'kind': 'pdf',
        'url': '/reports/greenenergy-esg-q1-2024.pdf',
        'content': None,
        'created_at': datetime(2024, 4, 15, 15, 0, 0)
    },
    {
        'id': 5,
        'job_id': 2,
        'kind': 'html',
        'url': '/reports/greenenergy-esg-q1-2024.html',
        'content': '<html><body><h1>ESG Q1 2024 Report</h1><p>CO2 Reduction: 78.2 tons</p></body></html>',
        'created_at': datetime(2024, 4, 15, 15, 5, 0)
    },
    {
        'id': 6,
        'job_id': 3,
        'kind': 'pdf',
        'url': None,
        'content': 'Report generation in progress...',
        'created_at': datetime(2024, 4, 5, 11, 20, 0)
    },
    {
        'id': 7,
        'job_id': 4,
        'kind': 'pdf',
        'url': '/reports/healthtech-compliance-q4-2023.pdf',
        'content': None,
        'created_at': datetime(2024, 1, 15, 17, 30, 0)
    },
    {
        'id': 8,
        'job_id': 4,
        'kind': 'csv',
        'url': '/reports/healthtech-compliance-q4-2023-data.csv',
        'content': None,
        'created_at': datetime(2024, 1, 15, 17, 35, 0)
    },
    {
        'id': 9,
        'job_id': 5,
        'kind': 'pdf',
        'url': '/reports/edutech-esg-q4-2023.pdf',
        'content': None,
        'created_at': datetime(2024, 1, 20, 11, 0, 0)
    },
    {
        'id': 10,
        'job_id': 5,
        'kind': 'json',
        'url': '/reports/edutech-esg-q4-2023.json',
        'content': '{"summary": "ESG Q4 2023 Report", "co2_reduction": "15.3 tons", "beneficiaries": 1500}',
        'created_at': datetime(2024, 1, 20, 11, 5, 0)
    }
]

def get_sample_report_jobs():
    """Return sample report jobs data"""
    return SAMPLE_REPORT_JOBS

def get_sample_report_artifacts():
    """Return sample report artifacts data"""
    return SAMPLE_REPORT_ARTIFACTS

def get_all_sample_data():
    """Return all sample data for reporting models"""
    return {
        'report_jobs': SAMPLE_REPORT_JOBS,
        'report_artifacts': SAMPLE_REPORT_ARTIFACTS
    }

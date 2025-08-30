from typing import Dict, List, Optional
from ai_models.ai_model import ai_model
from models.company_details import Company
from models.projects import Project
from models.rationale import DecisionRationale
from models.base import db
import logging

logger = logging.getLogger(__name__)

class AIMatchingService:
    """Service for AI-powered project matching and rationale generation"""
    
    @staticmethod
    def get_company_data(company_id: int) -> Optional[Dict]:
        """Get comprehensive company data for AI analysis"""
        try:
            company = Company.query.get(company_id)
            if not company:
                logger.error(f"Company not found with ID: {company_id}")
                return None
            
            # Get company data with all related information
            company_data = company.to_dict()
            
            # Add additional context for AI analysis
            company_data['analysis_context'] = {
                'total_branches': len(company_data.get('branches', [])),
                'has_csr_contact': bool(company_data.get('csr_contact')),
                'has_budget': bool(company_data.get('budget')),
                'has_focus_area': bool(company_data.get('focus_area')),
                'has_ai_config': bool(company_data.get('ai_config')),
                'compliance_docs_count': len(company_data.get('compliance_documents', [])),
                'user_roles_count': len(company_data.get('user_roles', []))
            }
            
            return company_data
            
        except Exception as e:
            logger.error(f"Error getting company data: {str(e)}")
            return None
    
    @staticmethod
    def get_available_projects(filters: Dict = None) -> List[Dict]:
        """Get available projects for matching"""
        try:
            query = Project.query.filter(Project.status.in_(['published', 'draft']))
            
            # Apply filters if provided
            if filters:
                if filters.get('sdg_goals'):
                    # Filter by SDG goals (projects that have any of the specified SDGs)
                    sdg_goals = filters['sdg_goals']
                    query = query.filter(Project.sdg_goals.contains(sdg_goals))
                
                if filters.get('max_budget'):
                    query = query.filter(Project.funding_required <= filters['max_budget'])
                
                if filters.get('location_country'):
                    query = query.filter(Project.location_country == filters['location_country'])
                
                if filters.get('ngo_rating_min'):
                    query = query.filter(Project.ngo_rating >= filters['ngo_rating_min'])
            
            projects = query.limit(50).all()  # Limit to prevent overwhelming the AI
            
            # Convert to dict format
            projects_data = []
            for project in projects:
                project_dict = {
                    'id': project.id,
                    'title': project.title,
                    'short_description': project.short_description,
                    'ngo_name': project.ngo_name,
                    'location_city': project.location_city,
                    'location_region': project.location_region,
                    'location_country': project.location_country,
                    'sdg_goals': project.get_sdg_goals(),
                    'csr_focus_areas': project.get_csr_focus_areas(),
                    'target_beneficiaries': project.get_target_beneficiaries(),
                    'total_project_cost': float(project.total_project_cost) if project.total_project_cost else 0,
                    'funding_required': float(project.funding_required) if project.funding_required else 0,
                    'currency': project.currency,
                    'start_date': project.start_date.isoformat() if project.start_date else None,
                    'end_date': project.end_date.isoformat() if project.end_date else None,
                    'duration_months': project.duration_months,
                    'ngo_rating': project.ngo_rating,
                    'ngo_verification_badge': project.ngo_verification_badge,
                    'past_projects_completed': project.past_projects_completed,
                    'status': project.status,
                    'expected_outcomes': project.get_expected_outcomes() if hasattr(project, 'get_expected_outcomes') else {},
                    'kpis': project.get_kpis() if hasattr(project, 'get_kpis') else {}
                }
                projects_data.append(project_dict)
            
            logger.info(f"Retrieved {len(projects_data)} projects for AI matching")
            return projects_data
            
        except Exception as e:
            logger.error(f"Error getting available projects: {str(e)}")
            return []
    
    @staticmethod
    def generate_project_matching_rationale(company_id: int, project_filters: Dict = None) -> Optional[Dict]:
        """Generate AI-powered project matching rationale for a company"""
        try:
            # Get company data
            company_data = AIMatchingService.get_company_data(company_id)
            if not company_data:
                return None
            
            # Get available projects
            projects_data = AIMatchingService.get_available_projects(project_filters)
            if not projects_data:
                logger.warning("No projects available for matching")
                return None
            
            # Generate rationale using AI
            rationale_data = ai_model.generate_project_matching_rationale(company_data, projects_data)
            
            if rationale_data:
                # Save rationale to database
                rationale_id = AIMatchingService.save_rationale_to_db(
                    company_id=company_id,
                    rationale_data=rationale_data
                )
                
                if rationale_id:
                    rationale_data['rationale_id'] = rationale_id
                    logger.info(f"Successfully generated and saved rationale {rationale_id} for company {company_id}")
                
                return rationale_data
            else:
                logger.error("Failed to generate rationale using AI")
                return None
                
        except Exception as e:
            logger.error(f"Error generating project matching rationale: {str(e)}")
            return None
    
    @staticmethod
    def save_rationale_to_db(company_id: int, rationale_data: Dict) -> Optional[int]:
        """Save rationale data to database"""
        try:
            # Create new rationale record
            rationale = DecisionRationale(
                company_id=company_id,
                title=rationale_data.get('title', 'AI-Generated Project Matching Analysis'),
                context=rationale_data.get('context', {}),
                criteria=rationale_data.get('criteria', {}),
                options=rationale_data.get('options', []),
                selected_option=rationale_data.get('selectedOption'),
                pros=rationale_data.get('pros', []),
                cons=rationale_data.get('cons', []),
                reasoning_steps=rationale_data.get('reasoningSteps', []),
                score_breakdown=rationale_data.get('scoreBreakdown', {}),
                created_by=1  # Default user ID, should be set from authentication context
            )
            
            db.session.add(rationale)
            db.session.commit()
            
            logger.info(f"Saved rationale to database with ID: {rationale.id}")
            return rationale.id
            
        except Exception as e:
            logger.error(f"Error saving rationale to database: {str(e)}")
            db.session.rollback()
            return None
    
    @staticmethod
    def get_rationale_by_id(rationale_id: int) -> Optional[Dict]:
        """Get rationale by ID"""
        try:
            rationale = DecisionRationale.query.get(rationale_id)
            if rationale:
                return rationale.to_dict()
            return None
        except Exception as e:
            logger.error(f"Error getting rationale by ID: {str(e)}")
            return None
    
    @staticmethod
    def get_company_rationales(company_id: int) -> List[Dict]:
        """Get all rationales for a company"""
        try:
            rationales = DecisionRationale.query.filter_by(company_id=company_id).order_by(DecisionRationale.created_at.desc()).all()
            return [rationale.to_dict() for rationale in rationales]
        except Exception as e:
            logger.error(f"Error getting company rationales: {str(e)}")
            return []
    
    @staticmethod
    def update_rationale(rationale_id: int, update_data: Dict) -> bool:
        """Update rationale with new data"""
        try:
            rationale = DecisionRationale.query.get(rationale_id)
            if not rationale:
                return False
            
            # Update fields
            for field, value in update_data.items():
                if hasattr(rationale, field):
                    setattr(rationale, field, value)
            
            db.session.commit()
            logger.info(f"Updated rationale {rationale_id}")
            return True
            
        except Exception as e:
            logger.error(f"Error updating rationale: {str(e)}")
            db.session.rollback()
            return False
    
    @staticmethod
    def add_rationale_note(rationale_id: int, author: str, content: str) -> bool:
        """Add a note to a rationale"""
        try:
            from models.rationale import RationaleNote
            
            note = RationaleNote(
                rationale_id=rationale_id,
                author=author,
                content=content
            )
            
            db.session.add(note)
            db.session.commit()
            
            logger.info(f"Added note to rationale {rationale_id}")
            return True
            
        except Exception as e:
            logger.error(f"Error adding rationale note: {str(e)}")
            db.session.rollback()
            return False

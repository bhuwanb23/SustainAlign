#!/usr/bin/env python3
"""
Database migration script for SustainAlign backend
Run this script to create/update the database schema
"""

import os
import sys
from dotenv import load_dotenv

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from models import (
    db, User, Company, CompanyBranch, CSRContact, Budget, FocusArea, 
    ComplianceDocument, NGOPreference, AIConfig, UserRole,
    Project, ProjectMilestone, ProjectApplication, ProjectImpactReport, NGOProfile, AIMatch, NGORiskAssessment, ApprovalRequest, ApprovalStep,
    ImpactMetricSnapshot, ImpactTimeSeries, ImpactRegionStat, ImpactGoal, ProjectTrackingInfo, ProjectTimelineEntry, ReportJob, ReportArtifact, DecisionRationale, RationaleNote, AuditEvent, NGOImpactEvent, NGODocument, NGOTransparencyReport, NGOCertificate, NGOTestimonial, NGOProfile
)

def get_table_names():
    """Get list of existing table names from database"""
    inspector = db.inspect(db.engine)
    return inspector.get_table_names()

def create_tables():
    """Create all database tables"""
    app = create_app()
    
    with app.app_context():
        print("Creating database tables...")
        db.create_all()
        print("✅ Database tables created successfully!")
        
        # Check if tables were created
        tables = get_table_names()
        print(f"📋 Created tables: {', '.join(tables)}")

def add_new_tables():
    """Add new tables to existing database without affecting existing data"""
    app = create_app()
    
    with app.app_context():
        print("🔍 Checking existing database...")
        
        # Get existing tables
        existing_tables = get_table_names()
        print(f"📋 Existing tables: {', '.join(existing_tables)}")
        
        # Define all expected tables
        expected_tables = [
            'users',
            'companies', 
            'company_branches',
            'csr_contacts',
            'budgets',
            'focus_areas',
            'compliance_documents',
            'ngo_preferences',
            'ai_configs',
            'user_roles',
            'projects',
            'project_milestones',
            'project_applications',
            'project_impact_reports',
            'ngo_profiles',
            'ai_matches',
            'ngo_risk_assessments',
            'approval_requests',
            'approval_steps',
            'impact_metric_snapshots',
            'impact_time_series',
            'impact_region_stats',
            'impact_goals',
            'project_tracking_info',
            'project_timeline_entries',
            'report_jobs',
            'report_artifacts',
            'decision_rationales',
            'rationale_notes',
            'audit_events',
            'ngo_impact_events',
            'ngo_documents',
            'ngo_transparency_reports',
            'ngo_certificates',
            'ngo_testimonials'
        ]
        
        # Find missing tables
        missing_tables = [table for table in expected_tables if table not in existing_tables]
        
        if missing_tables:
            print(f"🔧 Adding missing tables: {', '.join(missing_tables)}")
            # Create only missing tables (db.create_all is idempotent for existing)
            db.create_all()
            # Verify new tables were created
            updated_tables = get_table_names()
            newly_created = [table for table in missing_tables if table in updated_tables]
            if newly_created:
                print(f"✅ Successfully added tables: {', '.join(newly_created)}")
            else:
                print("⚠️  Some tables may not have been created. Check for errors above.")
            print(f"📋 Total tables now: {', '.join(updated_tables)}")
        else:
            print("✅ All tables already exist!")

        # After tables, ensure important new columns exist (non-destructive alters)
        ensure_column_exists('ngo_profiles', 'about', 'TEXT')

def drop_tables():
    """Drop all database tables (DANGEROUS - use with caution)"""
    app = create_app()
    
    with app.app_context():
        print("⚠️  WARNING: This will delete ALL data!")
        confirm = input("Are you sure you want to drop all tables? (yes/no): ")
        
        if confirm.lower() == 'yes':
            print("Dropping all tables...")
            db.drop_all()
            print("✅ All tables dropped successfully!")
        else:
            print("❌ Operation cancelled.")


def ensure_column_exists(table_name: str, column_name: str, column_sql_type: str):
    """Attempt to add a column if it does not exist. Safe for SQLite."""
    try:
        inspector = db.inspect(db.engine)
        existing = {c['name'] for c in inspector.get_columns(table_name)}
        if column_name in existing:
            return
        with db.engine.begin() as conn:
            conn.execute(db.text(f"ALTER TABLE {table_name} ADD COLUMN {column_name} {column_sql_type}"))
        print(f"✅ Added column {table_name}.{column_name}")
    except Exception as e:
        print(f"⚠️  Could not ensure column {table_name}.{column_name}: {e}")

def create_sample_data():
    """Create sample data for testing"""
    app = create_app()
    
    with app.app_context():
        print("Creating sample data...")
        
        # Check if sample user already exists
        existing_user = User.query.filter_by(email='demo@techcorp.com').first()
        if existing_user:
            print("Sample user already exists, skipping...")
            return
        
        # Create sample user
        from utils import hash_password
        user = User(
            email='demo@techcorp.com',
            password_hash=hash_password('demo123'),
            role='corporate'
        )
        db.session.add(user)
        db.session.flush()
        
        # Create sample company
        company = Company(
            user_id=user.id,
            company_name='TechCorp Solutions',
            logo_url='https://example.com/logo.png',
            registration_id='TECH001',
            industry='Technology',
            hq_country='India',
            hq_state='Karnataka',
            hq_city='Bangalore',
            website='https://techcorp.com'
        )
        db.session.add(company)
        db.session.flush()
        
        # Create sample branch
        branch = CompanyBranch(
            company_id=company.id,
            country='India',
            state='Maharashtra',
            city='Mumbai'
        )
        db.session.add(branch)
        
        # Create sample CSR contact
        csr_contact = CSRContact(
            company_id=company.id,
            contact_name='Priya Sharma',
            contact_role='CSR Manager',
            email='priya@techcorp.com',
            phone='+91-9876543210'
        )
        db.session.add(csr_contact)
        
        # Create sample budget
        budget = Budget(
            company_id=company.id,
            amount=5000000,
            currency='INR',
            project_size='Medium'
        )
        budget.set_splits({
            'education': 30,
            'healthcare': 25,
            'environment': 45
        })
        db.session.add(budget)
        
        # Create sample focus area
        focus_area = FocusArea(
            company_id=company.id,
            esg_goals='Net Zero by 2035, Women in Leadership 40% by 2030',
            themes='Digital literacy, Renewable energy',
            target_year='2030',
            reporting_standard='GRI'
        )
        focus_area.set_priority_sdgs(['Quality Education', 'Climate Action', 'Industry & Innovation'])
        db.session.add(focus_area)
        
        # Create sample NGO preferences
        ngo_prefs = NGOPreference(
            company_id=company.id,
            ngo_size='Mid-level',
            partnership_model='Funding + Execution',
            spend_history='Previous CSR spend on education projects'
        )
        ngo_prefs.set_regions(['Local', 'National'])
        db.session.add(ngo_prefs)
        
        # Create sample AI config
        ai_config = AIConfig(
            company_id=company.id,
            risk_appetite='Medium',
            alignment_mode='Strict compliance'
        )
        ai_config.set_optimize_for(['Impact', 'Budget efficiency'])
        ai_config.set_integrations(['SAP', 'Workday'])
        db.session.add(ai_config)
        
        # Create sample user roles
        user_role = UserRole(
            company_id=company.id,
            email='admin@techcorp.com',
            role='Admin'
        )
        db.session.add(user_role)
        
        # Create sample NGO profile
        ngo_profile = NGOProfile(
            name='EduCare Foundation',
            registration_number='EDU001',
            legal_status='Trust',
            year_established=2015,
            address='123 Education Street, Bangalore',
            city='Bangalore',
            state='Karnataka',
            country='India',
            phone='+91-9876543211',
            email='info@educare.org',
            website='https://educare.org',
            pan_number='ABCDE1234F',
            _80g_status='Valid',
            fcra_status='Valid',
            fcra_number='FCRA123456',
            rating=4,
            verification_badge='Verified',
            total_projects_completed=25,
            total_beneficiaries_reached=5000
        )
        ngo_profile.set_primary_sectors(['Education', 'Rural Development'])
        ngo_profile.set_sdg_focus([4, 1, 5])  # Quality Education, No Poverty, Gender Equality
        ngo_profile.set_geographic_focus(['Karnataka', 'Maharashtra', 'Tamil Nadu'])
        ngo_profile.set_funding_sources(['CSR', 'Government Grants', 'Individual Donors'])
        ngo_profile.set_documents(['trust-deed.pdf', '80g-certificate.pdf', 'fcra-certificate.pdf'])
        db.session.add(ngo_profile)
        db.session.flush()
        
        # Create sample AI matches
        ai_match1 = AIMatch(
            project_id=project.id,
            company_id=company.id,
            alignment_score=96,
            investment_min=250000,
            investment_max=500000,
            investment_currency='USD',
            timeline_months=18,
            location_text='Vietnam, Cambodia',
            tags=[{'icon': '💧', 'bg': 'bg-blue-100', 'fg': 'text-blue-600'}, {'icon': '🍃', 'bg': 'bg-green-100', 'fg': 'text-green-600'}],
            rationale='High alignment with company ESG goals and budget range'
        )
        db.session.add(ai_match1)
        
        ai_match2 = AIMatch(
            project_id=project.id,
            company_id=company.id,
            alignment_score=92,
            investment_min=150000,
            investment_max=300000,
            investment_currency='USD',
            timeline_months=24,
            location_text='Global',
            tags=[{'icon': '🎓', 'bg': 'bg-blue-100', 'fg': 'text-blue-600'}, {'icon': '💻', 'bg': 'bg-orange-100', 'fg': 'text-orange-600'}],
            rationale='Strong match for digital education focus area'
        )
        db.session.add(ai_match2)
        
        # Create another sample project for more AI matches
        project2 = Project(
            title='Renewable Energy Microgrids',
            short_description='Solar-powered microgrids for 30 remote communities, reducing carbon emissions by 15,000 tons annually',
            ngo_name='GreenEnergy NGO',
            location_city='Nairobi',
            location_region='Kenya',
            location_country='Kenya',
            total_project_cost=1200000,
            funding_required=800000,
            currency='USD',
            csr_eligibility=True,
            preferred_contribution_type='cash',
            start_date=date.today(),
            end_date=date.today() + timedelta(days=1095),
            ngo_registration_number='GREEN001',
            ngo_80g_status='Valid',
            ngo_fcra_status='Valid',
            ngo_rating=5,
            ngo_verification_badge='Verified',
            past_projects_completed=15,
            status='published',
            visibility='public',
            created_by=user.id
        )
        project2.set_sdg_goals([7, 13])  # Affordable Energy, Climate Action
        project2.set_csr_focus_areas(['Environment', 'Renewable Energy'])
        project2.set_target_beneficiaries(['Rural Communities', 'Low-income households'])
        project2.set_expected_outcomes({
            'communities_served': 30,
            'carbon_reduction': '15,000 tons annually',
            'households_benefited': 5000
        })
        project2.set_kpis({
            'energy_access': '100%',
            'carbon_reduction': '15,000 tons/year',
            'community_engagement': '95%'
        })
        project2.set_project_images([
            'https://example.com/solar1.jpg',
            'https://example.com/solar2.jpg'
        ])
        project2.proposal_document_url = 'https://example.com/solar-proposal.pdf'
        db.session.add(project2)
        db.session.flush()
        
        # Create AI match for project2
        ai_match3 = AIMatch(
            project_id=project2.id,
            company_id=company.id,
            alignment_score=87,
            investment_min=800000,
            investment_max=1200000,
            investment_currency='USD',
            timeline_months=36,
            location_text='Kenya, Tanzania',
            tags=[{'icon': '☀️', 'bg': 'bg-yellow-100', 'fg': 'text-yellow-600'}, {'icon': '🍃', 'bg': 'bg-green-100', 'fg': 'text-green-600'}],
            rationale='Excellent match for environmental sustainability goals'
        )
        db.session.add(ai_match3)
        
        # Create sample project
        project = Project(
            title='Digital Literacy for Rural Students',
            short_description='Providing computer education and digital skills to 500 students in rural Karnataka villages',
            ngo_name='EduCare Foundation',
            location_city='Bangalore',
            location_region='Karnataka',
            location_country='India',
            total_project_cost=2500000,
            funding_required=1500000,
            currency='INR',
            csr_eligibility=True,
            preferred_contribution_type='cash',
            start_date=date.today(),
            end_date=date.today() + timedelta(days=365),
            ngo_registration_number='EDU001',
            ngo_80g_status='Valid',
            ngo_fcra_status='Valid',
            ngo_rating=4,
            ngo_verification_badge='Verified',
            past_projects_completed=25,
            status='published',
            visibility='public',
            created_by=user.id
        )
        project.set_sdg_goals([4, 9, 10])  # Quality Education, Industry & Innovation, Reduced Inequalities
        project.set_csr_focus_areas(['Education', 'Technology', 'Rural Development'])
        project.set_target_beneficiaries(['Students', 'Rural Communities', 'Youth'])
        project.set_expected_outcomes({
            'students_enrolled': 500,
            'villages_covered': 10,
            'computer_labs_established': 5
        })
        project.set_kpis({
            'digital_literacy_rate': '80%',
            'employment_placement': '60%',
            'community_engagement': '90%'
        })
        project.set_project_images([
            'https://example.com/project1.jpg',
            'https://example.com/project2.jpg'
        ])
        project.proposal_document_url = 'https://example.com/proposal.pdf'
        db.session.add(project)
        db.session.flush()
        
        # Create sample project milestone
        milestone = ProjectMilestone(
            project_id=project.id,
            title='Project Setup and Infrastructure',
            description='Establish computer labs and recruit trainers',
            target_date=date.today() + timedelta(days=30),
            status='pending',
            progress_percentage=0
        )
        db.session.add(milestone)
        
        # Create sample project application
        application = ProjectApplication(
            project_id=project.id,
            company_id=company.id,
            application_type='funding',
            amount_offered=1000000,
            contribution_details='Funding support for computer equipment and trainer salaries',
            status='pending'
        )
        db.session.add(application)
        
        # Create sample impact data
        from datetime import date, timedelta
        
        # Create impact snapshot
        impact_snapshot = ImpactMetricSnapshot(
            company_id=company.id,
            as_of_date=date.today(),
            beneficiaries=8920,
            trees_planted=15750,
            co2_reduced_tons=2450.5,
            water_saved_liters=125000,
            energy_generated_kwh=50000,
            waste_reduced_tons=150.2
        )
        db.session.add(impact_snapshot)
        
        # Create impact time series data
        for i in range(6):
            co2_point = ImpactTimeSeries(
                metric_name='co2_reduced_tons',
                ts_date=date.today() - timedelta(days=30 * (5 - i)),
                value=400 + (i * 50) + (i * 20),  # Increasing trend
                company_id=company.id
            )
            db.session.add(co2_point)
            
            trees_point = ImpactTimeSeries(
                metric_name='trees_planted',
                ts_date=date.today() - timedelta(days=30 * (5 - i)),
                value=2000 + (i * 300) + (i * 100),  # Increasing trend
                company_id=company.id
            )
            db.session.add(trees_point)
        
        # Create impact goals
        impact_goal1 = ImpactGoal(
            metric_name='trees_planted',
            period_month='2024-12',
            target_value=20000,
            current_value=15750,
            status='on_track',
            company_id=company.id
        )
        db.session.add(impact_goal1)
        
        impact_goal2 = ImpactGoal(
            metric_name='co2_reduced_tons',
            period_month='2024-12',
            target_value=3000,
            current_value=2450,
            status='on_track',
            company_id=company.id
        )
        db.session.add(impact_goal2)
        
        impact_goal3 = ImpactGoal(
            metric_name='beneficiaries',
            period_month='2024-12',
            target_value=10000,
            current_value=8920,
            status='at_risk',
            company_id=company.id
        )
        db.session.add(impact_goal3)
        
        # Create regional impact stats
        region_stat1 = ImpactRegionStat(
            country='India',
            region='Karnataka',
            city='Bangalore',
            metric_name='co2_reduced_tons',
            period_month='2024-12',
            value=1200.5,
            company_id=company.id
        )
        db.session.add(region_stat1)
        
        region_stat2 = ImpactRegionStat(
            country='India',
            region='Maharashtra',
            city='Mumbai',
            metric_name='trees_planted',
            period_month='2024-12',
            value=8000,
            company_id=company.id
        )
        db.session.add(region_stat2)
        
        db.session.commit()

        # Optional: seed one AI match linking the sample project and company
        try:
            from models import AIMatch
            sample_match = AIMatch(
                project_id=project.id,
                company_id=company.id,
                alignment_score=94,
                investment_min=500000,
                investment_max=1200000,
                investment_currency='INR',
                timeline_months=18,
                location_text=f"{project.location_country}",
                tags=[
                    {"icon": "🎓", "bg": "bg-blue-100", "fg": "text-blue-600"},
                    {"icon": "🍃", "bg": "bg-green-100", "fg": "text-green-600"}
                ],
                rationale='High overlap with education and digital literacy priorities.'
            )
            db.session.add(sample_match)
            db.session.commit()
            print("✨ Seeded 1 AI match for demo")
        except Exception as e:
            db.session.rollback()
            print(f"⚠️  Skipped AI match seed: {e}")

        # Seed NGO risk assessment for the sample NGO
        try:
            risk = NGORiskAssessment(
                ngo_id=ngo_profile.id,
                risk_level='Low',
                highlight_metric_label='Financial Stability',
                highlight_metric_value_pct=92,
                financial_stability_pct=92,
                compliance_score_pct=88,
                execution_track_pct=95,
                transparency_pct=90,
                legal_standing_pct=85,
                radar_categories=['Financial', 'Compliance', 'Execution', 'Transparency', 'Legal'],
                radar_values=[92, 88, 95, 90, 85],
                trend_categories=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                trend_avg=[75, 78, 82, 85, 88, 90],
                trend_bench=[70, 72, 75, 78, 80, 82]
            )
            db.session.add(risk)
            db.session.commit()
            print("✨ Seeded NGO risk assessment for demo NGO")
        except Exception as e:
            db.session.rollback()
            print(f"⚠️  Skipped risk seed: {e}")
        print("✅ Sample data created successfully!")
        print("📧 Demo user: demo@techcorp.com")
        print("🔑 Demo password: demo123")
        print("🏗️  Sample project: Digital Literacy for Rural Students")
        print("🏢 Sample NGO: EduCare Foundation")

def show_database_info():
    """Show database information"""
    app = create_app()
    
    with app.app_context():
        print("📊 Database Information:")
        print(f"Database URL: {db.engine.url}")
        
        # Count records in each table
        tables = {
            'users': User,
            'companies': Company,
            'company_branches': CompanyBranch,
            'csr_contacts': CSRContact,
            'budgets': Budget,
            'focus_areas': FocusArea,
            'compliance_documents': ComplianceDocument,
            'ngo_preferences': NGOPreference,
            'ai_configs': AIConfig,
            'user_roles': UserRole,
            'projects': Project,
            'project_milestones': ProjectMilestone,
            'project_applications': ProjectApplication,
            'project_impact_reports': ProjectImpactReport,
            'ngo_profiles': NGOProfile,
            'ai_matches': AIMatch,
            'ngo_risk_assessments': NGORiskAssessment,
            'approval_requests': ApprovalRequest,
            'approval_steps': ApprovalStep,
            'impact_metric_snapshots': ImpactMetricSnapshot,
            'impact_time_series': ImpactTimeSeries,
            'impact_region_stats': ImpactRegionStat,
            'impact_goals': ImpactGoal,
            'project_tracking_info': ProjectTrackingInfo,
            'project_timeline_entries': ProjectTimelineEntry,
            'report_jobs': ReportJob,
            'report_artifacts': ReportArtifact,
            'decision_rationales': DecisionRationale,
            'rationale_notes': RationaleNote,
            'audit_events': AuditEvent,
            'ngo_impact_events': NGOImpactEvent,
            'ngo_documents': NGODocument,
            'ngo_transparency_reports': NGOTransparencyReport,
            'ngo_certificates': NGOCertificate,
            'ngo_testimonials': NGOTestimonial
        }
        
        for table_name, model in tables.items():
            count = model.query.count()
            print(f"  {table_name}: {count} records")

def check_database_status():
    """Check database status and show what needs to be done"""
    app = create_app()
    
    with app.app_context():
        print("🔍 Database Status Check:")
        print(f"Database URL: {db.engine.url}")
        
        # Check if database file exists (for SQLite)
        if 'sqlite' in str(db.engine.url):
            db_path = str(db.engine.url).replace('sqlite:///', '')
            if os.path.exists(db_path):
                print(f"✅ Database file exists: {db_path}")
            else:
                print(f"❌ Database file not found: {db_path}")
                print("💡 Run 'python migrate.py create' to create the database")
                return
        
        # Get existing tables
        existing_tables = get_table_names()
        print(f"📋 Existing tables: {', '.join(existing_tables)}")
        
        # Define all expected tables
        expected_tables = [
            'users',
            'companies', 
            'company_branches',
            'csr_contacts',
            'budgets',
            'focus_areas',
            'compliance_documents',
            'ngo_preferences',
            'ai_configs',
            'user_roles',
            'projects',
            'project_milestones',
            'project_applications',
            'project_impact_reports',
            'ngo_profiles'
        ]
        
        # Find missing tables
        missing_tables = [table for table in expected_tables if table not in existing_tables]
        
        if missing_tables:
            print(f"⚠️  Missing tables: {', '.join(missing_tables)}")
            print("💡 Run 'python migrate.py add' to add missing tables")
        else:
            print("✅ All expected tables exist!")
        
        # Check for sample data
        user_count = User.query.count()
        if user_count == 0:
            print("💡 No users found. Run 'python migrate.py sample' to create sample data")
        else:
            print(f"✅ Found {user_count} user(s) in database")

def main():
    """Main migration function"""
    load_dotenv()
    
    if len(sys.argv) < 2:
        print("Usage: python migrate.py <command>")
        print("Commands:")
        print("  create    - Create all database tables (new database)")
        print("  add       - Add new tables to existing database")
        print("  drop      - Drop all database tables (DANGEROUS)")
        print("  sample    - Create sample data")
        print("  info      - Show database information")
        print("  status    - Check database status")
        print("  reset     - Drop and recreate all tables")
        return
    
    command = sys.argv[1].lower()
    
    if command == 'create':
        create_tables()
    elif command == 'add':
        add_new_tables()
    elif command == 'drop':
        drop_tables()
    elif command == 'sample':
        create_sample_data()
    elif command == 'info':
        show_database_info()
    elif command == 'status':
        check_database_status()
    elif command == 'reset':
        drop_tables()
        create_tables()
        create_sample_data()
    else:
        print(f"Unknown command: {command}")
        print("Use 'python migrate.py' to see available commands")

if __name__ == '__main__':
    main()

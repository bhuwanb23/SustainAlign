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
from models import db, User, Company, CompanyBranch, CSRContact, Budget, FocusArea, ComplianceDocument, NGOPreference, AIConfig, UserRole

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
            'user_roles'
        ]
        
        # Find missing tables
        missing_tables = [table for table in expected_tables if table not in existing_tables]
        
        if not missing_tables:
            print("✅ All tables already exist!")
            return
        
        print(f"🔧 Adding missing tables: {', '.join(missing_tables)}")
        
        # Create only missing tables
        db.create_all()
        
        # Verify new tables were created
        updated_tables = get_table_names()
        newly_created = [table for table in missing_tables if table in updated_tables]
        
        if newly_created:
            print(f"✅ Successfully added tables: {', '.join(newly_created)}")
        else:
            print("⚠️  Some tables may not have been created. Check for errors above.")
        
        print(f"📋 Total tables now: {', '.join(updated_tables)}")

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
        
        db.session.commit()
        print("✅ Sample data created successfully!")
        print("📧 Demo user: demo@techcorp.com")
        print("🔑 Demo password: demo123")

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
            'user_roles': UserRole
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
            'user_roles'
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

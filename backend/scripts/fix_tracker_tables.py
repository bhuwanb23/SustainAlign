from app import create_app
from models import db
from sqlalchemy import text

def fix_tracker_tables():
    """Fix tracker table structure by adding missing columns"""
    app = create_app()
    
    with app.app_context():
        print("🔧 Fixing tracker table structure...")
        
        # Add missing columns to project_tracking_info
        columns_to_add = [
            ('details', 'JSON'),
            ('team_user_ids', 'JSON'),
            ('gradient_from', 'VARCHAR(16)'),
            ('gradient_to', 'VARCHAR(16)'),
            ('progress_from', 'VARCHAR(16)'),
            ('progress_to', 'VARCHAR(16)'),
            ('metric_color', 'VARCHAR(16)'),
            ('tooltip', 'VARCHAR(255)'),
            ('cta_label', 'VARCHAR(64)'),
            ('cta_color', 'VARCHAR(16)'),
            ('icon', 'VARCHAR(8)'),
            ('subtitle', 'VARCHAR(200)'),
            ('metric_label', 'VARCHAR(80)'),
            ('due_date', 'DATE'),
            ('progress_pct', 'INTEGER'),
            ('status', 'VARCHAR(24)')
        ]
        
        for column_name, column_type in columns_to_add:
            try:
                with db.engine.begin() as conn:
                    conn.execute(text(f"ALTER TABLE project_tracking_info ADD COLUMN {column_name} {column_type}"))
                print(f"✅ Added column: {column_name}")
            except Exception as e:
                if "duplicate column name" in str(e).lower():
                    print(f"⚠️  Column already exists: {column_name}")
                else:
                    print(f"❌ Failed to add column {column_name}: {e}")
        
        print("✅ Tracker table structure fixed!")

if __name__ == "__main__":
    fix_tracker_tables()

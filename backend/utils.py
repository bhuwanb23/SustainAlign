import os
import hashlib
import hmac
from datetime import datetime, timedelta
import jwt
from flask import jsonify


def hash_password(password: str) -> str:
    salt = os.environ.get('PASSWORD_SALT', 'static-salt').encode()
    return hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100_000).hex()


def verify_password(password: str, password_hash: str) -> bool:
    return hmac.compare_digest(hash_password(password), password_hash)


def create_token(payload: dict, expires_minutes: int = 60 * 24) -> str:
    secret = os.environ.get('SECRET_KEY', 'dev-secret')
    exp = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode = {**payload, 'exp': exp}
    return jwt.encode(to_encode, secret, algorithm='HS256')


def decode_token(token: str) -> dict | None:
    secret = os.environ.get('SECRET_KEY', 'dev-secret')
    try:
        return jwt.decode(token, secret, algorithms=['HS256'])
    except Exception:
        return None


def api_response(data=None, message="", status_code=200, error=None):
    """Standard API response format"""
    response = {
        "success": status_code < 400,
        "message": message,
        "timestamp": datetime.utcnow().isoformat()
    }
    
    if data is not None:
        response["data"] = data
    
    if error:
        response["error"] = error
    
    return jsonify(response), status_code


def validate_required_fields(data, required_fields):
    """Validate that required fields are present in request data"""
    missing_fields = []
    for field in required_fields:
        if field not in data or data[field] is None or data[field] == "":
            missing_fields.append(field)
    
    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"
    
    return True, None


def validate_email(email):
    """Basic email validation"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def sanitize_filename(filename):
    """Sanitize filename for safe storage"""
    import re
    # Remove or replace unsafe characters
    filename = re.sub(r'[^\w\-_\.]', '_', filename)
    # Limit length
    if len(filename) > 255:
        name, ext = os.path.splitext(filename)
        filename = name[:255-len(ext)] + ext
    return filename


def format_currency(amount, currency="INR"):
    """Format currency amount for display"""
    currency_symbols = {
        "INR": "₹",
        "USD": "$",
        "EUR": "€",
        "GBP": "£",
        "AED": "د.إ",
        "JPY": "¥"
    }
    
    symbol = currency_symbols.get(currency, currency)
    
    if currency == "INR":
        # Indian numbering system
        if amount >= 10000000:  # 1 crore
            return f"{symbol}{amount/10000000:.2f} Cr"
        elif amount >= 100000:  # 1 lakh
            return f"{symbol}{amount/100000:.2f} L"
        else:
            return f"{symbol}{amount:,.2f}"
    else:
        return f"{symbol}{amount:,.2f}"


def calculate_budget_splits(budget_amount, splits):
    """Calculate actual amounts from budget splits percentages"""
    if not splits or not budget_amount:
        return {}
    
    calculated_splits = {}
    for category, percentage in splits.items():
        calculated_splits[category] = round((budget_amount * percentage) / 100, 2)
    
    return calculated_splits


def validate_sdg_list(sdg_list):
    """Validate SDG list against known SDGs"""
    valid_sdgs = [
        'No Poverty', 'Zero Hunger', 'Good Health', 'Quality Education',
        'Clean Water', 'Affordable Energy', 'Decent Work', 'Industry & Innovation',
        'Reduced Inequalities', 'Sustainable Cities', 'Responsible Consumption',
        'Climate Action', 'Life Below Water', 'Life On Land', 'Peace & Justice', 'Partnerships'
    ]
    
    if not isinstance(sdg_list, list):
        return False, "SDG list must be an array"
    
    invalid_sdgs = [sdg for sdg in sdg_list if sdg not in valid_sdgs]
    if invalid_sdgs:
        return False, f"Invalid SDGs: {', '.join(invalid_sdgs)}"
    
    return True, None



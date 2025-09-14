# Environment Setup for SustainAlign Backend

## Quick Start

1. **Copy the environment template:**
   ```bash
   cp env_example.txt .env
   ```

2. **Update the API key in `.env`:**
   ```
   OPENROUTER_API_KEY=your-actual-api-key-here
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Seed the database:**
   ```bash
   python seed_database.py
   ```

5. **Run the application:**
   ```bash
   python app.py
   ```

## Environment Variables

The following environment variables are required:

- `OPENROUTER_API_KEY`: Your OpenRouter API key for AI functionality
- `SECRET_KEY`: Flask secret key for session management
- `DATABASE_URL`: Database connection string (defaults to SQLite)
- `CORS_ORIGIN`: Frontend URL for CORS (defaults to http://localhost:5173)

## AI Model Configuration

The current working AI model is `deepseek/deepseek-chat-v3.1:free`. You can change this in `ai_models/ai_model.py` if needed.

## Security Notes

- The `.env` file is already in `.gitignore` and will not be committed to version control
- Never commit API keys or sensitive information to the repository
- Use the `env_example.txt` as a template for setting up your local environment

## Troubleshooting

If you encounter issues:

1. **API Key Error**: Make sure your OpenRouter API key is valid and has sufficient credits
2. **Database Error**: Run `python seed_database.py` to populate the database with sample data
3. **Import Error**: Ensure you're in the virtual environment: `.\venv\Scripts\Activate.ps1` (Windows) or `source venv/bin/activate` (Linux/Mac)

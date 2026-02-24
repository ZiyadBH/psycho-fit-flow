# PsychoFit Backend

Python + FastAPI + SQLite backend for the PsychoFit assessment app.

## Setup

### 1. Create Virtual Environment
```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Server
```bash
uvicorn main:app --reload
```

Server runs on: **http://localhost:8000**

## API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure
- `main.py` — FastAPI app & routes
- `models.py` — SQLAlchemy database models
- `schemas.py` — Pydantic validation schemas
- `database.py` — SQLite connection & session setup
- `requirements.txt` — Python dependencies
- `.env` — Environment variables

## API Endpoints

### Users
- **POST** `/api/users` — Create user
- **GET** `/api/users/{user_id}` — Get user

### Assessments
- **POST** `/api/assessments` — Create assessment (with psychological & physical data)
- **GET** `/api/assessments/{assessment_id}` — Get assessment
- **GET** `/api/users/{user_id}/assessments` — Get all user assessments

### Health
- **GET** `/health` — Health check

## Example Request

```bash
curl -X POST "http://localhost:8000/api/assessments" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "psychological": {
      "energy_level": 1,
      "motivation_level": 2,
      "stress_level": 0,
      "personality_preference": 1,
      "discipline": 1
    },
    "physical": {
      "age": 28,
      "gender": "Male",
      "weight": 75.5,
      "height": 180,
      "goal": 0,
      "available_training_days": 4,
      "experience_level": 1
    }
  }'
```

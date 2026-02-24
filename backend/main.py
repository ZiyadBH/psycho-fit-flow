from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db, Base
import models, schemas

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="PsychoFit API", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Frontend ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== User Routes =====
@app.post("/api/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(email=user.email, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/api/users/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# ===== Assessment Routes =====
@app.post("/api/assessments", response_model=schemas.AssessmentResponse)
def create_assessment(assessment: schemas.AssessmentCreate, db: Session = Depends(get_db)):
    # Check if user exists
    user = db.query(models.User).filter(models.User.id == assessment.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create assessment
    db_assessment = models.Assessment(user_id=assessment.user_id)
    db.add(db_assessment)
    db.flush()  # Get assessment ID
    
    # Create psychological response
    psych = models.PsychologicalResponse(
        assessment_id=db_assessment.id,
        **assessment.psychological.dict()
    )
    db.add(psych)
    
    # Create physical response
    phys = models.PhysicalResponse(
        assessment_id=db_assessment.id,
        **assessment.physical.dict()
    )
    db.add(phys)
    
    db.commit()
    db.refresh(db_assessment)
    return db_assessment

@app.get("/api/assessments/{assessment_id}", response_model=schemas.AssessmentResponse)
def get_assessment(assessment_id: int, db: Session = Depends(get_db)):
    db_assessment = db.query(models.Assessment).filter(models.Assessment.id == assessment_id).first()
    if not db_assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return db_assessment

@app.get("/api/users/{user_id}/assessments")
def get_user_assessments(user_id: int, db: Session = Depends(get_db)):
    assessments = db.query(models.Assessment).filter(models.Assessment.user_id == user_id).all()
    return assessments

# ===== Health Check =====
@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    print("Starting PsychoFit Backend on http://0.0.0.0:5000")
    uvicorn.run(app, host="127.0.0.1", port=5000, reload=True)

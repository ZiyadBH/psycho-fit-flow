from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class PsychologicalResponseCreate(BaseModel):
    energy_level: int
    motivation_level: int
    stress_level: int
    personality_preference: int
    discipline: int

class PhysicalResponseCreate(BaseModel):
    age: int
    gender: str
    weight: float
    height: float
    goal: int
    available_training_days: int
    experience_level: int

class AssessmentCreate(BaseModel):
    user_id: int
    psychological: PsychologicalResponseCreate
    physical: PhysicalResponseCreate

class AssessmentResponse(BaseModel):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    email: str
    name: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    created_at: datetime
    
    class Config:
        from_attributes = True

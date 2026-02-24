from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    assessments = relationship("Assessment", back_populates="user")


class Assessment(Base):
    __tablename__ = "assessments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="assessments")
    psychological = relationship("PsychologicalResponse", back_populates="assessment")
    physical = relationship("PhysicalResponse", back_populates="assessment")


class PsychologicalResponse(Base):
    __tablename__ = "psychological_responses"
    
    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"))
    energy_level = Column(Integer)  # 0, 1, 2
    motivation_level = Column(Integer)  # 0, 1, 2
    stress_level = Column(Integer)  # 0, 1, 2
    personality_preference = Column(Integer)  # 0, 1
    discipline = Column(Integer)  # 0, 1, 2
    
    assessment = relationship("Assessment", back_populates="psychological")


class PhysicalResponse(Base):
    __tablename__ = "physical_responses"
    
    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"))
    age = Column(Integer)
    gender = Column(String)  # "Male", "Female"
    weight = Column(Float)  # kg
    height = Column(Float)  # cm
    goal = Column(Integer)  # 0, 1, 2
    available_training_days = Column(Integer)  # 3, 4, 6
    experience_level = Column(Integer)  # 0, 1, 2
    
    assessment = relationship("Assessment", back_populates="physical")

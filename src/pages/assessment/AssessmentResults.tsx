// src/pages/assessment/AssessmentResults.tsx (UPDATED)

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Brain, Dumbbell, Heart, Utensils, Play, Calendar,
  CheckCircle2, Sparkles, TrendingUp, Moon, Flame
} from "lucide-react";
import { toast } from "sonner";

// Types for assessment data
interface AssessmentData {
  psychological: {
    EnergyLevel: string;
    MotivationLevel: string;
    stressLevel: number[];
    PersonalityPreference: string;
    Discipline: string;
  };
  physical: {
    age: string;
    gender: string;
    weight: string;
    height: string;
    Goal: string;
    AvailableTrainingDays: string;
    ExperienceLevel: string;
  };
}

interface ResultData {
  bmi: number;
  bmiCategory: string;
  recommendedProgram: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  personalityType: string;
  mentalHealthScore: number;
  recommendations: string[];
}

// Mock database service (replace with actual API call)
const processAssessment = async (data: AssessmentData): Promise<ResultData> => {
  // This would be an API call to your backend
  // For now, we'll implement the logic directly here
  
  const psychological = data.psychological;
  const physical = data.physical;
  
  // 1. Calculate BMI
  const weight = parseFloat(physical.weight);
  const heightM = parseFloat(physical.height) / 100;
  const bmi = parseFloat((weight / (heightM * heightM)).toFixed(1));
  
  let bmiCategory = "";
  if (bmi < 18.5) bmiCategory = "Underweight";
  else if (bmi < 25) bmiCategory = "Normal weight";
  else if (bmi < 30) bmiCategory = "Overweight";
  else bmiCategory = "Obese";
  
  // 2. Determine goal based on BMI and user input
  let goal: 'general_fitness' | 'bulking' | 'cutting' = 'general_fitness';
  if (physical.Goal === '1') goal = 'bulking';
  else if (physical.Goal === '2') goal = 'cutting';
  else if (bmi < 18.5) goal = 'bulking';
  else if (bmi > 25) goal = 'cutting';
  
  // 3. Calculate BMR using Mifflin-St Jeor
  let bmr: number;
  const ageNum = parseInt(physical.age);
  const weightKg = weight;
  const heightCm = parseFloat(physical.height);
  
  if (physical.gender === 'Male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
  }
  
  // 4. Activity multiplier based on training days and experience
  const trainingDays = parseInt(physical.AvailableTrainingDays);
  let activityMultiplier = 1.2;
  if (trainingDays >= 5) activityMultiplier = 1.55;
  else if (trainingDays >= 3) activityMultiplier = 1.375;
  
  if (physical.ExperienceLevel === '2') activityMultiplier += 0.1;
  else if (physical.ExperienceLevel === '0') activityMultiplier -= 0.05;
  
  let tdee = bmr * activityMultiplier;
  
  // 5. Adjust for goal
  if (goal === 'bulking') tdee *= 1.1;
  else if (goal === 'cutting') tdee *= 0.85;
  
  tdee = Math.round(tdee);
  
  // 6. Calculate macros
  let proteinPerKg: number;
  let proteinPct: number, carbsPct: number, fatsPct: number;
  
  switch (goal) {
    case 'bulking':
      proteinPerKg = 2.0;
      proteinPct = 30; carbsPct = 45; fatsPct = 25;
      break;
    case 'cutting':
      proteinPerKg = 2.2;
      proteinPct = 35; carbsPct = 35; fatsPct = 30;
      break;
    default:
      proteinPerKg = 1.8;
      proteinPct = 25; carbsPct = 45; fatsPct = 30;
  }
  
  if (physical.ExperienceLevel === '0') proteinPerKg *= 0.9;
  
  const protein = Math.round(proteinPerKg * weight);
  const proteinCal = protein * 4;
  const fatCal = tdee * (fatsPct / 100);
  const fats = Math.round(fatCal / 9);
  const carbs = Math.round((tdee - proteinCal - fatCal) / 4);
  
  // 7. Select program based on experience, discipline, and available days
  const exp = parseInt(physical.ExperienceLevel);
  const discipline = parseInt(psychological.Discipline);
  let program = 'ppl';
  
  if (exp === 0 && discipline === 0) program = 'full_body';
  else if (exp === 0 && discipline >= 1) program = 'upper_lower';
  else if (exp === 1 && trainingDays <= 4) program = 'upper_lower';
  else if (exp === 1 && trainingDays >= 5) program = 'ppl';
  else if (exp === 2) program = 'ppl';
  
  // 8. Calculate mental health score
  let mentalScore = 5;
  mentalScore += parseInt(psychological.EnergyLevel) === 2 ? 2 : parseInt(psychological.EnergyLevel) === 0 ? -2 : 0;
  mentalScore += parseInt(psychological.MotivationLevel) === 2 ? 2 : parseInt(psychological.MotivationLevel) === 0 ? -2 : 0;
  mentalScore += psychological.stressLevel[0] === 0 ? 2 : psychological.stressLevel[0] === 2 ? -2 : 0;
  mentalScore += parseInt(psychological.Discipline) === 2 ? 2 : parseInt(psychological.Discipline) === 0 ? -2 : 0;
  mentalScore = Math.max(1, Math.min(10, mentalScore));
  
  // 9. Personality type
  let personalityType = "Balanced Learner";
  const pref = parseInt(psychological.PersonalityPreference);
  const motivation = parseInt(psychological.MotivationLevel);
  const disciplineVal = parseInt(psychological.Discipline);
  
  if (pref === 0 && motivation >= 1 && disciplineVal >= 1) personalityType = "Self-Directed Achiever";
  else if (pref === 0 && motivation < 1) personalityType = "Independent Starter";
  else if (pref === 1 && motivation >= 1) personalityType = "Socially Driven";
  
  // 10. Recommendations
  const recommendations: string[] = [];
  if (psychological.stressLevel[0] >= 1) {
    recommendations.push("Consider adding 5-10 minutes of meditation to your daily routine");
  }
  if (parseInt(psychological.Discipline) === 0) {
    recommendations.push("Start with small, achievable goals to build consistency");
  }
  if (parseInt(psychological.EnergyLevel) === 0) {
    recommendations.push("Try exercising in the morning when energy is naturally higher");
  }
  if (recommendations.length === 0) {
    recommendations.push("You're doing great! Keep maintaining your healthy habits");
  }
  
  return {
    bmi,
    bmiCategory,
    recommendedProgram: program,
    calories: tdee,
    protein,
    carbs,
    fats,
    personalityType,
    mentalHealthScore: mentalScore,
    recommendations
  };
};

const AssessmentResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load assessment data from localStorage or state
    const loadAndProcessResults = async () => {
      try {
        // Retrieve the assessment responses
        const psychologicalStr = localStorage.getItem("psychologicalResponses");
        const physicalStr = localStorage.getItem("physicalResponses");
        
        if (!psychologicalStr || !physicalStr) {
          toast.error("Assessment data not found. Please complete the assessment again.");
          navigate("/assessment/psychological");
          return;
        }
        
        const assessmentData: AssessmentData = {
          psychological: JSON.parse(psychologicalStr),
          physical: JSON.parse(physicalStr)
        };
        
        const processedResults = await processAssessment(assessmentData);
        setResults(processedResults);
        
        // Save to localStorage for dashboard use
        localStorage.setItem("userAssessmentResults", JSON.stringify(processedResults));
        
      } catch (error) {
        console.error("Error processing assessment:", error);
        toast.error("Failed to process your assessment results");
      } finally {
        setLoading(false);
      }
    };
    
    loadAndProcessResults();
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Analyzing your results...</p>
        </div>
      </div>
    );
  }
  
  if (!results) return null;
  
  const weeklyPlan = [
    { day: "Mon", activity: "Upper Body", type: "training" },
    { day: "Tue", activity: results.recommendedProgram === "full_body" ? "Rest" : "Lower Body", type: results.recommendedProgram === "full_body" ? "rest" : "training" },
    { day: "Wed", activity: "Full Body / Push", type: "training" },
    { day: "Thu", activity: "Rest / Pull", type: results.recommendedProgram === "full_body" ? "rest" : "training" },
    { day: "Fri", activity: "Lower / Full Body", type: "training" },
    { day: "Sat", activity: "Active Recovery", type: "flexibility" },
    { day: "Sun", activity: "Rest", type: "rest" },
  ];
  
  const todaysRecommendations = {
    psychological: {
      activity: results.recommendations[0] || "Take a 5-minute mindfulness break",
      reason: `Based on your mental health score of ${results.mentalHealthScore}/10`
    },
    physical: {
      activity: results.recommendedProgram === "full_body" ? "30-min full body workout" : "45-min focused session",
      reason: `Optimal for ${results.bmiCategory} BMI with ${Math.round(results.calories)} kcal/day target`
    },
    nutrition: {
      meal: getMealRecommendation(results),
      reason: `Macros: ${results.protein}g protein, ${results.carbs}g carbs, ${results.fats}g fats`
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Psy<span className="text-primary">Fit</span>
              </span>
            </div>
            <span className="text-sm text-muted-foreground">Assessment Complete</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Personalized Results
            </h1>
            <p className="text-lg text-muted-foreground">
              Based on your responses, we've created a custom plan just for you
            </p>
          </motion.div>
          
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
          >
            <StatCard
              icon={<Heart className="w-5 h-5" />}
              label="BMI"
              value={results.bmi}
              subtext={results.bmiCategory}
              color="primary"
            />
            <StatCard
              icon={<Flame className="w-5 h-5" />}
              label="Daily Calories"
              value={results.calories}
              subtext="kcal/day"
              color="secondary"
            />
            <StatCard
              icon={<Dumbbell className="w-5 h-5" />}
              label="Protein"
              value={`${results.protein}g`}
              subtext="daily target"
              color="accent"
            />
            <StatCard
              icon={<Sparkles className="w-5 h-5" />}
              label="Mental Health"
              value={`${results.mentalHealthScore}/10`}
              subtext={results.personalityType}
              color="primary"
            />
          </motion.div>
          
          {/* Today's Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Today's Recommendations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RecommendationCard
                title="Mental Wellness"
                icon={<Brain className="w-5 h-5" />}
                activity={todaysRecommendations.psychological.activity}
                reason={todaysRecommendations.psychological.reason}
                color="primary"
              />
              <RecommendationCard
                title="Physical Activity"
                icon={<Dumbbell className="w-5 h-5" />}
                activity={todaysRecommendations.physical.activity}
                reason={todaysRecommendations.physical.reason}
                color="secondary"
              />
              <RecommendationCard
                title="Nutrition"
                icon={<Utensils className="w-5 h-5" />}
                activity={todaysRecommendations.nutrition.meal}
                reason={todaysRecommendations.nutrition.reason}
                color="accent"
              />
            </div>
          </motion.div>
          
          {/* Weekly Plan Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Your Weekly Plan Preview
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {weeklyPlan.map((day) => (
                <div
                  key={day.day}
                  className={`p-3 rounded-xl text-center border ${
                    day.type === "rest"
                      ? "bg-muted/30 border-border"
                      : day.type === "flexibility"
                      ? "bg-secondary/10 border-secondary/30"
                      : "bg-primary/10 border-primary/30"
                  }`}
                >
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    {day.day}
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    {day.activity}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="xl" onClick={() => navigate("/dashboard")}>
              Go to My Dashboard
            </Button>
            <Button variant="outline" size="xl" onClick={() => navigate("/dashboard/plan")}>
              View Full Plan
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Helper function for meal recommendation
function getMealRecommendation(results: ResultData): string {
  if (results.protein > 150) {
    return "Grilled chicken breast with quinoa and roasted vegetables";
  } else if (results.calories > 2500) {
    return "Beef stir-fry with brown rice and broccoli";
  } else if (results.calories < 1800) {
    return "Salmon salad with mixed greens and sweet potato";
  } else {
    return "Turkey wrap with hummus and fresh vegetables";
  }
}

// Helper Components
const StatCard = ({ icon, label, value, subtext, color }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number; 
  subtext: string;
  color: "primary" | "secondary" | "accent";
}) => {
  const colors = {
    primary: "bg-primary/10 border-primary/20",
    secondary: "bg-secondary/10 border-secondary/20",
    accent: "bg-accent/10 border-accent/20",
  };
  
  return (
    <div className={`p-4 rounded-xl border ${colors[color]} text-center`}>
      <div className="flex items-center justify-center mb-2">{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{subtext}</p>
    </div>
  );
};

const RecommendationCard = ({ title, icon, activity, reason, color }: {
  title: string;
  icon: React.ReactNode;
  activity: string;
  reason: string;
  color: "primary" | "secondary" | "accent";
}) => {
  const colorClasses = {
    primary: "gradient-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
  };
  
  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border">
      <div className="flex items-center gap-2 mb-3">
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${colorClasses[color]} text-white`}>
          {icon}
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="font-medium text-foreground text-sm mb-1">{activity}</p>
      <p className="text-xs text-muted-foreground">{reason}</p>
    </div>
  );
};

export default AssessmentResults;
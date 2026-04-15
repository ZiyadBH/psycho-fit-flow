import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Calendar,
  Dumbbell,
  Utensils,
  Brain,
  ArrowRight,
  CheckCircle2,
  Clock,
  Play,
} from "lucide-react";

const MyPlan = () => {
  const weeklyWorkout = [
    { day: "Sat", label: "Push", type: "training" },
    { day: "Sun", label: "Pull", type: "training" },
    { day: "Mon", label: "Legs", type: "training" },
    { day: "Tue", label: "Rest", type: "rest" },
    { day: "Wed", label: "Push", type: "training" },
    { day: "Thu", label: "Pull", type: "training" },
    { day: "Fri", label: "Legs", type: "training" },
  ];

  const todayWorkout = {
    name: "Push Day",
    exercises: [
      { name: "Bench Press", sets: "4 × 8", done: true },
      { name: "Overhead Press", sets: "3 × 10", done: true },
      { name: "Incline DB Press", sets: "3 × 10", done: false },
      { name: "Lateral Raises", sets: "3 × 15", done: false },
      { name: "Tricep Pushdowns", sets: "3 × 12", done: false },
    ],
  };

  const todayMeals = [
    { time: "Breakfast", name: "Oatmeal with Berries & Almonds", calories: 420, done: true },
    { time: "Lunch", name: "Grilled Chicken Salad with Quinoa", calories: 550, done: false },
    { time: "Snack", name: "Greek Yogurt with Nuts", calories: 280, done: false },
    { time: "Dinner", name: "Salmon with Sweet Potato", calories: 620, done: false },
  ];

  const mentalTasks = [
    { task: "5-minute breathing exercise", time: "Morning", done: true },
    { task: "Listen to calm music during work", time: "Afternoon", done: false },
    { task: "10-minute evening meditation", time: "Evening", done: false },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Plan</h1>
          <p className="text-muted-foreground mt-1">Your personalized daily workout + nutrition plan</p>
        </motion.div>

        {/* Weekly Calendar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> This Week
          </h2>
          <div className="grid grid-cols-7 gap-2">
            {weeklyWorkout.map((d, i) => (
              <div key={d.day} className={`p-3 rounded-xl text-center border ${
                i === 0 ? "bg-primary/10 border-primary/30 ring-2 ring-primary/20" :
                d.type === "rest" ? "bg-muted/30 border-border" : "bg-card border-border"
              }`}>
                <p className="text-xs font-semibold text-muted-foreground">{d.day}</p>
                <p className="text-xs font-medium text-foreground mt-1">{d.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Today's Workout */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-secondary" /> Today's Workout — {todayWorkout.name}
            </h2>
            <Link to="/dashboard/workouts">
              <Button variant="ghost" size="sm">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
          <div className="space-y-2">
            {todayWorkout.exercises.map((ex, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${
                ex.done ? "bg-muted/30 border-border" : "border-border"
              }`}>
                <div className="flex items-center gap-3">
                  {ex.done ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Play className="w-5 h-5 text-muted-foreground" />}
                  <span className={`font-medium ${ex.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{ex.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{ex.sets}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Today's Nutrition */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Utensils className="w-5 h-5 text-accent" /> Today's Nutrition
            </h2>
            <Link to="/dashboard/nutrition">
              <Button variant="ghost" size="sm">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
          <div className="space-y-2">
            {todayMeals.map((meal, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${
                meal.done ? "bg-muted/30 border-border" : "border-border"
              }`}>
                <div className="flex items-center gap-3">
                  {meal.done ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Clock className="w-5 h-5 text-muted-foreground" />}
                  <div>
                    <span className={`font-medium ${meal.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{meal.name}</span>
                    <p className="text-xs text-muted-foreground">{meal.time}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{meal.calories} kcal</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mental Wellness */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" /> Mental Wellness Tasks
          </h2>
          <div className="space-y-2">
            {mentalTasks.map((t, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${
                t.done ? "bg-muted/30 border-border" : "border-border"
              }`}>
                <div className="flex items-center gap-3">
                  {t.done ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Clock className="w-5 h-5 text-muted-foreground" />}
                  <span className={`font-medium ${t.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{t.task}</span>
                </div>
                <span className="text-sm text-muted-foreground">{t.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default MyPlan;

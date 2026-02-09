import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Dumbbell,
  Heart,
  Utensils,
  Play,
  Calendar,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const AssessmentResults = () => {
  const navigate = useNavigate();

  // Mock results - in real app, this would come from assessment data
  const profile = {
    personalityType: "Enthusiastic Learner",
    fitnessLevel: "Beginner",
    mentalHealthScore: 7,
  };

  const todaysPlan = {
    psychological: {
      activity: "5-minute breathing exercises",
      reason: "Based on your stress level of 7/10",
      tip: "Listen to calm music during work",
    },
    physical: {
      activity: "20-minute brisk walking",
      reason: "Perfect for beginners + mood improvement",
    },
    nutrition: {
      meal: "Spinach salad with grilled salmon",
      reason: "Omega-3 for mood improvement + protein for energy",
    },
  };

  const weeklyPlan = [
    { day: "Mon", activity: "Walking", type: "cardio" },
    { day: "Tue", activity: "Yoga", type: "flexibility" },
    { day: "Wed", activity: "Rest", type: "rest" },
    { day: "Thu", activity: "Walking", type: "cardio" },
    { day: "Fri", activity: "Strength", type: "strength" },
    { day: "Sat", activity: "Yoga", type: "flexibility" },
    { day: "Sun", activity: "Rest", type: "rest" },
  ];

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
                Psycho<span className="text-primary">Fitness</span>
              </span>
            </div>
            <span className="text-sm text-muted-foreground">Step 4 of 4</span>
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
              Your Analysis Results & Personal Plan
            </h1>
            <p className="text-lg text-muted-foreground">
              Based on your responses, we've created a personalized plan just for you
            </p>
          </motion.div>

          {/* Profile Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          >
            <ProfileCard
              icon={<Sparkles className="w-6 h-6" />}
              label="Fitness Personality"
              value={profile.personalityType}
              color="primary"
            />
            <ProfileCard
              icon={<Dumbbell className="w-6 h-6" />}
              label="Fitness Level"
              value={profile.fitnessLevel}
              color="secondary"
            />
            <ProfileCard
              icon={<Heart className="w-6 h-6" />}
              label="Mental Health Score"
              value={`${profile.mentalHealthScore}/10`}
              color="accent"
            />
          </motion.div>

          {/* Today's Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Today's Recommendations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Psychological */}
              <RecommendationCard
                title="Mental Wellness"
                icon={<Brain className="w-5 h-5" />}
                activity={todaysPlan.psychological.activity}
                reason={todaysPlan.psychological.reason}
                tip={todaysPlan.psychological.tip}
                color="primary"
              />

              {/* Physical */}
              <RecommendationCard
                title="Physical Activity"
                icon={<Dumbbell className="w-5 h-5" />}
                activity={todaysPlan.physical.activity}
                reason={todaysPlan.physical.reason}
                hasVideo
                color="secondary"
              />

              {/* Nutrition */}
              <RecommendationCard
                title="Nutrition"
                icon={<Utensils className="w-5 h-5" />}
                activity={todaysPlan.nutrition.meal}
                reason={todaysPlan.nutrition.reason}
                color="accent"
              />
            </div>
          </motion.div>

          {/* Weekly Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Your Weekly Plan
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {weeklyPlan.map((day) => (
                <div
                  key={day.day}
                  className={`p-4 rounded-xl text-center border ${
                    day.type === "rest"
                      ? "bg-muted/30 border-border"
                      : day.type === "cardio"
                      ? "bg-primary/10 border-primary/30"
                      : day.type === "flexibility"
                      ? "bg-secondary/10 border-secondary/30"
                      : "bg-accent/10 border-accent/30"
                  }`}
                >
                  <p className="text-sm font-semibold text-muted-foreground mb-2">
                    {day.day}
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    {day.activity}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/dashboard")}
            >
              Go to My Dashboard
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface ProfileCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "primary" | "secondary" | "accent";
}

const ProfileCard = ({ icon, label, value, color }: ProfileCardProps) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    accent: "bg-accent/10 text-accent border-accent/20",
  };

  return (
    <div className={`p-6 rounded-2xl border ${colorClasses[color]}`}>
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="text-xl font-bold text-foreground">{value}</p>
    </div>
  );
};

interface RecommendationCardProps {
  title: string;
  icon: React.ReactNode;
  activity: string;
  reason: string;
  tip?: string;
  hasVideo?: boolean;
  color: "primary" | "secondary" | "accent";
}

const RecommendationCard = ({
  title,
  icon,
  activity,
  reason,
  tip,
  hasVideo,
  color,
}: RecommendationCardProps) => {
  const colorClasses = {
    primary: "gradient-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-xl ${colorClasses[color]} text-white`}
        >
          {icon}
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>

      <p className="font-medium text-foreground mb-2">{activity}</p>
      <p className="text-sm text-muted-foreground mb-4">{reason}</p>

      {tip && (
        <p className="text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg">
          💡 {tip}
        </p>
      )}

      {hasVideo && (
        <button className="flex items-center gap-2 text-sm text-secondary font-medium hover:underline mt-2">
          <Play className="w-4 h-4" />
          Watch instructional video
        </button>
      )}
    </div>
  );
};

export default AssessmentResults;

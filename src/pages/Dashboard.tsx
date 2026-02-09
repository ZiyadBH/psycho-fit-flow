import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Dumbbell,
  Utensils,
  TrendingUp,
  Calendar,
  Play,
  CheckCircle2,
  ArrowRight,
  Flame,
  Moon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data
  const user = { name: "Alex" };
  const streak = 7;
  const todayMood = 4;
  const completedToday = 2;
  const totalToday = 4;

  const todaysTasks = [
    {
      id: 1,
      type: "mental",
      title: "5-min Breathing Exercise",
      time: "Morning",
      completed: true,
    },
    {
      id: 2,
      type: "physical",
      title: "20-min Brisk Walking",
      time: "Afternoon",
      completed: true,
    },
    {
      id: 3,
      type: "nutrition",
      title: "Healthy Lunch",
      time: "12:00 PM",
      completed: false,
    },
    {
      id: 4,
      type: "mental",
      title: "Evening Meditation",
      time: "Evening",
      completed: false,
    },
  ];

  const quickStats = [
    { icon: <Flame className="w-5 h-5" />, label: "Streak", value: `${streak} days`, color: "text-primary" },
    { icon: <TrendingUp className="w-5 h-5" />, label: "Avg Mood", value: "7.2/10", color: "text-secondary" },
    { icon: <Moon className="w-5 h-5" />, label: "Avg Sleep", value: "7.5 hrs", color: "text-accent" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Good Morning, {user.name}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's your wellness plan for today
            </p>
          </div>
          <Link to="/dashboard/mood">
            <Button variant="hero">
              Log Today's Mood
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          {quickStats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-4 md:p-6 shadow-card border border-border"
            >
              <div className={`${stat.color} mb-2`}>{stat.icon}</div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Progress Today */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Today's Progress
            </h2>
            <span className="text-sm text-muted-foreground">
              {completedToday}/{totalToday} completed
            </span>
          </div>
          <Progress value={(completedToday / totalToday) * 100} className="h-3" />
        </motion.div>

        {/* Today's Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Today's Plan
          </h2>
          <div className="space-y-3">
            {todaysTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <QuickActionCard
            icon={<Dumbbell className="w-6 h-6" />}
            title="Browse Workouts"
            description="Find exercises that match your mood"
            href="/dashboard/workouts"
            color="secondary"
          />
          <QuickActionCard
            icon={<Utensils className="w-6 h-6" />}
            title="Meal Ideas"
            description="Discover mood-boosting recipes"
            href="/dashboard/nutrition"
            color="accent"
          />
          <QuickActionCard
            icon={<Brain className="w-6 h-6" />}
            title="Talk to Assistant"
            description="Get personalized support"
            href="/dashboard/chat"
            color="primary"
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

interface Task {
  id: number;
  type: string;
  title: string;
  time: string;
  completed: boolean;
}

const TaskCard = ({ task }: { task: Task }) => {
  const typeIcons = {
    mental: <Brain className="w-5 h-5" />,
    physical: <Dumbbell className="w-5 h-5" />,
    nutrition: <Utensils className="w-5 h-5" />,
  };

  const typeColors = {
    mental: "bg-primary/10 text-primary",
    physical: "bg-secondary/10 text-secondary",
    nutrition: "bg-accent/10 text-accent",
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
        task.completed
          ? "bg-muted/30 border-border"
          : "bg-card border-border hover:border-primary/30"
      }`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-xl ${
          typeColors[task.type as keyof typeof typeColors]
        }`}
      >
        {typeIcons[task.type as keyof typeof typeIcons]}
      </div>
      <div className="flex-1">
        <p
          className={`font-medium ${
            task.completed ? "text-muted-foreground line-through" : "text-foreground"
          }`}
        >
          {task.title}
        </p>
        <p className="text-sm text-muted-foreground">{task.time}</p>
      </div>
      {task.completed ? (
        <CheckCircle2 className="w-5 h-5 text-primary" />
      ) : (
        <Button variant="ghost" size="sm">
          Start
        </Button>
      )}
    </div>
  );
};

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: "primary" | "secondary" | "accent";
}

const QuickActionCard = ({
  icon,
  title,
  description,
  href,
  color,
}: QuickActionCardProps) => {
  const colorClasses = {
    primary: "gradient-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
  };

  return (
    <Link to={href}>
      <div className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-elevated hover:-translate-y-1 transition-all cursor-pointer">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colorClasses[color]} text-white mb-4`}
        >
          {icon}
        </div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
};

export default Dashboard;

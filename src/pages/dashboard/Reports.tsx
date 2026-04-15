import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Flame,
  Moon,
  Brain,
  Dumbbell,
  Download,
  Calendar,
  Heart,
} from "lucide-react";

const Reports = () => {
  const stats = [
    { icon: <Flame className="w-5 h-5" />, label: "Workout Streak", value: "7 days", color: "text-primary" },
    { icon: <Heart className="w-5 h-5" />, label: "Avg Mood (Week)", value: "7.2 / 10", color: "text-secondary" },
    { icon: <Moon className="w-5 h-5" />, label: "Avg Sleep", value: "7.5 hrs", color: "text-accent" },
    { icon: <Dumbbell className="w-5 h-5" />, label: "Workouts Done", value: "12", color: "text-primary" },
  ];

  const moodWeek = [
    { day: "Sat", score: 8 },
    { day: "Sun", score: 7 },
    { day: "Mon", score: 5 },
    { day: "Tue", score: 4 },
    { day: "Wed", score: 6 },
    { day: "Thu", score: 7 },
    { day: "Fri", score: 8 },
  ];

  const insights = [
    { icon: <TrendingDown className="w-5 h-5 text-primary" />, text: "Your stress decreased from 8/10 to 5/10 over two weeks" },
    { icon: <TrendingUp className="w-5 h-5 text-secondary" />, text: "Your mood improved on weekend days — outdoor activities help!" },
    { icon: <Brain className="w-5 h-5 text-accent" />, text: "We noticed improvement after yoga exercises — we recommend increasing them" },
    { icon: <Moon className="w-5 h-5 text-primary" />, text: "Your sleep hours are still below recommended — try a 10 PM sleep routine" },
  ];

  const maxMood = 10;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Reports & Progress</h1>
            <p className="text-muted-foreground mt-1">Track your wellness journey</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-card rounded-2xl p-4 shadow-card border border-border">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mood Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> Weekly Mood Trend
          </h2>
          <div className="flex items-end justify-between gap-2 h-40">
            {moodWeek.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-foreground">{d.score}</span>
                <div className="w-full rounded-t-lg gradient-primary transition-all" style={{ height: `${(d.score / maxMood) * 100}%` }} />
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weight Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Weight Progress</h2>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-sm text-muted-foreground">Start: 80 kg</span>
            <span className="text-sm text-muted-foreground">→</span>
            <span className="text-sm font-semibold text-foreground">Current: 77.5 kg</span>
          </div>
          <Progress value={65} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">Goal: 72 kg — 65% progress</p>
        </motion.div>

        {/* Psychological Progress & Insights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" /> Insights & Recommendations
          </h2>
          <div className="space-y-3">
            {insights.map((ins, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                {ins.icon}
                <p className="text-sm text-foreground">{ins.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;

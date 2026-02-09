import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const moodEmojis = [
  { emoji: "😢", label: "Bad", value: 1, color: "bg-destructive/20 border-destructive/50" },
  { emoji: "😕", label: "Not Good", value: 2, color: "bg-accent/20 border-accent/50" },
  { emoji: "😐", label: "Okay", value: 3, color: "bg-muted border-border" },
  { emoji: "😊", label: "Good", value: 4, color: "bg-secondary/20 border-secondary/50" },
  { emoji: "🤩", label: "Excellent", value: 5, color: "bg-primary/20 border-primary/50" },
];

// Mock mood history data
const moodHistory = [
  { date: "Mon", mood: 4 },
  { date: "Tue", mood: 3 },
  { date: "Wed", mood: 2 },
  { date: "Thu", mood: 4 },
  { date: "Fri", mood: 5 },
  { date: "Sat", mood: 4 },
  { date: "Sun", mood: 3 },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Mood recorded successfully!");
    setSelectedMood(null);
    setNotes("");
    setIsSubmitting(false);
  };

  const getRecommendation = () => {
    // Find pattern in mood history
    const lowMoodDays = moodHistory.filter((d) => d.mood <= 2);
    if (lowMoodDays.length > 0) {
      return `We notice your mood tends to be lower on ${lowMoodDays.map((d) => d.date).join(" and ")}. Consider adding extra relaxation activities on these days.`;
    }
    return "Your mood has been consistent this week! Keep up the great work!";
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            How are you feeling today?
          </h1>
          <p className="text-muted-foreground">
            Track your daily mood to get better recommendations
          </p>
        </motion.div>

        {/* Mood Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {moodEmojis.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  selectedMood === mood.value
                    ? `${mood.color} scale-110`
                    : "border-border hover:border-primary/30 hover:bg-muted/50"
                }`}
              >
                <span className="text-4xl">{mood.emoji}</span>
                <span className="text-sm font-medium text-foreground">
                  {mood.label}
                </span>
              </button>
            ))}
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">
              Add a note (optional)
            </label>
            <Textarea
              placeholder="How are you feeling? What's on your mind?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <Button
            variant="hero"
            size="lg"
            onClick={handleSubmit}
            disabled={!selectedMood || isSubmitting}
            className="w-full mt-6"
          >
            {isSubmitting ? "Recording..." : "Record Mood"}
          </Button>
        </motion.div>

        {/* Mood Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border"
        >
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Your Mood This Week
          </h2>
          <div className="flex items-end justify-between gap-2 h-40">
            {moodHistory.map((day, index) => {
              const height = (day.mood / 5) * 100;
              const moodData = moodEmojis[day.mood - 1];
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xl">{moodData.emoji}</span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary/50 to-primary transition-all"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-muted-foreground font-medium">
                    {day.date}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-primary/10 rounded-2xl p-6 border border-primary/20"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
            ✨ AI Insight
          </h3>
          <p className="text-muted-foreground">{getRecommendation()}</p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default MoodTracker;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Dumbbell,
  ChevronLeft,
  Clock,
  RotateCcw,
  Info,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

type ProgramKey = "ppl" | "upper_lower" | "full_body";

interface Exercise {
  name: string;
  warmupSets: string;
  workingSets: string;
  reps: string;
  rest: string;
  substitution: string;
  notes: string;
}

interface DaySchedule {
  day: string;
  label: string;
  type: "training" | "rest";
  exercises?: Exercise[];
}

const programs: Record<ProgramKey, { name: string; daysPerWeek: string; description: string; schedule: DaySchedule[] }> = {
  ppl: {
    name: "Push / Pull / Legs (PPL)",
    daysPerWeek: "5–6 days",
    description: "High-volume split targeting each muscle group twice per week",
    schedule: [
      { day: "Saturday", label: "Push", type: "training", exercises: [
        { name: "Bench Press", warmupSets: "2 × 12", workingSets: "4 × 8", reps: "8-10", rest: "90s", substitution: "Dumbbell Press", notes: "Keep shoulder blades retracted; control the eccentric" },
        { name: "Overhead Press", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "8-12", rest: "90s", substitution: "Dumbbell Shoulder Press", notes: "Brace core; avoid arching lower back" },
        { name: "Incline Dumbbell Press", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "10-12", rest: "60s", substitution: "Cable Fly", notes: "30-degree incline; full range of motion" },
        { name: "Lateral Raises", warmupSets: "—", workingSets: "3 × 15", reps: "12-15", rest: "45s", substitution: "Cable Lateral Raise", notes: "Slight lean forward; control the weight" },
        { name: "Tricep Pushdowns", warmupSets: "—", workingSets: "3 × 12", reps: "10-12", rest: "45s", substitution: "Overhead Tricep Extension", notes: "Keep elbows pinned to sides" },
      ]},
      { day: "Sunday", label: "Pull", type: "training", exercises: [
        { name: "Barbell Row", warmupSets: "2 × 12", workingSets: "4 × 8", reps: "8-10", rest: "90s", substitution: "Dumbbell Row", notes: "Hinge at hips; pull to lower chest" },
        { name: "Lat Pulldown", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "10-12", rest: "60s", substitution: "Pull-ups / Assisted Pull-ups", notes: "Lean slightly back; squeeze at bottom" },
        { name: "Seated Cable Row", warmupSets: "—", workingSets: "3 × 12", reps: "10-12", rest: "60s", substitution: "T-Bar Row", notes: "Squeeze shoulder blades together at contraction" },
        { name: "Face Pulls", warmupSets: "—", workingSets: "3 × 15", reps: "12-15", rest: "45s", substitution: "Reverse Fly", notes: "High cable; pull to forehead level" },
        { name: "Barbell Curl", warmupSets: "—", workingSets: "3 × 10", reps: "10-12", rest: "45s", substitution: "Dumbbell Curl", notes: "No swinging; full contraction at top" },
      ]},
      { day: "Monday", label: "Legs", type: "training", exercises: [
        { name: "Squat", warmupSets: "2 × 12", workingSets: "4 × 8", reps: "6-8", rest: "120s", substitution: "Leg Press", notes: "Break at hips first; depth to parallel or below" },
        { name: "Romanian Deadlift", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "8-10", rest: "90s", substitution: "Stiff-Leg Deadlift", notes: "Slight knee bend; hinge until hamstring stretch" },
        { name: "Leg Extension", warmupSets: "—", workingSets: "3 × 12", reps: "12-15", rest: "60s", substitution: "Sissy Squats", notes: "Pause at top for 1 second" },
        { name: "Leg Curl", warmupSets: "—", workingSets: "3 × 12", reps: "10-12", rest: "60s", substitution: "Nordic Curl", notes: "Control the eccentric phase" },
        { name: "Calf Raises", warmupSets: "—", workingSets: "4 × 15", reps: "15-20", rest: "45s", substitution: "Seated Calf Raise", notes: "Full stretch at bottom; pause at top" },
      ]},
      { day: "Tuesday", label: "Rest", type: "rest" },
      { day: "Wednesday", label: "Push", type: "training", exercises: [
        { name: "Dumbbell Press", warmupSets: "2 × 12", workingSets: "4 × 10", reps: "8-10", rest: "90s", substitution: "Machine Chest Press", notes: "Full range of motion; squeeze at top" },
        { name: "Arnold Press", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "10-12", rest: "60s", substitution: "Seated Dumbbell Press", notes: "Rotate palms during press" },
        { name: "Cable Fly", warmupSets: "—", workingSets: "3 × 12", reps: "12-15", rest: "60s", substitution: "Pec Deck", notes: "Slight bend in elbows; feel the stretch" },
        { name: "Front Raise", warmupSets: "—", workingSets: "3 × 12", reps: "12-15", rest: "45s", substitution: "Plate Front Raise", notes: "Control the movement; don't swing" },
        { name: "Skull Crushers", warmupSets: "—", workingSets: "3 × 12", reps: "10-12", rest: "45s", substitution: "Close-Grip Bench", notes: "Lower to forehead; elbows stay in" },
      ]},
      { day: "Thursday", label: "Pull", type: "training", exercises: [
        { name: "Pull-ups", warmupSets: "1 × 8", workingSets: "4 × max", reps: "AMRAP", rest: "120s", substitution: "Lat Pulldown", notes: "Full dead hang; chin above bar" },
        { name: "Dumbbell Row", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "10-12", rest: "60s", substitution: "Cable Row", notes: "One arm at a time; brace on bench" },
        { name: "Reverse Fly", warmupSets: "—", workingSets: "3 × 15", reps: "12-15", rest: "45s", substitution: "Face Pulls", notes: "Bend at hips; light weight, high control" },
        { name: "Hammer Curl", warmupSets: "—", workingSets: "3 × 12", reps: "10-12", rest: "45s", substitution: "Rope Curl", notes: "Neutral grip; no swinging" },
        { name: "Shrugs", warmupSets: "—", workingSets: "3 × 15", reps: "12-15", rest: "45s", substitution: "Dumbbell Shrugs", notes: "Hold at top for 2 seconds" },
      ]},
      { day: "Friday", label: "Legs", type: "training", exercises: [
        { name: "Front Squat", warmupSets: "2 × 10", workingSets: "4 × 8", reps: "8-10", rest: "120s", substitution: "Goblet Squat", notes: "Elbows high; upright torso" },
        { name: "Hip Thrust", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "10-12", rest: "90s", substitution: "Glute Bridge", notes: "Squeeze glutes at top; pause 1s" },
        { name: "Walking Lunges", warmupSets: "—", workingSets: "3 × 12/leg", reps: "10-12", rest: "60s", substitution: "Bulgarian Split Squat", notes: "Long stride; knee tracks over toes" },
        { name: "Leg Press", warmupSets: "—", workingSets: "3 × 12", reps: "12-15", rest: "60s", substitution: "Hack Squat", notes: "Don't lock knees at top" },
        { name: "Standing Calf Raise", warmupSets: "—", workingSets: "4 × 15", reps: "15-20", rest: "45s", substitution: "Donkey Calf Raise", notes: "Full range; slow eccentric" },
      ]},
    ],
  },
  upper_lower: {
    name: "Upper / Lower Split",
    daysPerWeek: "4 days",
    description: "Balanced split with adequate recovery between sessions",
    schedule: [
      { day: "Saturday", label: "Upper", type: "training", exercises: [
        { name: "Bench Press", warmupSets: "2 × 12", workingSets: "4 × 8", reps: "8-10", rest: "90s", substitution: "Dumbbell Press", notes: "Retract scapulae; controlled tempo" },
        { name: "Barbell Row", warmupSets: "2 × 12", workingSets: "4 × 8", reps: "8-10", rest: "90s", substitution: "Cable Row", notes: "45-degree torso angle; pull to navel" },
        { name: "Overhead Press", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "8-12", rest: "90s", substitution: "DB Shoulder Press", notes: "Brace core; straight bar path" },
        { name: "Lat Pulldown", warmupSets: "—", workingSets: "3 × 12", reps: "10-12", rest: "60s", substitution: "Pull-ups", notes: "Wide grip; squeeze lats" },
        { name: "Tricep Dips", warmupSets: "—", workingSets: "3 × 10", reps: "8-12", rest: "60s", substitution: "Close-Grip Bench", notes: "Lean forward slightly for chest emphasis" },
        { name: "Barbell Curl", warmupSets: "—", workingSets: "3 × 10", reps: "10-12", rest: "45s", substitution: "Dumbbell Curl", notes: "Strict form; no momentum" },
      ]},
      { day: "Sunday", label: "Lower", type: "training", exercises: [
        { name: "Squat", warmupSets: "2 × 12", workingSets: "4 × 6", reps: "6-8", rest: "120s", substitution: "Leg Press", notes: "Depth to parallel; drive through heels" },
        { name: "Romanian Deadlift", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "8-10", rest: "90s", substitution: "Good Mornings", notes: "Hinge pattern; maintain neutral spine" },
        { name: "Leg Extension", warmupSets: "—", workingSets: "3 × 15", reps: "12-15", rest: "60s", substitution: "Sissy Squats", notes: "Controlled reps; squeeze quads" },
        { name: "Leg Curl", warmupSets: "—", workingSets: "3 × 12", reps: "10-12", rest: "60s", substitution: "Stability Ball Curl", notes: "Full ROM; slow negative" },
        { name: "Calf Raises", warmupSets: "—", workingSets: "4 × 15", reps: "15-20", rest: "45s", substitution: "Seated Calf Raise", notes: "Stretch at bottom; hold at top" },
      ]},
      { day: "Monday", label: "Rest", type: "rest" },
      { day: "Tuesday", label: "Upper", type: "training", exercises: [
        { name: "Incline DB Press", warmupSets: "2 × 12", workingSets: "4 × 10", reps: "8-10", rest: "90s", substitution: "Incline Barbell Press", notes: "30-degree incline; full ROM" },
        { name: "Dumbbell Row", warmupSets: "1 × 12", workingSets: "4 × 10", reps: "10-12", rest: "60s", substitution: "Seated Cable Row", notes: "One arm at a time for balance" },
        { name: "Arnold Press", warmupSets: "1 × 10", workingSets: "3 × 10", reps: "10-12", rest: "60s", substitution: "Lateral Raises", notes: "Rotate during press" },
        { name: "Face Pulls", warmupSets: "—", workingSets: "3 × 15", reps: "12-15", rest: "45s", substitution: "Reverse Fly", notes: "High cable; external rotate at top" },
        { name: "Overhead Tricep Ext", warmupSets: "—", workingSets: "3 × 12", reps: "10-12", rest: "45s", substitution: "Skull Crushers", notes: "Full stretch at bottom" },
        { name: "Hammer Curl", warmupSets: "—", workingSets: "3 × 12", reps: "10-12", rest: "45s", substitution: "Rope Curl", notes: "Neutral grip; squeeze brachialis" },
      ]},
      { day: "Wednesday", label: "Lower", type: "training", exercises: [
        { name: "Front Squat", warmupSets: "2 × 10", workingSets: "4 × 8", reps: "8-10", rest: "120s", substitution: "Goblet Squat", notes: "Elbows high; upright torso" },
        { name: "Hip Thrust", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "10-12", rest: "90s", substitution: "Glute Bridge", notes: "Full hip extension; squeeze at top" },
        { name: "Bulgarian Split Squat", warmupSets: "—", workingSets: "3 × 10/leg", reps: "10-12", rest: "60s", substitution: "Walking Lunges", notes: "Rear foot elevated; knee tracks toes" },
        { name: "Leg Curl", warmupSets: "—", workingSets: "3 × 12", reps: "10-12", rest: "60s", substitution: "Nordic Curl", notes: "Controlled eccentric" },
        { name: "Standing Calf Raise", warmupSets: "—", workingSets: "4 × 15", reps: "15-20", rest: "45s", substitution: "Donkey Calf Raise", notes: "Full range; pause at peak" },
      ]},
      { day: "Thursday", label: "Rest", type: "rest" },
      { day: "Friday", label: "Rest", type: "rest" },
    ],
  },
  full_body: {
    name: "Full Body",
    daysPerWeek: "3 days",
    description: "Efficient full-body training for beginners and busy schedules",
    schedule: [
      { day: "Saturday", label: "Full Body A", type: "training", exercises: [
        { name: "Squat", warmupSets: "2 × 12", workingSets: "4 × 8", reps: "6-8", rest: "120s", substitution: "Leg Press", notes: "Full depth; brace core throughout" },
        { name: "Bench Press", warmupSets: "2 × 12", workingSets: "3 × 8", reps: "8-10", rest: "90s", substitution: "Dumbbell Press", notes: "Arch upper back; feet flat on floor" },
        { name: "Barbell Row", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "8-10", rest: "90s", substitution: "Dumbbell Row", notes: "Squeeze at top; controlled descent" },
        { name: "Overhead Press", warmupSets: "1 × 10", workingSets: "3 × 10", reps: "8-12", rest: "90s", substitution: "DB Shoulder Press", notes: "Lock out at top; no excessive arch" },
        { name: "Plank", warmupSets: "—", workingSets: "3 × 45s", reps: "Hold", rest: "30s", substitution: "Dead Bug", notes: "Straight line from head to heels" },
      ]},
      { day: "Sunday", label: "Rest", type: "rest" },
      { day: "Monday", label: "Full Body B", type: "training", exercises: [
        { name: "Deadlift", warmupSets: "2 × 10", workingSets: "4 × 6", reps: "5-6", rest: "150s", substitution: "Trap Bar Deadlift", notes: "Hips and shoulders rise together; grip tight" },
        { name: "Incline DB Press", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "10-12", rest: "60s", substitution: "Cable Fly", notes: "30-degree incline; deep stretch" },
        { name: "Lat Pulldown", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "10-12", rest: "60s", substitution: "Pull-ups", notes: "Lean back slightly; squeeze lats" },
        { name: "Dumbbell Lunges", warmupSets: "—", workingSets: "3 × 10/leg", reps: "10-12", rest: "60s", substitution: "Step-ups", notes: "Controlled descent; knee tracks toes" },
        { name: "Bicycle Crunches", warmupSets: "—", workingSets: "3 × 20", reps: "20", rest: "30s", substitution: "Russian Twists", notes: "Opposite elbow to knee; slow and controlled" },
      ]},
      { day: "Tuesday", label: "Rest", type: "rest" },
      { day: "Wednesday", label: "Full Body C", type: "training", exercises: [
        { name: "Front Squat", warmupSets: "2 × 10", workingSets: "3 × 8", reps: "8-10", rest: "120s", substitution: "Goblet Squat", notes: "Elbows high; maintain upright position" },
        { name: "Dumbbell Press", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "10-12", rest: "60s", substitution: "Push-ups", notes: "Neutral grip; full ROM" },
        { name: "Seated Cable Row", warmupSets: "1 × 12", workingSets: "3 × 12", reps: "10-12", rest: "60s", substitution: "T-Bar Row", notes: "Pull to lower chest; squeeze" },
        { name: "Romanian Deadlift", warmupSets: "1 × 12", workingSets: "3 × 10", reps: "8-10", rest: "90s", substitution: "Good Mornings", notes: "Feel hamstring stretch; neutral spine" },
        { name: "Face Pulls", warmupSets: "—", workingSets: "3 × 15", reps: "12-15", rest: "45s", substitution: "Reverse Fly", notes: "High cable; external rotation at end" },
      ]},
      { day: "Thursday", label: "Rest", type: "rest" },
      { day: "Friday", label: "Rest", type: "rest" },
    ],
  },
};

// Map user fitness level to a program
const getUserProgram = (): ProgramKey => {
  const storedProfile = localStorage.getItem("userProfile");
  if (storedProfile) {
    try {
      const profile = JSON.parse(storedProfile);
      if (profile.fitnessLevel === "Beginner") return "full_body";
      if (profile.fitnessLevel === "Intermediate") return "upper_lower";
      return "ppl";
    } catch { /* fallback */ }
  }
  return "ppl";
};

const Workouts = () => {
  const userProgram = getUserProgram();
  const program = programs[userProgram];
  const [selectedDay, setSelectedDay] = useState<DaySchedule | null>(null);

  if (selectedDay && selectedDay.type === "training" && selectedDay.exercises) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Button variant="ghost" className="mb-4" onClick={() => setSelectedDay(null)}>
              <ChevronLeft className="w-4 h-4 mr-2" /> Back to Schedule
            </Button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-white">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{selectedDay.day} — {selectedDay.label}</h1>
                <p className="text-muted-foreground">{selectedDay.exercises.length} exercises</p>
              </div>
            </div>

            <div className="space-y-4">
              {selectedDay.exercises.map((ex, i) => (
                <ExerciseCard key={i} exercise={ex} index={i + 1} />
              ))}
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{program.name}</h1>
            <p className="text-muted-foreground mt-1">{program.daysPerWeek} • Week 1</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {program.schedule.map((day, i) => (
              <motion.div key={day.day} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => day.type === "training" ? setSelectedDay(day) : null}
                className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                  day.type === "training"
                    ? "bg-card border-border hover:border-primary/30 hover:shadow-card cursor-pointer"
                    : "bg-muted/30 border-border"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    day.type === "training" ? "gradient-primary text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {day.type === "training" ? <Dumbbell className="w-5 h-5" /> : <RotateCcw className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{day.day}</p>
                    <p className="text-sm text-muted-foreground">{day.label}</p>
                  </div>
                </div>
                {day.type === "training" && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

const ExerciseCard = ({ exercise, index }: { exercise: Exercise; index: number }) => (
  <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
        {index}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-foreground text-lg mb-3">{exercise.name}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <Stat label="Warm-up" value={exercise.warmupSets} />
          <Stat label="Working Sets" value={exercise.workingSets} />
          <Stat label="Reps" value={exercise.reps} />
          <Stat label="Rest" value={exercise.rest} icon={<Clock className="w-3 h-3" />} />
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <RotateCcw className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
            <span><span className="text-muted-foreground">Substitution:</span> <span className="text-foreground">{exercise.substitution}</span></span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{exercise.notes}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Stat = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
  <div className="bg-muted/50 rounded-lg p-2 text-center">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="text-sm font-semibold text-foreground flex items-center justify-center gap-1">
      {icon}{value}
    </p>
  </div>
);

export default Workouts;

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Utensils, Flame, TrendingUp, Dumbbell, ChevronRight } from "lucide-react";

type GoalKey = "fitness" | "bulking" | "cutting";

interface Meal {
  name: string;
  time: string;
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
  ingredients: string[];
  tip: string;
}

interface DayPlan {
  day: string;
  totalCalories: number;
  meals: Meal[];
}

const goalInfo: Record<GoalKey, { label: string; description: string; icon: React.ReactNode; color: string }> = {
  fitness: { label: "General Fitness", description: "Balanced nutrition for overall health", icon: <TrendingUp className="w-6 h-6" />, color: "gradient-primary" },
  bulking: { label: "Build Muscle (Bulking)", description: "High-calorie meals for muscle growth", icon: <Dumbbell className="w-6 h-6" />, color: "bg-secondary" },
  cutting: { label: "Lose Weight (Cutting)", description: "Calorie-deficit meals for fat loss", icon: <Flame className="w-6 h-6" />, color: "bg-accent" },
};

const mealPlans: Record<GoalKey, DayPlan> = {
  fitness: {
    day: "Daily Plan", totalCalories: 2200,
    meals: [
      { name: "Oatmeal with Berries & Almonds", time: "Breakfast (7:00 AM)", calories: 420, protein: "15g", carbs: "55g", fats: "16g",
        ingredients: ["1 cup oats", "½ cup mixed berries", "1 tbsp almond butter", "1 tsp honey", "200ml milk"],
        tip: "Oats are rich in fiber and help stabilize blood sugar for sustained energy." },
      { name: "Grilled Chicken Salad with Quinoa", time: "Lunch (12:30 PM)", calories: 550, protein: "40g", carbs: "45g", fats: "18g",
        ingredients: ["150g chicken breast", "½ cup quinoa", "Mixed greens", "Cherry tomatoes", "Olive oil dressing"],
        tip: "Quinoa is a complete protein, providing all essential amino acids." },
      { name: "Greek Yogurt with Nuts", time: "Snack (3:30 PM)", calories: 280, protein: "20g", carbs: "22g", fats: "12g",
        ingredients: ["200g Greek yogurt", "1 tbsp honey", "30g mixed nuts", "½ banana"],
        tip: "Greek yogurt has double the protein of regular yogurt — great for recovery." },
      { name: "Salmon with Sweet Potato & Broccoli", time: "Dinner (7:00 PM)", calories: 620, protein: "38g", carbs: "50g", fats: "24g",
        ingredients: ["180g salmon fillet", "1 medium sweet potato", "1 cup broccoli", "Olive oil", "Lemon"],
        tip: "Salmon provides omega-3 fatty acids that reduce inflammation and improve mood." },
      { name: "Cottage Cheese with Seeds", time: "Evening Snack (9:00 PM)", calories: 230, protein: "22g", carbs: "10g", fats: "11g",
        ingredients: ["150g cottage cheese", "1 tbsp chia seeds", "1 tbsp pumpkin seeds"],
        tip: "Casein protein in cottage cheese digests slowly, aiding overnight muscle repair." },
    ],
  },
  bulking: {
    day: "Daily Plan", totalCalories: 3100,
    meals: [
      { name: "Egg & Avocado Toast with Smoothie", time: "Breakfast (7:00 AM)", calories: 680, protein: "35g", carbs: "65g", fats: "30g",
        ingredients: ["3 whole eggs", "2 slices whole grain bread", "½ avocado", "Banana peanut butter smoothie"],
        tip: "Eggs contain leucine — the key amino acid for triggering muscle protein synthesis." },
      { name: "Beef Stir-fry with Brown Rice", time: "Lunch (12:30 PM)", calories: 750, protein: "48g", carbs: "70g", fats: "25g",
        ingredients: ["200g lean beef strips", "1.5 cups brown rice", "Mixed vegetables", "Soy sauce", "Sesame oil"],
        tip: "Red meat is one of the best sources of creatine for strength and power." },
      { name: "Protein Shake with Oats & Banana", time: "Post-Workout (3:30 PM)", calories: 520, protein: "40g", carbs: "62g", fats: "10g",
        ingredients: ["2 scoops whey protein", "1 banana", "½ cup oats", "300ml milk", "1 tbsp honey"],
        tip: "Fast-digesting carbs + protein within 30 min post-workout maximizes recovery." },
      { name: "Chicken Pasta with Pesto", time: "Dinner (7:00 PM)", calories: 780, protein: "50g", carbs: "75g", fats: "28g",
        ingredients: ["200g chicken breast", "200g whole wheat pasta", "2 tbsp pesto", "Parmesan cheese", "Cherry tomatoes"],
        tip: "Whole wheat pasta provides sustained energy with higher fiber content." },
      { name: "Peanut Butter & Banana Wrap", time: "Evening Snack (9:30 PM)", calories: 370, protein: "15g", carbs: "40g", fats: "18g",
        ingredients: ["1 large tortilla", "2 tbsp peanut butter", "1 banana", "Drizzle of honey"],
        tip: "A calorie-dense snack that prevents overnight muscle breakdown." },
    ],
  },
  cutting: {
    day: "Daily Plan", totalCalories: 1700,
    meals: [
      { name: "Egg White Omelette with Spinach", time: "Breakfast (7:00 AM)", calories: 280, protein: "28g", carbs: "12g", fats: "14g",
        ingredients: ["5 egg whites + 1 yolk", "1 cup spinach", "¼ cup mushrooms", "½ avocado"],
        tip: "Spinach is rich in iron and magnesium, supporting energy during a calorie deficit." },
      { name: "Turkey & Vegetable Lettuce Wraps", time: "Lunch (12:30 PM)", calories: 380, protein: "35g", carbs: "20g", fats: "18g",
        ingredients: ["150g ground turkey", "Large lettuce leaves", "Diced tomato", "Cucumber", "Light sauce"],
        tip: "Lettuce wraps eliminate empty carbs while keeping meals satisfying." },
      { name: "Protein Shake with Berries", time: "Snack (3:30 PM)", calories: 200, protein: "30g", carbs: "15g", fats: "3g",
        ingredients: ["1.5 scoops whey protein", "½ cup mixed berries", "250ml water", "Ice"],
        tip: "Berries are low-calorie but high in antioxidants that fight exercise-induced stress." },
      { name: "Grilled Fish with Roasted Vegetables", time: "Dinner (7:00 PM)", calories: 450, protein: "42g", carbs: "25g", fats: "20g",
        ingredients: ["200g white fish (tilapia/cod)", "Zucchini", "Bell peppers", "Asparagus", "Olive oil spray"],
        tip: "White fish is extremely lean — high protein with minimal fat, perfect for cutting." },
      { name: "Casein Protein Pudding", time: "Evening Snack (9:00 PM)", calories: 180, protein: "25g", carbs: "12g", fats: "4g",
        ingredients: ["1 scoop casein protein", "100ml almond milk", "1 tsp cocoa powder"],
        tip: "Casein digests slowly over 6-8 hours, preventing muscle loss during sleep." },
    ],
  },
};

const Nutrition = () => {
  const [selectedGoal, setSelectedGoal] = useState<GoalKey | null>(null);
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);

  if (selectedGoal) {
    const plan = mealPlans[selectedGoal];
    const info = goalInfo[selectedGoal];
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Button variant="ghost" className="mb-4" onClick={() => { setSelectedGoal(null); setExpandedMeal(null); }}>
              ← Back to Goals
            </Button>

            <div className="flex items-center gap-4 mb-2">
              <div className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center text-white`}>{info.icon}</div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{info.label}</h1>
                <p className="text-muted-foreground">{plan.totalCalories} kcal / day</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6">
              <MacroCard label="Protein" value={plan.meals.reduce((s, m) => s + parseInt(m.protein), 0) + "g"} color="text-secondary" />
              <MacroCard label="Carbs" value={plan.meals.reduce((s, m) => s + parseInt(m.carbs), 0) + "g"} color="text-primary" />
              <MacroCard label="Fats" value={plan.meals.reduce((s, m) => s + parseInt(m.fats), 0) + "g"} color="text-accent" />
            </div>

            <div className="space-y-4">
              {plan.meals.map((meal, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
                  <div className="p-5 cursor-pointer flex items-center justify-between" onClick={() => setExpandedMeal(expandedMeal === i ? null : i)}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{meal.name}</h3>
                        <p className="text-sm text-muted-foreground">{meal.time} • {meal.calories} kcal</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${expandedMeal === i ? "rotate-90" : ""}`} />
                  </div>

                  {expandedMeal === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="px-5 pb-5 border-t border-border pt-4">
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <MiniStat label="Protein" value={meal.protein} />
                        <MiniStat label="Carbs" value={meal.carbs} />
                        <MiniStat label="Fats" value={meal.fats} />
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-foreground mb-2">Ingredients:</p>
                        <ul className="space-y-1">
                          {meal.ingredients.map((ing, j) => (
                            <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {ing}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-primary/10 rounded-xl p-3">
                        <p className="text-sm text-primary">💡 {meal.tip}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
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
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Nutrition Plans</h1>
          <p className="text-muted-foreground mb-8">Choose a plan based on your goal</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.keys(goalInfo) as GoalKey[]).map((key) => {
              const g = goalInfo[key];
              const plan = mealPlans[key];
              return (
                <motion.div key={key} whileHover={{ y: -4 }}
                  onClick={() => setSelectedGoal(key)}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border hover:border-primary/30 cursor-pointer transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl ${g.color} flex items-center justify-center text-white mb-4`}>{g.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{g.label}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{g.description}</p>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{plan.totalCalories} kcal/day</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

const MacroCard = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="bg-card rounded-xl p-4 border border-border text-center">
    <p className={`text-xl font-bold ${color}`}>{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-muted/50 rounded-lg p-2 text-center">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-semibold text-foreground">{value}</p>
  </div>
);

export default Nutrition;

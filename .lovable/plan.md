
## Goal
Auto-show the nutrition plan that matches the user's goal (derived from BMI + their stated primary goal), instead of the 3-card goal picker.

## Logic — resolve goal automatically

Read `userProfile` from localStorage (same source Workouts uses). Compute BMI from `height` + `weight`, then combine with the user's stated `mainGoal`:

1. If `mainGoal` explicitly says "bulking" / "build muscle" → `bulking`
2. If `mainGoal` explicitly says "cutting" / "lose weight" → `cutting`
3. If `mainGoal` says "maintain" / "general fitness" → use BMI:
   - BMI < 18.5 → `bulking`
   - BMI > 25 → `cutting`
   - 18.5–25 → `fitness` (maintain)
4. Fallback (no profile) → `fitness`

## Changes — `src/pages/dashboard/Nutrition.tsx`

1. Add `getUserGoal()` helper implementing the logic above.
2. Remove `selectedGoal` state and the goal-picker grid (the bottom `return` block).
3. Render the plan-detail view directly for the resolved goal.
4. Add a small header showing the user's BMI, weight, and why this plan was chosen (e.g. "BMI 22.4 · Maintain — General Fitness plan").
5. Remove "← Back to Goals" button.
6. Keep meal expand/collapse, macros, ingredients, and tips intact.
7. If no profile exists in localStorage, show a prompt linking to the assessment instead of a plan.

## Notes
- Nutrition data stays in the existing static `mealPlans` object. DB wiring is a later step (per project plan, nutrition data will be connected to DB later).
- Mirrors the pattern already used by `Workouts.tsx`.

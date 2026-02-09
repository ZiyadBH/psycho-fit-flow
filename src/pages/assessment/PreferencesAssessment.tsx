import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Brain, Dumbbell, Heart, Home, Users } from "lucide-react";

const PreferencesAssessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);

  const [responses, setResponses] = useState({
    exerciseTypes: [] as string[],
    preferredTime: "",
    sessionDuration: "",
    equipment: [] as string[],
  });

  const sections = [
    { title: "Exercise Preferences", description: "What activities do you enjoy?" },
    { title: "Available Equipment", description: "What do you have access to?" },
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      navigate("/assessment/results");
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      navigate("/assessment/physical");
    }
  };

  const handleExerciseToggle = (exercise: string) => {
    setResponses((prev) => ({
      ...prev,
      exerciseTypes: prev.exerciseTypes.includes(exercise)
        ? prev.exerciseTypes.filter((e) => e !== exercise)
        : [...prev.exerciseTypes, exercise],
    }));
  };

  const handleEquipmentToggle = (equipment: string) => {
    setResponses((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter((e) => e !== equipment)
        : [...prev.equipment, equipment],
    }));
  };

  const exerciseOptions = [
    { value: "strength", label: "Strength training (weights)", icon: <Dumbbell className="w-5 h-5" /> },
    { value: "cardio", label: "Cardio (walking, running)", icon: <Heart className="w-5 h-5" /> },
    { value: "flexibility", label: "Flexibility (yoga, pilates)", icon: <Heart className="w-5 h-5" /> },
    { value: "home", label: "Home exercises", icon: <Home className="w-5 h-5" /> },
    { value: "team", label: "Team sports", icon: <Users className="w-5 h-5" /> },
  ];

  const equipmentOptions = [
    "Nothing (bodyweight only)",
    "Free weights (dumbbells, kettlebells)",
    "Exercise machines",
    "Yoga mat",
    "Resistance bands",
    "Treadmill / Stationary bike",
  ];

  const progress = 50 + ((currentSection + 1) / 4) * 25;

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
            <span className="text-sm text-muted-foreground">Step 3 of 4</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-24">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Preferences
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {sections[currentSection].title}: {sections[currentSection].description}
          </p>

          {currentSection === 0 && (
            <div className="space-y-8">
              {/* Exercise Types */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  What type of exercises do you prefer?
                  <span className="text-muted-foreground font-normal ml-2">
                    (Select all that apply)
                  </span>
                </Label>
                <div className="space-y-3">
                  {exerciseOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                      onClick={() => handleExerciseToggle(option.value)}
                    >
                      <Checkbox
                        checked={responses.exerciseTypes.includes(option.value)}
                        onCheckedChange={() => handleExerciseToggle(option.value)}
                      />
                      <div className="text-primary">{option.icon}</div>
                      <Label className="cursor-pointer flex-1">{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferred Time */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  What is your preferred workout time?
                </Label>
                <RadioGroup
                  value={responses.preferredTime}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, preferredTime: value }))
                  }
                  className="grid grid-cols-3 gap-3"
                >
                  {["Morning", "Afternoon", "Evening"].map((time) => (
                    <div
                      key={time}
                      className="flex items-center justify-center p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem
                        value={time}
                        id={`time-${time}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`time-${time}`}
                        className="cursor-pointer font-semibold text-center"
                      >
                        {time}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Session Duration */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  What is your preferred session duration?
                </Label>
                <RadioGroup
                  value={responses.sessionDuration}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, sessionDuration: value }))
                  }
                  className="grid grid-cols-2 gap-3"
                >
                  {["15-30 min", "30-45 min", "45-60 min", "60+ min"].map(
                    (duration) => (
                      <div
                        key={duration}
                        className="flex items-center justify-center p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                      >
                        <RadioGroupItem
                          value={duration}
                          id={`duration-${duration}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`duration-${duration}`}
                          className="cursor-pointer font-semibold"
                        >
                          {duration}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
              </div>
            </div>
          )}

          {currentSection === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  What equipment do you have available?
                  <span className="text-muted-foreground font-normal ml-2">
                    (Select all that apply)
                  </span>
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {equipmentOptions.map((equipment) => (
                    <div
                      key={equipment}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                      onClick={() => handleEquipmentToggle(equipment)}
                    >
                      <Checkbox
                        checked={responses.equipment.includes(equipment)}
                        onCheckedChange={() => handleEquipmentToggle(equipment)}
                      />
                      <Label className="cursor-pointer flex-1 text-sm">
                        {equipment}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button variant="hero" onClick={handleNext}>
              {currentSection === sections.length - 1
                ? "View My Results"
                : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesAssessment;

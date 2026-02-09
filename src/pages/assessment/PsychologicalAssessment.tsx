import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Brain } from "lucide-react";

const PsychologicalAssessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);

  const [responses, setResponses] = useState({
    mainGoal: "",
    motivation: "",
    stressLevel: [5],
    moodLevel: [5],
    sleepHours: "",
    challenges: [] as string[],
    hasActivity: "",
    activityFrequency: "",
  });

  const sections = [
    {
      title: "Motivations and Goals",
      description: "Help us understand what drives you",
    },
    {
      title: "Current Psychological State",
      description: "Tell us how you're feeling right now",
    },
    {
      title: "Habits and Challenges",
      description: "Let's identify what's holding you back",
    },
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      navigate("/assessment/physical");
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      navigate("/");
    }
  };

  const handleChallengeToggle = (challenge: string) => {
    setResponses((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter((c) => c !== challenge)
        : [...prev.challenges, challenge],
    }));
  };

  const progress = ((currentSection + 1) / 4) * 25;

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
            <span className="text-sm text-muted-foreground">Step 1 of 4</span>
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
            Your Psychological Assessment
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {sections[currentSection].title}: {sections[currentSection].description}
          </p>

          {currentSection === 0 && (
            <div className="space-y-8">
              {/* Main Goal */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  What is your main goal?
                </Label>
                <RadioGroup
                  value={responses.mainGoal}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, mainGoal: value }))
                  }
                  className="space-y-3"
                >
                  {[
                    "Improve mood and reduce stress",
                    "Lose weight",
                    "Build muscle",
                    "Improve general fitness",
                    "Improve sleep",
                  ].map((goal) => (
                    <div
                      key={goal}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={goal} id={goal} />
                      <Label htmlFor={goal} className="cursor-pointer flex-1">
                        {goal}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Motivation */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  What is your primary motivation?
                </Label>
                <RadioGroup
                  value={responses.motivation}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, motivation: value }))
                  }
                  className="space-y-3"
                >
                  {[
                    { value: "internal", label: "Better health (internal motivation)" },
                    { value: "external", label: "Better appearance (external motivation)" },
                    { value: "social", label: "Social pressure" },
                    { value: "medical", label: "Medical advice" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="cursor-pointer flex-1">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {currentSection === 1 && (
            <div className="space-y-10">
              {/* Stress Level */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">
                    How would you rate your stress level today?
                  </Label>
                  <span className="text-2xl font-bold text-primary">
                    {responses.stressLevel[0]}/10
                  </span>
                </div>
                <Slider
                  value={responses.stressLevel}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, stressLevel: value }))
                  }
                  min={1}
                  max={10}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Very Low</span>
                  <span>Very High</span>
                </div>
              </div>

              {/* Mood Level */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">
                    How would you rate your mood today?
                  </Label>
                  <span className="text-2xl font-bold text-secondary">
                    {responses.moodLevel[0]}/10
                  </span>
                </div>
                <Slider
                  value={responses.moodLevel}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, moodLevel: value }))
                  }
                  min={1}
                  max={10}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Very Bad</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Sleep Hours */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  How many hours do you sleep on average per day?
                </Label>
                <RadioGroup
                  value={responses.sleepHours}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, sleepHours: value }))
                  }
                  className="grid grid-cols-2 gap-3"
                >
                  {["Less than 5", "5-7 hours", "7-9 hours", "More than 9"].map(
                    (hours) => (
                      <div
                        key={hours}
                        className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                      >
                        <RadioGroupItem value={hours} id={hours} />
                        <Label htmlFor={hours} className="cursor-pointer">
                          {hours}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div className="space-y-8">
              {/* Challenges */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  What is your biggest challenge in maintaining consistency?
                  <span className="text-muted-foreground font-normal ml-2">
                    (Select all that apply)
                  </span>
                </Label>
                <div className="space-y-3">
                  {[
                    "Lack of time",
                    "Lack of motivation",
                    "Lack of knowledge",
                    "Boredom with routine",
                    "No workout partner",
                  ].map((challenge) => (
                    <div
                      key={challenge}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                      onClick={() => handleChallengeToggle(challenge)}
                    >
                      <Checkbox
                        checked={responses.challenges.includes(challenge)}
                        onCheckedChange={() => handleChallengeToggle(challenge)}
                      />
                      <Label className="cursor-pointer flex-1">{challenge}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Activity */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Do you currently practice any physical activity?
                </Label>
                <RadioGroup
                  value={responses.hasActivity}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, hasActivity: value }))
                  }
                  className="flex gap-4"
                >
                  {["Yes", "No"].map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer flex-1"
                    >
                      <RadioGroupItem value={option} id={`activity-${option}`} />
                      <Label
                        htmlFor={`activity-${option}`}
                        className="cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {responses.hasActivity === "Yes" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4"
                >
                  <Label className="text-base font-semibold">
                    How many times per week?
                  </Label>
                  <RadioGroup
                    value={responses.activityFrequency}
                    onValueChange={(value) =>
                      setResponses((prev) => ({
                        ...prev,
                        activityFrequency: value,
                      }))
                    }
                    className="grid grid-cols-4 gap-3"
                  >
                    {["1-2", "3-4", "5-6", "7+"].map((freq) => (
                      <div
                        key={freq}
                        className="flex items-center justify-center p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                      >
                        <RadioGroupItem
                          value={freq}
                          id={`freq-${freq}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`freq-${freq}`}
                          className="cursor-pointer font-semibold"
                        >
                          {freq}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}
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
              {currentSection === 0 ? "Back to Home" : "Previous"}
            </Button>
            <Button variant="hero" onClick={handleNext}>
              {currentSection === sections.length - 1 ? "Continue" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologicalAssessment;

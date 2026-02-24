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
    EnergyLevel: "",
    MotivationLevel : "",
    stressLevel: [1],
    PersonalityPreference: "",
    Discipline: "",
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


  const progress = ((currentSection + 1) / 2) * 50;

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
                Psy<span className="text-primary">Fit</span>
              </span>
            </div>
            <span className="text-sm text-muted-foreground">Step 1 of 2</span>
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
            Psychological Features
          </h1>
          <p className="text-muted-foreground mb-8">
              Let's start by understanding your current energy levels and what motivates you.
          </p>

          {currentSection === 0 && (
            <div className="space-y-8">
              {/* Energy Level */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  How would you describe your current energy level ?
                </Label>
                <RadioGroup
                  value={responses.EnergyLevel}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, EnergyLevel: value }))
                  }
                  className="space-y-3"
                >
                  {[
                    { value: "0", label: "Low" },
                    { value: "1", label: "Moderate" },
                    { value: "2", label: "High" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option.value} id={`energy-${option.value}`} />
                      <Label htmlFor={`energy-${option.value}`} className="cursor-pointer flex-1">
                        {option.label}
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
                  value={responses.MotivationLevel}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, MotivationLevel: value }))
                  }
                  className="space-y-3"
                >
                  {[
                    { value: "0",  label: "Low motivation" },
                    { value: "1", label: "Medium motivation" },
                    { value: "2", label: "High motivation" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option.value} id={`motivation-${option.value}`} />
                      <Label htmlFor={`motivation-${option.value}`} className="cursor-pointer flex-1">
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
                    What is your current stress level?
                  </Label>
                  <span className="text-2xl font-bold text-primary">
                    {responses.stressLevel[0]}/2
                  </span>
                </div>
                <Slider
                  value={responses.stressLevel}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, stressLevel: value }))
                  }
                  min={0}
                  max={2}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Very Low</span>
                  <span>Very High</span>
                </div>
              </div>

              {/* Personality Preference */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Do you prefer training alone or in a social environment ?
                </Label>
                <RadioGroup
                  value={responses.PersonalityPreference}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, PersonalityPreference: value }))
                  }
                  className="grid grid-cols-2 gap-3"
                >
                  {[
                    { value: "0", label: "I prefer training alone" },
                    { value: "1", label: "I enjoy social or group training" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option.value} id={`personality-${option.value}`} />
                      <Label htmlFor={`personality-${option.value}`} className="cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Discipline */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  How disciplined are you with routines?
                </Label>
                <RadioGroup
                  value={responses.Discipline}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, Discipline: value }))
                  }
                  className="space-y-3"
                >
                  {[
                    { value: "0", label: "I struggle to stay consistent" },
                    { value: "1", label: "I try but sometimes fail" },
                    { value: "2", label: "I stay consistent most of the time" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option.value} id={`discipline-${option.value}`} />
                      <Label htmlFor={`discipline-${option.value}`} className="cursor-pointer flex-1">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
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

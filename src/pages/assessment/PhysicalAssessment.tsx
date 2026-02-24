import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Brain } from "lucide-react";

const PhysicalAssessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);

  const [responses, setResponses] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    workNature: "",
    workoutDays: "",
    fitnessLevel: "",
    diet: "",
    allergies: "",
  });

  const bmi = useMemo(() => {
    const weight = parseFloat(responses.weight);
    const height = parseFloat(responses.height) / 100;
    if (weight && height) {
      return (weight / (height * height)).toFixed(1);
    }
    return null;
  }, [responses.weight, responses.height]);

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-secondary" };
    if (bmi < 25) return { label: "Normal", color: "text-primary" };
    if (bmi < 30) return { label: "Overweight", color: "text-accent" };
    return { label: "Obese", color: "text-destructive" };
  };

  const sections = [
    { title: "Basic Information", description: "Tell us about yourself" },
    { title: "Current Activity", description: "Your fitness habits" },
    { title: "Nutrition", description: "Your dietary preferences" },
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      navigate("/assessment/preferences");
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      navigate("/assessment/psychological");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResponses((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const progress = 25 + ((currentSection + 1) / 4) * 25;

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
            <span className="text-sm text-muted-foreground">Step 2 of 4</span>
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
            Physical & Training Features
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {sections[currentSection].title}: {sections[currentSection].description}
          </p>

          {currentSection === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Your age"
                    value={responses.age}
                    onChange={handleChange}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup
                    value={responses.gender}
                    onValueChange={(value) =>
                      setResponses((prev) => ({ ...prev, gender: value }))
                    }
                    className="flex gap-3 h-12"
                  >
                    {["Male", "Female"].map((option) => (
                      <div
                        key={option}
                        className="flex items-center space-x-2 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer flex-1"
                      >
                        <RadioGroupItem value={option} id={`gender-${option}`} />
                        <Label htmlFor={`gender-${option}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Your weight"
                    value={responses.weight}
                    onChange={handleChange}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    placeholder="Your height"
                    value={responses.height}
                    onChange={handleChange}
                    className="h-12"
                  />
                </div>
              </div>

              {bmi && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-muted/50 border border-border"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Your BMI</p>
                      <p className="text-3xl font-bold text-foreground">{bmi}</p>
                    </div>
                    <div className={`text-right ${getBmiCategory(parseFloat(bmi)).color}`}>
                      <p className="text-lg font-semibold">
                        {getBmiCategory(parseFloat(bmi)).label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {currentSection === 1 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Nature of work</Label>
                <RadioGroup
                  value={responses.workNature}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, workNature: value }))
                  }
                  className="space-y-3"
                >
                  {[
                    { value: "office", label: "Office (Sedentary)" },
                    { value: "standing", label: "Standing (Moderate activity)" },
                    { value: "physical", label: "Physical (Active work)" },
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

              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Number of workout days per week
                </Label>
                <RadioGroup
                  value={responses.workoutDays}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, workoutDays: value }))
                  }
                  className="grid grid-cols-4 gap-3"
                >
                  {["0", "1-2", "3-4", "5+"].map((option) => (
                    <div
                      key={option}
                      className="flex items-center justify-center p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem
                        value={option}
                        id={`days-${option}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`days-${option}`}
                        className="cursor-pointer font-semibold"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Your fitness level</Label>
                <RadioGroup
                  value={responses.fitnessLevel}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, fitnessLevel: value }))
                  }
                  className="space-y-3"
                >
                  {[
                    "Complete beginner",
                    "Beginner",
                    "Intermediate",
                    "Advanced",
                  ].map((level) => (
                    <div
                      key={level}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={level} id={level} />
                      <Label htmlFor={level} className="cursor-pointer flex-1">
                        {level}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Your diet</Label>
                <RadioGroup
                  value={responses.diet}
                  onValueChange={(value) =>
                    setResponses((prev) => ({ ...prev, diet: value }))
                  }
                  className="space-y-3"
                >
                  {[
                    "Regular (no restrictions)",
                    "Vegetarian",
                    "Keto",
                    "Healthy balanced",
                    "No specific diet",
                  ].map((diet) => (
                    <div
                      key={diet}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={diet} id={diet} />
                      <Label htmlFor={diet} className="cursor-pointer flex-1">
                        {diet}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label htmlFor="allergies" className="text-base font-semibold">
                  Do you have any allergies or dietary restrictions?
                </Label>
                <Textarea
                  id="allergies"
                  name="allergies"
                  placeholder="E.g., gluten intolerance, nut allergy, lactose intolerant..."
                  value={responses.allergies}
                  onChange={handleChange}
                  rows={4}
                  className="resize-none"
                />
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
              {currentSection === sections.length - 1 ? "Continue" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalAssessment;

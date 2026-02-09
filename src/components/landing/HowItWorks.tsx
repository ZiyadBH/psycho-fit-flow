import { motion } from "framer-motion";
import { ClipboardCheck, Brain, CalendarDays } from "lucide-react";

const steps: StepCardProps[] = [
  {
    icon: <ClipboardCheck className="w-8 h-8" />,
    step: "01",
    title: "Answer Simple Questions",
    description: "Complete a quick psychological and physical assessment to help us understand your unique needs and goals.",
    color: "primary",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    step: "02",
    title: "AI Analyzes Your Data",
    description: "Our platform analyzes your responses using the advanced Psycho-Fitness model to create your personalized profile.",
    color: "secondary",
  },
  {
    icon: <CalendarDays className="w-8 h-8" />,
    step: "03",
    title: "Get Your Weekly Plan",
    description: "Receive a comprehensive weekly plan for training and nutrition, perfectly tailored to your psychological and physical state.",
    color: "accent",
  },
];

interface StepCardProps {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
  color: "primary" | "secondary" | "accent";
}

const HowItWorks = () => {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How the Platform Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your health journey with personalized recommendations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <StepCard {...step} />
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ icon, step, title, description, color }: StepCardProps) => {
  const colorClasses = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
  };

  const bgClasses = {
    primary: "bg-primary/5",
    secondary: "bg-secondary/5",
    accent: "bg-accent/5",
  };

  return (
    <div className={`relative rounded-2xl p-8 ${bgClasses[color]} border border-border/50 hover:border-border transition-colors`}>
      {/* Step number */}
      <div className="absolute -top-4 left-8">
        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${colorClasses[color]} text-sm font-bold`}>
          {step}
        </span>
      </div>

      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colorClasses[color]} mb-6 mt-4`}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default HowItWorks;

import { motion } from "framer-motion";
import { Sparkles, LineChart, MessageCircle, FileText, Brain, Utensils, Calendar, Shield } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Personalized Recommendations",
    description: "Get training and nutrition plans customized to your psychological and physical profile.",
    gradient: "from-primary to-primary/70",
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Daily Mood Tracking",
    description: "Track your daily mood and see how it correlates with your exercise and nutrition patterns.",
    gradient: "from-secondary to-secondary/70",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "AI Chatbot Support",
    description: "Get instant psychological support and motivation from our intelligent chatbot assistant.",
    gradient: "from-accent to-accent/70",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Comprehensive Reports",
    description: "Receive detailed weekly reports on your progress, trends, and personalized improvement tips.",
    gradient: "from-primary to-secondary",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to achieve complete physical and mental wellness in one platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const FeatureCard = ({ icon, title, description, gradient }: FeatureCardProps) => {
  return (
    <div className="group relative bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} text-white mb-6`}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default FeaturesSection;

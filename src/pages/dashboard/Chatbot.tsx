import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Send, User } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "bot";
  text: string;
}

const quickButtons = [
  "I feel stressed, what should I do?",
  "I don't have motivation to exercise today",
  "I feel like I'm not progressing",
  "How can I improve my sleep?",
];

const botResponses: Record<string, string> = {
  stressed:
    "I understand you're feeling stressed. Try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds. This activates your parasympathetic nervous system and helps reduce anxiety. Would you like me to guide you through it?",
  motivation:
    "It's completely normal to feel unmotivated sometimes. Remember, even 5 minutes of exercise is better than nothing! Try this: put on your workout clothes and commit to just 5 minutes. Often, once you start, you'll want to continue. What type of quick exercise would you prefer - stretching, walking, or dancing?",
  progress:
    "Progress isn't always visible, but it's happening! Remember, wellness is a journey, not a destination. Let's look at your data - you've been consistent with your mood tracking, and that's already a huge achievement. Small steps lead to big changes. What specific area do you feel stuck in?",
  sleep:
    "Great sleep hygiene is crucial for both mental and physical health. Here are some tips: 1) Set a consistent bedtime, 2) Avoid screens 1 hour before bed, 3) Keep your room cool and dark, 4) Try a relaxing routine like reading or gentle stretching. Would you like a personalized sleep schedule recommendation?",
  default:
    "I'm here to support you on your wellness journey. Whether you're feeling stressed, need motivation, or just want someone to talk to, I'm listening. What's on your mind today?",
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Hello! 👋 I'm your personal wellness assistant. How can I help you today? You can ask me anything about stress management, motivation, exercise, nutrition, or mental health.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("stress") || lowerMessage.includes("anxious") || lowerMessage.includes("nervous")) {
      return botResponses.stressed;
    }
    if (lowerMessage.includes("motivation") || lowerMessage.includes("can't") || lowerMessage.includes("don't want")) {
      return botResponses.motivation;
    }
    if (lowerMessage.includes("progress") || lowerMessage.includes("stuck") || lowerMessage.includes("not working")) {
      return botResponses.progress;
    }
    if (lowerMessage.includes("sleep") || lowerMessage.includes("tired") || lowerMessage.includes("exhausted")) {
      return botResponses.sleep;
    }
    
    return botResponses.default;
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot typing
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add bot response
    const botMessage: Message = {
      id: messages.length + 2,
      type: "bot",
      text: getBotResponse(messageText),
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto h-[calc(100vh-180px)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Wellness Assistant
          </h1>
          <p className="text-muted-foreground text-sm">
            Your personal support for mental and physical wellness
          </p>
        </motion.div>

        {/* Chat Container */}
        <div className="flex-1 bg-card rounded-2xl border border-border shadow-card overflow-hidden flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  message.type === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
                    message.type === "bot"
                      ? "gradient-primary text-white"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.type === "bot" ? (
                    <Brain className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.type === "bot"
                      ? "bg-muted text-foreground rounded-tl-none"
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full gradient-primary text-white shrink-0">
                  <Brain className="w-4 h-4" />
                </div>
                <div className="bg-muted p-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Buttons */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickButtons.map((text) => (
                  <Button
                    key={text}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSend(text)}
                    className="text-xs"
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                variant="hero"
                size="icon"
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chatbot;

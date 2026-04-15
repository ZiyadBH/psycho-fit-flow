import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/dashboard/Index";
import Auth from "./pages/dashboard/Auth";
import PsychologicalAssessment from "./pages/assessment/PsychologicalAssessment";
import PhysicalAssessment from "./pages/assessment/PhysicalAssessment";
import AssessmentResults from "./pages/assessment/AssessmentResults";
import Dashboard from "./pages/dashboard/Dashboard";
import MyPlan from "./pages/dashboard/MyPlan";
import MoodTracker from "./pages/dashboard/MoodTracker";
import Chatbot from "./pages/dashboard/Chatbot";
import Workouts from "./pages/dashboard/Workouts";
import Nutrition from "./pages/dashboard/Nutrition";
import Reports from "./pages/dashboard/Reports";
import Profile from "./pages/dashboard/Profile";
import NotFound from "./pages/dashboard/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/assessment/psychological" element={<PsychologicalAssessment />} />
          <Route path="/assessment/physical" element={<PhysicalAssessment />} />
          <Route path="/assessment/results" element={<AssessmentResults />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/plan" element={<MyPlan />} />
          <Route path="/dashboard/mood" element={<MoodTracker />} />
          <Route path="/dashboard/chat" element={<Chatbot />} />
          <Route path="/dashboard/workouts" element={<Workouts />} />
          <Route path="/dashboard/nutrition" element={<Nutrition />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

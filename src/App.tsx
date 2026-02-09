import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PsychologicalAssessment from "./pages/assessment/PsychologicalAssessment";
import PhysicalAssessment from "./pages/assessment/PhysicalAssessment";
import PreferencesAssessment from "./pages/assessment/PreferencesAssessment";
import AssessmentResults from "./pages/assessment/AssessmentResults";
import Dashboard from "./pages/Dashboard";
import MoodTracker from "./pages/dashboard/MoodTracker";
import Chatbot from "./pages/dashboard/Chatbot";
import NotFound from "./pages/NotFound";

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
          <Route path="/assessment/preferences" element={<PreferencesAssessment />} />
          <Route path="/assessment/results" element={<AssessmentResults />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/mood" element={<MoodTracker />} />
          <Route path="/dashboard/chat" element={<Chatbot />} />
          <Route path="/dashboard/plan" element={<Dashboard />} />
          <Route path="/dashboard/workouts" element={<Dashboard />} />
          <Route path="/dashboard/nutrition" element={<Dashboard />} />
          <Route path="/dashboard/reports" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

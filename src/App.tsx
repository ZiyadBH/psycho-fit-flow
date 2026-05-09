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
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const Protected = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/assessment/psychological" element={<Protected><PsychologicalAssessment /></Protected>} />
            <Route path="/assessment/physical" element={<Protected><PhysicalAssessment /></Protected>} />
            <Route path="/assessment/results" element={<Protected><AssessmentResults /></Protected>} />
            <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route path="/dashboard/plan" element={<Protected><MyPlan /></Protected>} />
            <Route path="/dashboard/mood" element={<Protected><MoodTracker /></Protected>} />
            <Route path="/dashboard/chat" element={<Protected><Chatbot /></Protected>} />
            <Route path="/dashboard/workouts" element={<Protected><Workouts /></Protected>} />
            <Route path="/dashboard/nutrition" element={<Protected><Nutrition /></Protected>} />
            <Route path="/dashboard/reports" element={<Protected><Reports /></Protected>} />
            <Route path="/dashboard/profile" element={<Protected><Profile /></Protected>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

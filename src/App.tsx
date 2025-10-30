import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TutorDashboard from "./pages/tutor/Dashboard";
import Animals from "./pages/tutor/Animals";
import AnimalNew from "./pages/tutor/AnimalNew";
import Triage from "./pages/tutor/Triage";
import Appointments from "./pages/tutor/Appointments";
import Education from "./pages/tutor/Education";
import Profile from "./pages/tutor/Profile";
import VetDashboard from "./pages/vet/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Tutor Routes */}
            <Route path="/tutor/dashboard" element={<ProtectedRoute><TutorDashboard /></ProtectedRoute>} />
            <Route path="/tutor/animals" element={<ProtectedRoute><Animals /></ProtectedRoute>} />
            <Route path="/tutor/animal/new" element={<ProtectedRoute><AnimalNew /></ProtectedRoute>} />
            <Route path="/tutor/triage" element={<ProtectedRoute><Triage /></ProtectedRoute>} />
            <Route path="/tutor/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
            <Route path="/tutor/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
            <Route path="/tutor/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            
            {/* Veterinarian Routes */}
            <Route path="/vet/dashboard" element={<ProtectedRoute><VetDashboard /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

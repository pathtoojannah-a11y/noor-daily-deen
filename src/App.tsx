import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Today from "./pages/Today";
import Dashboard from "./pages/Dashboard";
import Reflections from "./pages/Reflections";
import Settings from "./pages/Settings";
import Wake from "./pages/Wake";
import Bedtime from "./pages/Bedtime";
import Adhkar from "./pages/Adhkar";
import AdhkarCategory from "./pages/AdhkarCategory";
import Alarms from "./pages/Alarms";
import AlarmEdit from "./pages/AlarmEdit";
import ReminderEdit from "./pages/ReminderEdit";
import NotFound from "./pages/NotFound";



const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/today" element={<Today />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reflections" element={<Reflections />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/wake" element={<Wake />} />
        <Route path="/bedtime" element={<Bedtime />} />
        <Route path="/adhkar" element={<Adhkar />} />
        <Route path="/adhkar/:slug" element={<AdhkarCategory />} />
        <Route path="/alarms" element={<Alarms />} />
        <Route path="/alarms/:id" element={<AlarmEdit />} />
        <Route path="/reminders/:id" element={<ReminderEdit />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Today from "./pages/Today";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Wake from "./pages/Wake";
import Bedtime from "./pages/Bedtime";
import Adhkar from "./pages/Adhkar";
import AdhkarCategory from "./pages/AdhkarCategory";
import Quran from "./pages/Quran";
import Hadith from "./pages/Hadith";
import HadithChapters from "./pages/HadithChapters";
import HadithBook from "./pages/HadithBook";
import Notifications from "./pages/Notifications";
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
        <Route path="/settings" element={<Settings />} />
        <Route path="/wake" element={<Wake />} />
        <Route path="/bedtime" element={<Bedtime />} />
        <Route path="/adhkar" element={<Adhkar />} />
        <Route path="/adhkar/:slug" element={<AdhkarCategory />} />
        <Route path="/quran" element={<Quran />} />
        <Route path="/hadith" element={<Hadith />} />
        <Route path="/hadith/:bookId" element={<HadithChapters />} />
        <Route path="/hadith/:bookId/chapter/:chapterId" element={<HadithBook />} />
        <Route path="/notifications" element={<Notifications />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;


// Raipur.life v1.0
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import History from "./pages/History";
import Tourism from "./pages/Tourism";
import Food from "./pages/Food";
import Events from "./pages/Events";
import Shopping from "./pages/Shopping";
import Gallery from "./pages/Gallery";
import PlanTrip from "./pages/PlanTrip";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="raipur-life-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/history" element={<History />} />
            <Route path="/tourism" element={<Tourism />} />
            <Route path="/food" element={<Food />} />
            <Route path="/events" element={<Events />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/plan-trip" element={<PlanTrip />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

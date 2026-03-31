import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const History = lazy(() => import("./pages/History"));
const Tourism = lazy(() => import("./pages/Tourism"));
const Food = lazy(() => import("./pages/Food"));
const Events = lazy(() => import("./pages/Events"));
const Shopping = lazy(() => import("./pages/Shopping"));
const Gallery = lazy(() => import("./pages/Gallery"));
const PlanTrip = lazy(() => import("./pages/PlanTrip"));
const Contact = lazy(() => import("./pages/Contact"));
const AddReview = lazy(() => import("./pages/AddReview"));
const Moderation = lazy(() => import("./pages/Moderation"));

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="raipur-life-theme-v2">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="grid min-h-[50vh] place-items-center text-muted-foreground">
                Loading Raipur...
              </div>
            }
          >
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
              <Route path="/add-review" element={<AddReview />} />
              <Route path="/moderation" element={<Moderation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

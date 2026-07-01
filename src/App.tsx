import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HerbCollector from "./pages/HerbCollector";
import Processor from "./pages/Processor";
import Distributor from "./pages/Distributor";
import Retailer from "./pages/Retailer";
import Consumer from "./pages/Consumer";
import Regulator from "./pages/Regulator";
import Laboratory from "./pages/Laboratory";
import Dashboard from "./pages/Dashboard";
import Manufacturer from "./pages/Manufacturer";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/collector" element={<HerbCollector />} />
        <Route path="/processor" element={<Processor />} />
        <Route path="/distributor" element={<Distributor />} />
        <Route path="/retailer" element={<Retailer />} />
        <Route path="/consumer" element={<Consumer />} />
        <Route path="/regulator" element={<Regulator />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/manufacturer" element={<Manufacturer />} />
    <Route path="/laboratory" element={<Laboratory />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Routes, Route, BrowserRouter } from "react-router-dom";

// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import HerbCollector from "./pages/HerbCollector";
// import Processor from "./pages/Processor";
// import Distributor from "./pages/Distributor";
// import Retailer from "./pages/Retailer";
// import Consumer from "./pages/Consumer";
// import Regulator from "./pages/Regulator";
// import Laboratory from "./pages/Laboratory";
// import Dashboard from "./pages/Dashboard";
// import Manufacturer from "./pages/Manufacturer";

// // ✅ Newly added imports
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           {/* Existing Routes */}
//           <Route path="/" element={<Index />} />
//           <Route path="/collector" element={<HerbCollector />} />
//           <Route path="/processor" element={<Processor />} />
//           <Route path="/distributor" element={<Distributor />} />
//           <Route path="/retailer" element={<Retailer />} />
//           <Route path="/consumer" element={<Consumer />} />
//           <Route path="/regulator" element={<Regulator />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/manufacturer" element={<Manufacturer />} />
//           <Route path="/laboratory" element={<Laboratory />} />

//           {/* ✅ New Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Catch-all route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
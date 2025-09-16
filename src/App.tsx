import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import Index from "./pages/Index";
import BeneficiaryManagement from "./pages/BeneficiaryManagement";
import BeneficiaryLifecycle from "./pages/BeneficiaryLifecycle";
import HighRiskBeneficiaries from "./pages/HighRiskBeneficiaries";
import NutritionMonitoring from "./pages/NutritionMonitoring";
import DiagnosticResults from "./pages/DiagnosticResults";
import IECMaterials from "./pages/IECMaterials";
import MonitoringDashboard from "./pages/MonitoringDashboard";
import BeneficiaryRegister from "./pages/BeneficiaryRegister";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Facilities from "./pages/Facilities";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <DashboardHeader />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/beneficiaries" element={<BeneficiaryManagement />} />
                  <Route path="/beneficiaries/search" element={<BeneficiaryManagement />} />
                  <Route path="/beneficiaries/lifecycle" element={<BeneficiaryLifecycle />} />
                  <Route path="/beneficiaries/high-risk" element={<HighRiskBeneficiaries />} />
                  <Route path="/health/nutrition" element={<NutritionMonitoring />} />
                  <Route path="/health/medicine" element={<NutritionMonitoring />} />
                  <Route path="/health/diagnostics" element={<DiagnosticResults />} />
                  <Route path="/beneficiaries/register" element={<BeneficiaryRegister />} />
                  <Route path="/iec-materials" element={<IECMaterials />} />
                  <Route path="/monitoring" element={<MonitoringDashboard />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/facilities" element={<Facilities />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

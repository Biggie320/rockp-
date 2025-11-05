import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { LoginPage } from "./components/LoginPage";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { DashboardPage } from "./components/DashboardPage";
import { UploadPage } from "./components/UploadPage";
import { DocumentsPage } from "./components/DocumentsPage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { LogsPage } from "./components/LogsPage";
import { SettingsPage } from "./components/SettingsPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleLogin = (email: string, role: string, name: string) => {
    setUser({ email, role, name });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
    setUser({ name: "", email: "", role: "" });
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
      />
      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <TopBar
        userName={user.name}
        userRole={user.role}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="md:ml-64 pt-16">
        {currentPage === "dashboard" && <DashboardPage />}
        {currentPage === "upload" && <UploadPage />}
        {currentPage === "documents" && <DocumentsPage onNavigate={handleNavigate} />}
        {currentPage === "analytics" && <AnalyticsPage />}
        {currentPage === "logs" && <LogsPage />}
        {currentPage === "settings" && (
          <SettingsPage
            userName={user.name}
            userEmail={user.email}
            userRole={user.role}
          />
        )}
      </div>

      <Toaster />
    </div>
  );
}

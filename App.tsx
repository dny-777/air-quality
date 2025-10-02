import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./components/Dashboard";
import { HistoricalTrends } from "./components/HistoricalTrends";
import { Settings } from "./components/Settings";
import { About } from "./components/About";
import { Chatbot } from "./components/Chatbot";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("landing");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {currentPage === "landing" ? (
        <LandingPage onGetStarted={() => handleNavigate("dashboard")} />
      ) : (
        <>
          <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "trends" && <HistoricalTrends />}
          {currentPage === "alerts" && (
            <div className="container mx-auto px-4 py-8">
              <h1 className="mb-4">Alerts & Notifications</h1>
              <p className="text-muted-foreground mb-6">
                Manage your air quality alerts and view notification history
              </p>
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Configure your alert preferences in{" "}
                  <button
                    onClick={() => handleNavigate("settings")}
                    className="text-blue-600 hover:underline"
                  >
                    Settings
                  </button>
                </p>
              </div>
            </div>
          )}
          {currentPage === "about" && <About />}
          {currentPage === "settings" && <Settings />}
        </>
      )}

      {/* Floating Chatbot - Available on all pages except landing */}
      {currentPage !== "landing" && <Chatbot />}

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
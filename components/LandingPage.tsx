import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50">
      {/* Animated Cloud Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="max-w-4xl space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600">Powered by NASA TEMPO Satellite Data</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            Predicting Cleaner, Safer Skies
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Real-time forecasts powered by NASA's TEMPO + AI
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white gap-2 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Check Air Quality Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
            {["Real-time Monitoring", "24-72hr Forecasts", "AI-Powered Insights", "Personalized Alerts"].map(
              (feature) => (
                <div
                  key={feature}
                  className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm border border-green-200"
                >
                  {feature}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(10px) translateY(-10px); }
          75% { transform: translateX(-10px) translateY(10px); }
        }

        @keyframes drift {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .cloud {
          position: absolute;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1));
          border-radius: 100px;
          filter: blur(40px);
          opacity: 0.6;
        }

        .cloud-1 {
          width: 300px;
          height: 100px;
          top: 20%;
          animation: drift 60s linear infinite;
          animation-delay: 0s;
        }

        .cloud-2 {
          width: 400px;
          height: 120px;
          top: 50%;
          animation: drift 80s linear infinite;
          animation-delay: -20s;
        }

        .cloud-3 {
          width: 250px;
          height: 90px;
          top: 70%;
          animation: drift 70s linear infinite;
          animation-delay: -40s;
        }

        .cloud-4 {
          width: 350px;
          height: 110px;
          top: 35%;
          animation: drift 90s linear infinite;
          animation-delay: -60s;
        }
      `}</style>
    </div>
  );
}
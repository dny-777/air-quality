import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin } from "lucide-react";

export function AQIMap() {
  // Mock heat map data for different cities
  const locations = [
    { city: "New York", aqi: 45, level: "good", x: 25, y: 30 },
    { city: "Los Angeles", aqi: 78, level: "moderate", x: 10, y: 45 },
    { city: "Chicago", aqi: 52, level: "good", x: 32, y: 35 },
    { city: "Houston", aqi: 95, level: "unhealthy", x: 35, y: 70 },
    { city: "Phoenix", aqi: 105, level: "unhealthy", x: 15, y: 60 },
    { city: "Miami", aqi: 42, level: "good", x: 55, y: 80 },
    { city: "Seattle", aqi: 38, level: "good", x: 8, y: 20 },
    { city: "Boston", aqi: 55, level: "moderate", x: 42, y: 28 },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "good":
        return "bg-green-500";
      case "moderate":
        return "bg-yellow-500";
      case "unhealthy":
        return "bg-orange-500";
      case "hazardous":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getAQILabel = (aqi: number) => {
    if (aqi <= 50) return { label: "Good", color: "text-green-600" };
    if (aqi <= 100) return { label: "Moderate", color: "text-yellow-600" };
    if (aqi <= 150) return { label: "Unhealthy", color: "text-orange-600" };
    return { label: "Hazardous", color: "text-red-600" };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Live Air Quality Heat Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Map visualization */}
        <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
          {/* Mock US map background */}
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 10 20 L 15 15 L 40 18 L 50 25 L 60 22 L 70 30 L 65 50 L 55 60 L 45 65 L 30 70 L 20 65 L 15 50 L 10 35 Z"
                fill="currentColor"
                className="text-blue-300"
              />
            </svg>
          </div>

          {/* Location markers */}
          {locations.map((location) => {
            const { label, color } = getAQILabel(location.aqi);
            return (
              <div
                key={location.city}
                className="absolute group cursor-pointer"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
              >
                {/* Pulse effect */}
                <div className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full ${getLevelColor(location.level)} opacity-30 animate-ping`}></div>
                
                {/* Marker */}
                <div className={`w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${getLevelColor(location.level)} border-2 border-white shadow-lg`}></div>

                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 top-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-white rounded-lg shadow-xl p-3 whitespace-nowrap border border-border">
                    <p className="font-semibold">{location.city}</p>
                    <p className="text-sm">AQI: <span className={color}>{location.aqi}</span></p>
                    <p className={`text-xs ${color}`}>{label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm">Good (0-50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-sm">Moderate (51-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span className="text-sm">Unhealthy (101-150)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm">Hazardous (151+)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
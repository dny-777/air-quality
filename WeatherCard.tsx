import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";

type WeatherData = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  locationName?: string;
};

interface WeatherCardProps {
  data?: WeatherData;
  loading?: boolean;
  error?: string | null;
}

export function WeatherCard({ data, loading, error }: WeatherCardProps) {
  const fallback: WeatherData = {
    temperature: 72,
    humidity: 65,
    windSpeed: 8,
    condition: "Partly Cloudy",
  };

  const weatherData = data ?? fallback;

  const weatherItems = [
    {
      icon: Thermometer,
      label: "Temperature",
      value: `${Math.round(weatherData.temperature)}°F`,
      color: "text-orange-500",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weatherData.humidity}%`,
      color: "text-blue-500",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${Math.round(weatherData.windSpeed)} mph`,
      color: "text-cyan-500",
    },
    {
      icon: Cloud,
      label: "Condition",
      value: weatherData.condition,
      color: "text-gray-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Current Weather{weatherData.locationName ? ` · ${weatherData.locationName}` : ""}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="h-16 rounded-lg bg-muted/30 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {weatherItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                >
                  <div className={`p-2 rounded-lg bg-white ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
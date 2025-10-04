import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";

interface WeatherCardProps {
  zipCode: string;
  apiKey: string;
}

type FetchedWeatherData = {
  locationName: string;
  temperatureFahrenheit: number;
  humidityPercentage: number;
  windSpeedMph: number;
  conditionLabel: string;
};

export function WeatherCard({ zipCode, apiKey }: WeatherCardProps) {
  const [weatherData, setWeatherData] = useState<FetchedWeatherData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let abortController = new AbortController();
    async function fetchWeatherByZipCode() {
      if (!zipCode || !apiKey) {
        setWeatherData(null);
        return;
      }
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const endpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(
          `${zipCode},US`,
        )}&units=imperial&appid=${encodeURIComponent(apiKey)}`;
        const response = await fetch(endpoint, { signal: abortController.signal });
        if (!response.ok) {
          const problemText = await response.text().catch(() => "");
          throw new Error(
            `Request failed (${response.status} ${response.statusText}) ${problemText}`,
          );
        }
        const json = await response.json();
        const normalized: FetchedWeatherData = {
          locationName: typeof json?.name === "string" && json.name.length > 0 ? json.name : zipCode,
          temperatureFahrenheit: Number(json?.main?.temp ?? NaN),
          humidityPercentage: Number(json?.main?.humidity ?? NaN),
          windSpeedMph: Number(json?.wind?.speed ?? NaN),
          conditionLabel:
            Array.isArray(json?.weather) && json.weather.length > 0 && typeof json.weather[0]?.main === "string"
              ? json.weather[0].main
              : "Unknown",
        };
        setWeatherData(normalized);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        setErrorMessage(message);
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeatherByZipCode();
    return () => {
      abortController.abort();
    };
  }, [zipCode, apiKey]);

  const weatherItems = weatherData
    ? [
        {
          icon: Thermometer,
          label: "Temperature",
          value: `${Math.round(weatherData.temperatureFahrenheit)}°F`,
          color: "text-orange-500",
        },
        {
          icon: Droplets,
          label: "Humidity",
          value: `${Math.round(weatherData.humidityPercentage)}%`,
          color: "text-blue-500",
        },
        {
          icon: Wind,
          label: "Wind Speed",
          value: `${Math.round(weatherData.windSpeedMph)} mph`,
          color: "text-cyan-500",
        },
        {
          icon: Cloud,
          label: "Condition",
          value: weatherData.conditionLabel,
          color: "text-gray-500",
        },
      ]
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isLoading
            ? "Loading Weather..."
            : errorMessage
            ? "Weather Unavailable"
            : `Current Weather${weatherData?.locationName ? ` • ${weatherData.locationName}` : ""}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="text-sm text-muted-foreground">Fetching latest conditions…</div>
        )}
        {!isLoading && errorMessage && (
          <div className="text-sm text-red-600 break-words">
            {errorMessage}
          </div>
        )}
        {!isLoading && !errorMessage && weatherItems.length > 0 && (
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
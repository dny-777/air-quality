import { useCallback, useEffect, useMemo, useState } from "react";
import { Wind, Droplet, Zap, CloudRain, MapPin, Search, Loader2 } from "lucide-react";
import { AQICard } from "./AQICard";
import { AQIMap } from "./AQIMap";
import { ForecastChart } from "./ForecastChart";
import { WeatherCard } from "./WeatherCard";
import { AlertBanner } from "./AlertBanner";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type ZipOrCity = string;

type CityZip = {
  city: string;
  state: string;
  zip: string;
};

const CITY_ZIPS: CityZip[] = [
  // Northeast
  { city: "New York City", state: "NY", zip: "10001" },
  { city: "Boston", state: "MA", zip: "02108" },
  { city: "Philadelphia", state: "PA", zip: "19102" },
  { city: "Washington", state: "DC", zip: "20001" },
  // Midwest
  { city: "Chicago", state: "IL", zip: "60601" },
  { city: "Detroit", state: "MI", zip: "48226" },
  { city: "Minneapolis", state: "MN", zip: "55401" },
  { city: "Kansas City", state: "MO", zip: "64106" },
  // South / Southeast
  { city: "Houston", state: "TX", zip: "77002" },
  { city: "Dallas", state: "TX", zip: "75201" },
  { city: "Atlanta", state: "GA", zip: "30303" },
  { city: "New Orleans", state: "LA", zip: "70112" },
  { city: "Miami", state: "FL", zip: "33128" },
  // West Coast
  { city: "Los Angeles", state: "CA", zip: "90012" },
  { city: "San Francisco", state: "CA", zip: "94102" },
  { city: "San Diego", state: "CA", zip: "92101" },
  { city: "Seattle", state: "WA", zip: "98104" },
  { city: "Portland", state: "OR", zip: "97204" },
  // Mountain West
  { city: "Denver", state: "CO", zip: "80202" },
  { city: "Phoenix", state: "AZ", zip: "85003" },
  { city: "Las Vegas", state: "NV", zip: "89101" },
  { city: "Salt Lake City", state: "UT", zip: "84111" },
];

type WeatherResponse = {
  name: string;
  main: { temp: number; humidity: number };
  wind: { speed: number };
  weather: { description: string }[];
};

function normalizeQueryToZip(input: ZipOrCity): string | null {
  const trimmed = (input || "").trim();
  if (!trimmed) return null;
  // If numeric 5-digit zip
  if (/^\d{5}$/.test(trimmed)) return trimmed;
  // Try to match city name (case-insensitive, allow commas, extra state)
  const lower = trimmed.toLowerCase();
  const match = CITY_ZIPS.find((cz) =>
    lower.includes(cz.city.toLowerCase()) || lower === `${cz.city.toLowerCase()}, ${cz.state.toLowerCase()}`,
  );
  return match ? match.zip : null;
}

export function Dashboard() {
  const [query, setQuery] = useState<string>("");
  const [selectedZip, setSelectedZip] = useState<string>("");
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<{
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    locationName?: string;
  } | null>(null);

  const apiKey = "48e8ceadbb56fddefd43aeb63fbdd56c"; // Provided API key

  const handleSearch = useCallback(async () => {
    const zip = normalizeQueryToZip(query);
    if (!zip) {
      setWeatherError("Enter a valid US zip or listed city");
      return;
    }
    setSelectedZip(zip);
    setWeatherLoading(true);
    setWeatherError(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(
        zip,
      )},US&appid=${apiKey}&units=imperial`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Weather fetch failed (${res.status})`);
      }
      const json: WeatherResponse = await res.json();
      const parsed = {
        temperature: json.main.temp,
        humidity: json.main.humidity,
        windSpeed: json.wind.speed,
        condition: json.weather?.[0]?.description
          ? json.weather[0].description.replace(/\b\w/g, (c) => c.toUpperCase())
          : "—",
        locationName: `${json.name} ${zip ? `(${zip})` : ""}`.trim(),
      };
      setWeatherData(parsed);
    } catch (err: any) {
      setWeatherError(err?.message ?? "Failed to fetch weather");
      setWeatherData(null);
    } finally {
      setWeatherLoading(false);
    }
  }, [apiKey, query]);

  const onEnterKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch],
  );

  const popularOptions = useMemo(() => CITY_ZIPS.map((c) => `${c.city}, ${c.state} (${c.zip})`), []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Location Search */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">Check Weather by Zip or City</span>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. 10001 or New York City"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onEnterKey}
          />
          <Button onClick={handleSearch} disabled={!query.trim() || weatherLoading} className="gap-2">
            {weatherLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Search
          </Button>
        </div>
        {!!popularOptions.length && (
          <div className="text-xs text-muted-foreground mt-2">
            Try: {popularOptions.slice(0, 5).join(" · ")}
          </div>
        )}
        {selectedZip && (
          <div className="mt-3 text-sm">Showing weather for ZIP {selectedZip}</div>
        )}
      </Card>
      {/* Alert Banner */}
      <AlertBanner
        title="⚠️ Unhealthy Air Expected Tomorrow"
        message="Air quality is forecasted to reach unhealthy levels tomorrow afternoon in Delhi. Sensitive groups should limit outdoor activities."
        severity="warning"
      />

      {/* AQI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AQICard
          title="PM2.5"
          value={12.5}
          unit="μg/m³"
          icon={Droplet}
          level="good"
          description="Fine particulate matter (PM2.5) are tiny particles in the air that reduce visibility and can affect your lungs and heart health."
          trend="down"
        />
        <AQICard
          title="PM10"
          value={28}
          unit="μg/m³"
          icon={CloudRain}
          level="good"
          description="PM10 are inhalable particles with diameters of 10 micrometers or smaller. They can cause respiratory issues when inhaled."
          trend="stable"
        />
        <AQICard
          title="Ozone (O₃)"
          value={45}
          unit="ppb"
          icon={Zap}
          level="good"
          description="Ground-level ozone is created by chemical reactions between nitrogen oxides and volatile organic compounds in sunlight. It can trigger respiratory problems."
          trend="up"
        />
        <AQICard
          title="NO₂"
          value={18}
          unit="ppb"
          icon={Wind}
          level="good"
          description="Nitrogen dioxide (NO₂) is a gas produced by burning fuel. High concentrations can irritate airways in the respiratory system."
          trend="stable"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <AQIMap />
        </div>

        {/* Weather Card */}
        <div>
          <WeatherCard data={weatherData ?? undefined} loading={weatherLoading} error={weatherError} />
        </div>
      </div>

      {/* Forecast Chart - Full Width */}
      <ForecastChart />

      {/* Info Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
        <h3 className="mb-2">💡 Quick Tips for Today</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Air quality is currently <span className="text-green-600 font-semibold">Good</span> - Perfect for outdoor activities!</li>
          <li>• Morning (6-10 AM) is the best time for exercise with lowest pollution levels</li>
          <li>• Keep windows open to improve indoor air circulation</li>
          <li>• Check back tomorrow afternoon when AQI may rise to moderate levels</li>
        </ul>
      </div>
    </div>
  );
}
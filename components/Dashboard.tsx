import { useMemo, useState } from "react";
import { Wind, Droplet, Zap, CloudRain, MapPin, Search } from "lucide-react";
import { AQICard } from "./AQICard";
import { AQIMap } from "./AQIMap";
import { ForecastChart } from "./ForecastChart";
import { WeatherCard } from "./WeatherCard";
import { AlertBanner } from "./AlertBanner";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Provided zip codes (normalized to USPS 5-digit format) and city labels
const ZIP_SHORTLIST: { label: string; zip: string }[] = [
  { label: "New York, NY", zip: "10001" },
  { label: "Boston, MA", zip: "02108" },
  { label: "Philadelphia, PA", zip: "19102" },
  { label: "Washington, DC", zip: "20001" },
  { label: "Chicago, IL", zip: "60601" },
  { label: "Detroit, MI", zip: "48226" },
  { label: "Minneapolis, MN", zip: "55401" },
  { label: "Kansas City, MO", zip: "64106" },
  { label: "Houston, TX", zip: "77002" },
  { label: "Dallas, TX", zip: "75201" },
  { label: "Atlanta, GA", zip: "30303" },
  { label: "New Orleans, LA", zip: "70112" },
  { label: "Miami, FL", zip: "33128" },
  { label: "Los Angeles, CA", zip: "90012" },
  { label: "San Francisco, CA", zip: "94102" },
  { label: "San Diego, CA", zip: "92101" },
  { label: "Seattle, WA", zip: "98104" },
  { label: "Portland, OR", zip: "97204" },
  { label: "Denver, CO", zip: "80202" },
  { label: "Phoenix, AZ", zip: "85003" },
  { label: "Las Vegas, NV", zip: "89101" },
  { label: "Salt Lake City, UT", zip: "84111" },
];

export function Dashboard() {
  const [zipInput, setZipInput] = useState<string>(ZIP_SHORTLIST[0].zip);
  const [activeZip, setActiveZip] = useState<string>(ZIP_SHORTLIST[0].zip);
  const weatherApiKey = useMemo(() => "48e8ceadbb56fddefd43aeb63fbdd56c", []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
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

      {/* Location Picker */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-end gap-3">
          <div className="flex-1">
            <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" /> Enter ZIP Code
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., 10001"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value.replace(/[^0-9]/g, "").slice(0, 5))}
              />
              <Button onClick={() => zipInput && setActiveZip(zipInput)} className="gap-2">
                <Search className="w-4 h-4" /> Search
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {ZIP_SHORTLIST.map((item) => (
            <Button
              key={item.zip}
              variant={activeZip === item.zip ? "secondary" : "outline"}
              size="sm"
              onClick={() => {
                setZipInput(item.zip);
                setActiveZip(item.zip);
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">Showing weather for: <span className="font-medium">{activeZip}</span></p>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <AQIMap />
        </div>

        {/* Weather Card */}
        <div>
          <WeatherCard zipCode={activeZip} apiKey={weatherApiKey} />
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
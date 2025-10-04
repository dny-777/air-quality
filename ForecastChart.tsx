import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from "recharts";
import { TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Mock forecast data
const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  aqi: 45 + Math.sin(i / 3) * 20 + Math.random() * 10,
  pm25: 12 + Math.sin(i / 3) * 8 + Math.random() * 5,
  ozone: 35 + Math.cos(i / 4) * 15 + Math.random() * 8,
}));

const dailyData = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  aqi: 50 + Math.sin(i / 2) * 25 + Math.random() * 15,
  pm25: 15 + Math.sin(i / 2) * 10 + Math.random() * 5,
  ozone: 40 + Math.cos(i / 2) * 20 + Math.random() * 10,
}));

export function ForecastChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Air Quality Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="24h" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
            <TabsTrigger value="24h">24 Hours</TabsTrigger>
            <TabsTrigger value="48h">48 Hours</TabsTrigger>
            <TabsTrigger value="7d">7 Days</TabsTrigger>
          </TabsList>

          <TabsContent value="24h" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="aqi"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorAqi)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground text-center">
              Next 24-hour AQI forecast for your location
            </p>
          </TabsContent>

          <TabsContent value="48h" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData.concat(hourlyData).slice(0, 48)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pm25"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="PM2.5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="ozone"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Ozone"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground text-center">
              48-hour pollutant forecast (PM2.5 & Ozone)
            </p>
          </TabsContent>

          <TabsContent value="7d" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="colorWeek" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="aqi"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorWeek)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground text-center">
              7-day AQI outlook for your area
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
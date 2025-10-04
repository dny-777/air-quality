import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { TrendingUp, Database } from "lucide-react";
import { useState } from "react";

// Mock historical data
const generateHistoricalData = (days: number) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      tempo: 45 + Math.sin(i / 5) * 20 + Math.random() * 15,
      ground: 42 + Math.sin(i / 5) * 18 + Math.random() * 12,
      pandora: 48 + Math.sin(i / 5) * 22 + Math.random() * 10,
    };
  });
};

export function HistoricalTrends() {
  const [timeRange, setTimeRange] = useState("30");
  const [location, setLocation] = useState("newyork");

  const data = generateHistoricalData(parseInt(timeRange));

  const locations = [
    { value: "newyork", label: "New York, NY" },
    { value: "losangeles", label: "Los Angeles, CA" },
    { value: "chicago", label: "Chicago, IL" },
    { value: "houston", label: "Houston, TX" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="mb-2">Historical Trends & Data Comparison</h1>
        <p className="text-muted-foreground">
          Compare air quality data from NASA TEMPO satellite, ground stations, and Pandora network
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc.value} value={loc.value}>
                {loc.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            AQI Trends - Data Source Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="aqi" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
              <TabsTrigger value="aqi">AQI</TabsTrigger>
              <TabsTrigger value="pm25">PM2.5</TabsTrigger>
              <TabsTrigger value="ozone">Ozone</TabsTrigger>
            </TabsList>

            <TabsContent value="aqi" className="space-y-4">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} label={{ value: "AQI", angle: -90, position: "insideLeft" }} />
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
                    dataKey="tempo"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="TEMPO Satellite"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="ground"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Ground Stations"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="pandora"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Pandora Network"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="pm25" className="space-y-4">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.map(d => ({...d, tempo: d.tempo * 0.3, ground: d.ground * 0.3, pandora: d.pandora * 0.3}))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} label={{ value: "μg/m³", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="tempo" stroke="#3b82f6" strokeWidth={2} name="TEMPO Satellite" dot={false} />
                  <Line type="monotone" dataKey="ground" stroke="#10b981" strokeWidth={2} name="Ground Stations" dot={false} />
                  <Line type="monotone" dataKey="pandora" stroke="#f59e0b" strokeWidth={2} name="Pandora Network" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="ozone" className="space-y-4">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.map(d => ({...d, tempo: d.tempo * 0.8, ground: d.ground * 0.8, pandora: d.pandora * 0.8}))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} label={{ value: "ppb", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="tempo" stroke="#3b82f6" strokeWidth={2} name="TEMPO Satellite" dot={false} />
                  <Line type="monotone" dataKey="ground" stroke="#10b981" strokeWidth={2} name="Ground Stations" dot={false} />
                  <Line type="monotone" dataKey="pandora" stroke="#f59e0b" strokeWidth={2} name="Pandora Network" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Data Sources Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              TEMPO Satellite
              <Badge variant="secondary" className="bg-blue-100 text-blue-600">Satellite</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              NASA's geostationary satellite providing hourly measurements of air quality across North America.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Database className="w-4 h-4 text-blue-600" />
              <span>Hourly updates</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              Ground Stations
              <Badge variant="secondary" className="bg-green-100 text-green-600">Ground</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              EPA and local monitoring stations providing direct measurements of air pollutants at ground level.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Database className="w-4 h-4 text-green-600" />
              <span>Real-time data</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              Pandora Network
              <Badge variant="secondary" className="bg-orange-100 text-orange-600">Ground-based</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Global network of spectrometers measuring atmospheric column composition with high precision.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Database className="w-4 h-4 text-orange-600" />
              <span>15-minute intervals</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
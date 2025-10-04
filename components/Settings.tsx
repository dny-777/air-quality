import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Bell, MapPin, User, Shield } from "lucide-react";
import { Separator } from "./ui/separator";
import { useState } from "react";

export function Settings() {
  const [notifications, setNotifications] = useState({
    daily: true,
    threshold: true,
    forecast: false,
  });

  const [healthProfile, setHealthProfile] = useState("general");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      <div>
        <h1 className="mb-2">Settings & Preferences</h1>
        <p className="text-muted-foreground">
          Customize your experience and notification preferences
        </p>
      </div>

      {/* Location Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location
          </CardTitle>
          <CardDescription>Set your default location for air quality monitoring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Current Location</Label>
            <Select defaultValue="newyork">
              <SelectTrigger id="location">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newyork">New York, NY</SelectItem>
                <SelectItem value="losangeles">Los Angeles, CA</SelectItem>
                <SelectItem value="chicago">Chicago, IL</SelectItem>
                <SelectItem value="houston">Houston, TX</SelectItem>
                <SelectItem value="phoenix">Phoenix, AZ</SelectItem>
                <SelectItem value="miami">Miami, FL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-location">Use automatic location detection</Label>
            <Switch id="auto-location" />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose when and how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="daily-alerts">Daily air quality summary</Label>
              <p className="text-sm text-muted-foreground">Receive a morning summary every day</p>
            </div>
            <Switch
              id="daily-alerts"
              checked={notifications.daily}
              onCheckedChange={(checked) => setNotifications({ ...notifications, daily: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="threshold-alerts">Threshold alerts</Label>
              <p className="text-sm text-muted-foreground">Alert when AQI exceeds unhealthy levels</p>
            </div>
            <Switch
              id="threshold-alerts"
              checked={notifications.threshold}
              onCheckedChange={(checked) => setNotifications({ ...notifications, threshold: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="forecast-alerts">72-hour forecast alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified of upcoming poor air quality</p>
            </div>
            <Switch
              id="forecast-alerts"
              checked={notifications.forecast}
              onCheckedChange={(checked) => setNotifications({ ...notifications, forecast: checked })}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="alert-time">Preferred alert time</Label>
            <Input id="alert-time" type="time" defaultValue="08:00" />
          </div>
        </CardContent>
      </Card>

      {/* Health Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Health Profile
          </CardTitle>
          <CardDescription>Customize recommendations based on your health needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="health-profile">Select your health profile</Label>
            <Select value={healthProfile} onValueChange={setHealthProfile}>
              <SelectTrigger id="health-profile">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Population</SelectItem>
                <SelectItem value="children">Children (0-12 years)</SelectItem>
                <SelectItem value="elderly">Elderly (65+ years)</SelectItem>
                <SelectItem value="asthma">Asthma Patients</SelectItem>
                <SelectItem value="heart">Heart Disease</SelectItem>
                <SelectItem value="respiratory">Respiratory Conditions</SelectItem>
                <SelectItem value="pregnant">Pregnant Women</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {healthProfile !== "general" && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                {healthProfile === "children" && "Recommendations tailored for children with lower thresholds for outdoor activity alerts."}
                {healthProfile === "elderly" && "Enhanced monitoring for elderly individuals who may be more sensitive to air pollution."}
                {healthProfile === "asthma" && "Special alerts for ozone and PM2.5 levels that may trigger asthma symptoms."}
                {healthProfile === "heart" && "Monitoring for pollutants that may affect cardiovascular health."}
                {healthProfile === "respiratory" && "Focused alerts for pollutants affecting respiratory system."}
                {healthProfile === "pregnant" && "Extra precautions for expectant mothers and developing babies."}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="activity-alerts">Activity-based alerts</Label>
              <p className="text-sm text-muted-foreground">Get suggestions for safe outdoor activities</p>
            </div>
            <Switch id="activity-alerts" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Data
          </CardTitle>
          <CardDescription>Manage your data and privacy preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="usage-data">Share anonymous usage data</Label>
              <p className="text-sm text-muted-foreground">Help improve CleanSkies by sharing usage data</p>
            </div>
            <Switch id="usage-data" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="location-history">Save location history</Label>
              <p className="text-sm text-muted-foreground">Keep track of locations you've checked</p>
            </div>
            <Switch id="location-history" />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
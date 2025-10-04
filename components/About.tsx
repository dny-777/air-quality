import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Satellite, Database, Sparkles, ExternalLink, Users } from "lucide-react";
import { Button } from "./ui/button";

export function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mb-4">
          <Satellite className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          About CleanSkies
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Empowering communities with real-time air quality insights powered by cutting-edge satellite technology and AI
        </p>
      </div>

      {/* Mission */}
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            CleanSkies aims to make air quality data accessible, understandable, and actionable for everyone. By combining NASA's groundbreaking TEMPO satellite observations with AI-powered forecasting, we provide communities with the information they need to protect their health and make informed decisions about outdoor activities.
          </p>
          <p>
            Air pollution affects billions of people worldwide, contributing to respiratory diseases, cardiovascular problems, and other health issues. Our platform democratizes access to sophisticated air quality monitoring and forecasting, helping individuals and communities take proactive steps to reduce exposure to harmful pollutants.
          </p>
        </CardContent>
      </Card>

      {/* TEMPO Mission */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Satellite className="w-5 h-5" />
            NASA's TEMPO Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            TEMPO (Tropospheric Emissions: Monitoring of Pollution) is NASA's first Earth Venture Instrument mission. Launched in 2023, TEMPO is revolutionizing how we monitor air quality from space.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="mb-2">Geostationary Orbit</h4>
              <p className="text-sm text-muted-foreground">
                TEMPO orbits at 22,236 miles above Earth, maintaining a fixed position over North America for continuous monitoring.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="mb-2">Hourly Measurements</h4>
              <p className="text-sm text-muted-foreground">
                Unlike previous satellites that passed over once a day, TEMPO provides measurements every hour during daylight.
              </p>
            </div>
            <div className="p-4 bg-cyan-50 rounded-lg">
              <h4 className="mb-2">High Resolution</h4>
              <p className="text-sm text-muted-foreground">
                Spatial resolution down to 2x4.5 km enables unprecedented detail in tracking pollution at neighborhood scales.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="mb-2">Multiple Pollutants</h4>
              <p className="text-sm text-muted-foreground">
                Measures ozone, nitrogen dioxide, sulfur dioxide, formaldehyde, and aerosols simultaneously.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Sources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            CleanSkies integrates multiple authoritative data sources to provide the most accurate and comprehensive air quality information:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <h4 className="mb-1">NASA TEMPO Satellite</h4>
                <p className="text-sm text-muted-foreground">
                  Real-time satellite observations of atmospheric composition and air quality over North America
                </p>
                <Button variant="link" className="h-auto p-0 text-sm" asChild>
                  <a href="https://tempo.si.edu/" target="_blank" rel="noopener noreferrer">
                    Learn more <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <h4 className="mb-1">OpenAQ Platform</h4>
                <p className="text-sm text-muted-foreground">
                  Global network of ground-based air quality monitoring stations providing real-time measurements
                </p>
                <Button variant="link" className="h-auto p-0 text-sm" asChild>
                  <a href="https://openaq.org/" target="_blank" rel="noopener noreferrer">
                    Learn more <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <h4 className="mb-1">Pandora Network</h4>
                <p className="text-sm text-muted-foreground">
                  Ground-based spectrometer network measuring atmospheric column composition with high precision
                </p>
                <Button variant="link" className="h-auto p-0 text-sm" asChild>
                  <a href="https://pandora.gsfc.nasa.gov/" target="_blank" rel="noopener noreferrer">
                    Learn more <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <h4 className="mb-1">Weather Data APIs</h4>
                <p className="text-sm text-muted-foreground">
                  Current weather conditions and forecasts to correlate with air quality patterns
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Technology */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI-Powered Forecasting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Our advanced machine learning models analyze patterns in satellite data, weather conditions, and historical trends to provide accurate 24-72 hour air quality forecasts. The AI chatbot makes this information accessible through natural language conversations, answering questions like "Is it safe to exercise tomorrow?" or "What's the best time for outdoor activities this week?"
          </p>
        </CardContent>
      </Card>

      {/* Team & Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Get Involved
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            CleanSkies is committed to open science and community engagement. We believe everyone deserves access to clean air and the information needed to protect their health.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Contact Us</Button>
            <Button variant="outline">Contribute Data</Button>
            <Button variant="outline">Partner With Us</Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground pt-8 border-t">
        <p>
          CleanSkies is a demonstration project showcasing the potential of NASA TEMPO data for public health applications.
        </p>
        <p className="mt-2">
          Data sources: NASA TEMPO, OpenAQ, Pandora Network | Built with care for communities worldwide
        </p>
      </div>
    </div>
  );
}
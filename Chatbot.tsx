import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your CleanSkies AI assistant. Ask me anything about air quality, forecasts, or health recommendations. For example: 'Is it safe to jog tomorrow in New York?'",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sample responses based on keywords
  const generateResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    
    if (lower.includes("jog") || lower.includes("exercise") || lower.includes("run")) {
      return "Based on current forecasts, the AQI tomorrow morning is expected to be around 45 (Good). This is safe for outdoor activities like jogging! However, sensitive individuals should consider exercising during cooler hours. I recommend checking the forecast again in the morning for any updates.";
    }
    
    if (lower.includes("tomorrow") || lower.includes("forecast")) {
      return "Tomorrow's forecast shows moderate air quality with an AQI of 65. PM2.5 levels will peak around 2 PM. I'd recommend outdoor activities in the morning when air quality is better. Would you like alerts for specific times?";
    }
    
    if (lower.includes("children") || lower.includes("kids") || lower.includes("school")) {
      return "For children, I recommend outdoor activities when AQI is below 50 (Good). Current conditions are moderate (AQI 58), so brief outdoor play is okay, but extended activities should be limited. Schools in your area may reduce outdoor recess if levels exceed 100.";
    }
    
    if (lower.includes("asthma") || lower.includes("health") || lower.includes("sensitive")) {
      return "People with asthma should be cautious when AQI exceeds 100. Currently, conditions are moderate. I recommend keeping rescue inhalers accessible and monitoring symptoms. Would you like me to send you alerts when air quality reaches unhealthy levels?";
    }
    
    if (lower.includes("pm2.5") || lower.includes("pollutant")) {
      return "PM2.5 refers to fine particulate matter smaller than 2.5 micrometers. These particles can penetrate deep into lungs and cause respiratory issues. Current PM2.5 level is 12 μg/m³ (Good). Safe levels are below 15 μg/m³.";
    }
    
    if (lower.includes("tempo") || lower.includes("satellite") || lower.includes("nasa")) {
      return "NASA's TEMPO (Tropospheric Emissions: Monitoring of Pollution) satellite provides hourly air quality measurements across North America. It measures pollutants like ozone, NO₂, and aerosols from geostationary orbit, giving us unprecedented real-time data for accurate forecasts.";
    }

    if (lower.includes("where") || lower.includes("location")) {
      return "I'm currently showing data for New York City. You can change your location in Settings to get personalized air quality information for your area. Would you like help with that?";
    }

    if (lower.includes("alert") || lower.includes("notification")) {
      return "I can send you alerts when air quality changes! You can customize notifications in Settings for different health profiles (children, elderly, asthma patients). Would you like me to guide you through setup?";
    }
    
    return "I can help you understand air quality forecasts, health recommendations, and TEMPO satellite data. Try asking about tomorrow's forecast, exercise safety, or specific pollutants like PM2.5 and ozone!";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isOpen) {
    return (
      <Button
        size="lg"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] shadow-2xl z-50 flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            CleanSkies AI
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`flex-1 rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="text-xs opacity-60 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about air quality..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon" disabled={!input.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
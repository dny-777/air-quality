import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Badge } from "./ui/badge";

interface AQICardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  level: "good" | "moderate" | "unhealthy" | "hazardous";
  description: string;
  trend?: "up" | "down" | "stable";
}

const levelConfig = {
  good: {
    color: "bg-green-500",
    gradient: "from-green-400 to-green-600",
    textColor: "text-green-600",
    bgColor: "bg-green-50",
    label: "Good",
  },
  moderate: {
    color: "bg-yellow-500",
    gradient: "from-yellow-400 to-yellow-600",
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    label: "Moderate",
  },
  unhealthy: {
    color: "bg-orange-500",
    gradient: "from-orange-400 to-orange-600",
    textColor: "text-orange-600",
    bgColor: "bg-orange-50",
    label: "Unhealthy",
  },
  hazardous: {
    color: "bg-red-500",
    gradient: "from-red-400 to-red-600",
    textColor: "text-red-600",
    bgColor: "bg-red-50",
    label: "Hazardous",
  },
};

export function AQICard({ title, value, unit, icon: Icon, level, description, trend }: AQICardProps) {
  const config = levelConfig[level];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${config.gradient}`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            {title}
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold">{value}</span>
          <span className="text-muted-foreground mb-1">{unit}</span>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={`${config.bgColor} ${config.textColor} border-0`}>
            {config.label}
          </Badge>
          {trend && (
            <span className="text-xs text-muted-foreground">
              {trend === "up" && "↑ Rising"}
              {trend === "down" && "↓ Falling"}
              {trend === "stable" && "→ Stable"}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
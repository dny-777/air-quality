import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface AlertBannerProps {
  title: string;
  message: string;
  severity: "warning" | "error" | "info";
}

export function AlertBanner({ title, message, severity }: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const severityStyles = {
    warning: "border-orange-500 bg-orange-50 text-orange-900",
    error: "border-red-500 bg-red-50 text-red-900",
    info: "border-blue-500 bg-blue-50 text-blue-900",
  };

  return (
    <Alert className={`${severityStyles[severity]} relative`}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  );
}
import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";

const alertVariants = {
  default: {
    container: "bg-muted border-border text-foreground",
    icon: Info,
    iconColor: "text-muted-foreground"
  },
  success: {
    container: "bg-success/10 border-success/30 text-success-foreground",
    icon: CheckCircle2,
    iconColor: "text-success"
  },
  warning: {
    container: "bg-warning/10 border-warning/30 text-warning-foreground",
    icon: AlertCircle,
    iconColor: "text-warning"
  },
  error: {
    container: "bg-destructive/10 border-destructive/30 text-destructive-foreground",
    icon: XCircle,
    iconColor: "text-destructive"
  },
  info: {
    container: "bg-info/10 border-info/30 text-info-foreground",
    icon: Info,
    iconColor: "text-info"
  }
};

function Alert({ 
  variant = "default", 
  className, 
  children,
  icon: CustomIcon,
  ...props 
}) {
  const variantConfig = alertVariants[variant] || alertVariants.default;
  const IconComponent = CustomIcon || variantConfig.icon;

  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4 flex items-start gap-3",
        variantConfig.container,
        className
      )}
      {...props}
    >
      {IconComponent && (
        <IconComponent 
          className={cn("h-5 w-5 flex-shrink-0 mt-0.5", variantConfig.iconColor)} 
        />
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}

function AlertTitle({ className, ...props }) {
  return (
    <h5
      className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }) {
  return (
    <div
      className={cn("text-sm opacity-90 leading-relaxed", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };

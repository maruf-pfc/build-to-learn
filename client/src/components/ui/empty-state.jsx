import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const EmptyState = React.forwardRef(
  (
    {
      className,
      icon: Icon,
      title,
      description,
      action,
      secondaryAction,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center py-12 px-6",
          className
        )}
        {...props}
      >
        {Icon && (
          <div className="mb-4 p-3 rounded-full bg-muted/50">
            <Icon className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        {title && (
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            {description}
          </p>
        )}
        {(action || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-3">
            {action && (
              <Button onClick={action.onClick} size="lg">
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                onClick={secondaryAction.onClick}
                variant="outline"
                size="lg"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";

export { EmptyState };

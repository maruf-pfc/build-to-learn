import * as React from "react";
import { cn } from "@/lib/utils";

const Container = React.forwardRef(
  ({ className, size = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-3xl",
      default: "max-w-7xl",
      lg: "max-w-[1400px]",
      full: "max-w-full",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export { Container };

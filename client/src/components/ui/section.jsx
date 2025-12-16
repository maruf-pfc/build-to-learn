import * as React from "react";
import { cn } from "@/lib/utils";

const Section = React.forwardRef(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-background",
      muted: "bg-muted/30",
      primary: "bg-primary text-primary-foreground",
      accent: "bg-accent text-accent-foreground",
    };

    return (
      <section
        ref={ref}
        className={cn(
          "py-12 md:py-16 lg:py-20",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = "Section";

export { Section };

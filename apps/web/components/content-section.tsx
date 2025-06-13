import type { ReactNode } from "react";

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function ContentSection({
  children,
  className = "",
  containerClassName = "",
}: ContentSectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

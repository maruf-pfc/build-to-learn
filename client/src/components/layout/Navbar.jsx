"use client";

import Link from "next/link";
import { BookOpen, Layout } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  const isActive = (path) => pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg tracking-tight"
        >
          <BookOpen className="h-5 w-5 text-primary" />
          <span>Build 2 Learn</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "/courses", label: "Courses" },
            { href: "/forum", label: "Forum" },
            { href: "/blog", label: "Blog" },
            { href: "/news", label: "News" },
            { href: "/cv-generator", label: "CV Builder", highlight: true },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors flex items-center gap-1",
                isActive(item.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {item.highlight && (
                <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm animate-pulse">
                  NEW
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Auth actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <Button asChild size="sm">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

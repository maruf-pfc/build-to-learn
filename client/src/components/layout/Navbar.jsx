"use client";

import Link from "next/link";
import { BookOpen, Layout, Menu, X, LogIn, UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path) => pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/courses", label: "Courses" },
    { href: "/forum", label: "Forum" },
    { href: "/blog", label: "Blog" },
    { href: "/news", label: "News" },
    { href: "/cv-generator", label: "CV Builder" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity"
          >
            <div className="p-2 bg-primary rounded-lg text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </div>
            <span>
              Build<span className="text-primary">2</span>Learn
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                  isActive(item.href)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
                {item.label === "CV Builder" && (
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none shadow-sm">
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
            {user ? (
              <Button asChild size="sm" className="shadow-xs">
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

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg animate-in slide-in-from-top-5">
          <Container className="py-4 space-y-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 rounded-md text-sm font-medium transition-colors flex items-center justify-between",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-foreground/80"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.label === "CV Builder" && (
                      <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none">
                        NEW
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="pt-2 border-t border-border flex flex-col gap-3">
               <div className="flex justify-end mb-2">
                  <ModeToggle />
               </div>
              {user ? (
                <Button asChild className="w-full justify-center">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <Layout className="h-4 w-4" />
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full justify-center">
                    <Link href="/login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" /> Log in
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-center">
                    <Link href="/register" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" /> Sign up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

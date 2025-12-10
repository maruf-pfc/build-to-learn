"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Home,
  Compass,
  BookOpen,
  LifeBuoy,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <main className="relative min-h-[100vh] px-6 py-16 grid place-items-center bg-white text-[var(--color-text)]">
      {/* Soft gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(79,70,229,0.08), transparent 50%), radial-gradient(circle at 80% 80%, rgba(5,150,105,0.08), transparent 50%)",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(circle,white,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-4 py-1.5 text-xs tracking-wide shadow-sm text-gray-600">
          <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
          404 — Page Not Found
        </span>

        {/* Header */}
        <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600">
            Oops,
          </span>{" "}
          <span className="text-indigo-700">we couldn’t find that page.</span>
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          The page you're looking for may have been moved or deleted. Try
          searching or use one of the quick links below.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-white font-medium shadow-md hover:opacity-90 transition bg-indigo-600"
          >
            <Home size={18} />
            Go Home
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 border border-gray-300 bg-white/80 backdrop-blur font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={onSearch}
          className="mt-8 flex items-center gap-3 rounded-xl border border-gray-300 bg-white/90 shadow-sm backdrop-blur px-4 py-3"
        >
          <Search size={20} className="text-gray-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses, topics, or pages..."
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition"
          >
            Search
          </button>
        </form>

        {/* Helpful Links */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Explore Courses", href: "/courses", icon: BookOpen },
            { title: "Discover", href: "/about", icon: Compass },
            { title: "Support", href: "/faq", icon: LifeBuoy },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group rounded-xl border border-gray-200 bg-white/80 backdrop-blur p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon
                    size={20}
                    className="text-gray-600 group-hover:text-indigo-600 transition"
                  />
                  <span className="font-medium text-gray-700 group-hover:text-indigo-700 transition">
                    {item.title}
                  </span>
                </div>
                <span className="text-gray-400 group-hover:text-gray-600 transition">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

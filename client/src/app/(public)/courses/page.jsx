"use client";

import { Suspense, useEffect, useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Search, Filter, X, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";

function CoursesContent() {
  const { courses, fetchCourses, isLoading } = useCourseStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "All",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.search]);

  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (filters.category && filters.category !== "All")
      params.category = filters.category;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;

    fetchCourses(params);

    const newSearchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => newSearchParams.set(key, params[key]));
    router.replace(`/courses?${newSearchParams.toString()}`, { scroll: false });
  }, [
    debouncedSearch,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    fetchCourses,
    router,
  ]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "All",
      minPrice: "",
      maxPrice: "",
    });
    fetchCourses({});
    router.replace("/courses");
  };

  const hasActiveFilters = filters.search || filters.category !== "All" || filters.minPrice || filters.maxPrice;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-background border-b border-border">
        <Container className="py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Explore Courses
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover courses across various domains and start your learning journey today
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        {/* Filters Section */}
        <Card className="mb-8 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Filters</h2>
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-auto">
                  {[filters.search, filters.category !== "All" && filters.category, filters.minPrice, filters.maxPrice].filter(Boolean).length} active
                </Badge>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-9"
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <select
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Backend Engineering">Backend Engineering</option>
                  <option value="UI / UX Design">UI / UX Design</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="Databases">Databases</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Career Skills">Career Skills</option>
                  <option value="Programming Basics">Programming Basics</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                  disabled={!hasActiveFilters}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" text="Loading courses..." />
          </div>
        ) : courses.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses found"
            description="Try adjusting your filters or search terms to find what you're looking for."
            action={{
              label: "Clear Filters",
              onClick: clearFilters,
            }}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{courses.length}</span> course{courses.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course._id}
                  interactive
                  className="overflow-hidden flex flex-col h-full"
                >
                  {/* Thumbnail */}
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    {course.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge className="backdrop-blur-md bg-white/90 dark:bg-black/50 shadow-md">
                        {course.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-border">
                      <div className="flex items-center text-muted-foreground">
                        <User size={16} className="mr-2" />
                        <span className="truncate">{course.instructor?.name || "Instructor"}</span>
                      </div>
                      <div className="font-bold text-primary text-lg">
                        {course.price > 0 ? `$${course.price}` : "Free"}
                      </div>
                    </div>
                  </CardContent>

                  {/* Footer */}
                  <CardFooter className="p-6 pt-0">
                    <Link
                      href={`/courses/${course._id}`}
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "w-full"
                      )}
                    >
                      View Course
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading page..." />
        </div>
      }
    >
      <CoursesContent />
    </Suspense>
  );
}

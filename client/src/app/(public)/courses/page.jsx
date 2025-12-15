"use client";

import { Suspense, useEffect, useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

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

  return (
    <div className="min-h-screen bg-muted/20 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Explore Courses
          </h1>
        </div>

        {/* Filters Section */}
        <Card>
          <CardContent className="p-6 grid gap-6 md:grid-cols-4">
            <div className="col-span-4 md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-9"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
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

            <div className="col-span-4 md:col-span-1 flex justify-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full md:w-auto"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="p-20 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-lg">
            <p className="text-xl text-muted-foreground">
              No courses found matching your criteria.
            </p>
            <Button variant="link" onClick={clearFilters} className="mt-2">
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course._id}
                className="overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200 group border-border"
              >
                <div className="h-48 bg-muted relative overflow-hidden">
                  {course.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-400">
                      No Thumbnail
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="backdrop-blur-md bg-white/90 dark:bg-black/50"
                    >
                      {course.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-sm mt-auto">
                    <div className="flex items-center text-muted-foreground">
                      <User size={16} className="mr-2" />
                      {course.instructor?.name || "Instructor"}
                    </div>
                    <div className="font-bold text-primary">
                      {course.price > 0 ? `$${course.price}` : "Free"}
                    </div>
                  </div>
                </CardContent>

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
        )}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground">
          Loading page...
        </div>
      }
    >
      <CoursesContent />
    </Suspense>
  );
}

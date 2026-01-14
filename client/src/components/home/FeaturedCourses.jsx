"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCourseStore } from "@/store/useCourseStore";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";
import { BookOpen, User, ArrowRight } from "lucide-react";

export default function FeaturedCourses() {
  const { courses, fetchCourses, isLoading } = useCourseStore();
  // Local state to handle "client-side only" mounting if needed, 
  // but useCourseStore + useEffect is standard for client components.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch courses if not already loaded, or force refresh for home page
    fetchCourses({ limit: 6 }); 
  }, [fetchCourses]);

  if (!mounted) return null;

  // Take first 6 courses if API doesn't support limit param yet
  const displayedCourses = courses.slice(0, 6);

  return (
    <Section>
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Featured Courses
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our highest-rated and most popular courses selected for you
            </p>
          </div>
          <Link
            href="/courses"
            className={cn(buttonVariants({ variant: "outline" }), "group")}
          >
            View All Courses
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner size="lg" text="Loading top courses..." />
          </div>
        ) : displayedCourses.length === 0 ? (
          <div className="py-20 text-center border rounded-lg bg-muted/20">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No courses available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map((course) => (
              <Card
                key={course._id}
                interactive
                className="overflow-hidden flex flex-col h-full group border-border/50 hover:border-primary/50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                  {course.thumbnail ? (
                     // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center text-muted-foreground">
                      <User size={16} className="mr-2" />
                      <span className="truncate max-w-[120px]">
                        {course.instructor?.name || "Instructor"}
                      </span>
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
                      "w-full bg-primary/90 hover:bg-primary"
                    )}
                  >
                    View Course
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

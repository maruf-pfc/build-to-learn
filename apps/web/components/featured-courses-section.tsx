import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, ArrowRight } from "lucide-react";

const featuredCourses = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description:
      "Master React from the ground up by building real-world applications with modern hooks and patterns.",
    instructor: "Sarah Johnson",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    rating: 4.9,
    students: 2847,
    duration: "8 weeks",
    level: "Beginner",
    price: "Free",
  },
  {
    id: "fullstack-nextjs",
    title: "Full-Stack Next.js",
    description:
      "Build complete web applications with Next.js, including authentication, databases, and deployment.",
    instructor: "Mike Chen",
    thumbnail:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8w1hhq2um83lqlc5f0pp.jpg",
    rating: 4.8,
    students: 1923,
    duration: "12 weeks",
    level: "Intermediate",
    price: "Free",
  },
  {
    id: "javascript-mastery",
    title: "JavaScript Mastery",
    description:
      "Deep dive into modern JavaScript, ES6+, async programming, and advanced concepts through projects.",
    instructor: "Alex Rodriguez",
    thumbnail: "https://i.ytimg.com/vi/i5TAC9OkK-A/maxresdefault.jpg",
    rating: 4.9,
    students: 3421,
    duration: "10 weeks",
    level: "Intermediate",
    price: "Free",
  },
  {
    id: "node-backend",
    title: "Node.js Backend Development",
    description:
      "Create robust APIs and backend services with Node.js, Express, and modern database technologies.",
    instructor: "Emma Wilson",
    thumbnail:
      "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220517005132/Why-to-Use-NodeJS-for-Backend-Development.jpg",
    rating: 4.7,
    students: 1654,
    duration: "14 weeks",
    level: "Intermediate",
    price: "Free",
  },
];

export function FeaturedCoursesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your learning journey with our most popular project-based
            courses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredCourses.map((course) => (
            <Card
              key={course.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0"
            >
              <CardContent className="p-0">
                {/* Thumbnail */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant={
                        course.price === "Free" ? "secondary" : "default"
                      }
                    >
                      {course.price}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-white/90">
                      {course.level}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">
                    by {course.instructor}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <Button asChild className="w-full group/btn">
                    <Link
                      href={`/courses/${course.id}`}
                      className="flex items-center justify-center"
                    >
                      View Course
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/courses" className="flex items-center">
              View All Courses
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

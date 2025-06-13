"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Users, Clock, Search, Filter } from "lucide-react";

const allCourses = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description:
      "Master React from the ground up by building real-world applications with modern hooks and patterns.",
    instructor: "Sarah Johnson",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.9,
    students: 2847,
    duration: "8 weeks",
    level: "Beginner",
    category: "Frontend",
    price: "Free",
  },
  {
    id: "fullstack-nextjs",
    title: "Full-Stack Next.js",
    description:
      "Build complete web applications with Next.js, including authentication, databases, and deployment.",
    instructor: "Mike Chen",
    thumbnail: "https://i.ytimg.com/vi/vUYopHWOURg/sddefault.jpg",
    rating: 4.8,
    students: 1923,
    duration: "12 weeks",
    level: "Intermediate",
    category: "Full-Stack",
    price: "Free",
  },
  {
    id: "javascript-mastery",
    title: "JavaScript Mastery",
    description:
      "Deep dive into modern JavaScript, ES6+, async programming, and advanced concepts through projects.",
    instructor: "Alex Rodriguez",
    thumbnail:
      "https://codingstella.com/wp-content/uploads/2024/01/Frontend-43.png",
    rating: 4.9,
    students: 3421,
    duration: "10 weeks",
    level: "Intermediate",
    category: "Frontend",
    price: "Free",
  },
  {
    id: "node-backend",
    title: "Node.js Backend Development",
    description:
      "Create robust APIs and backend services with Node.js, Express, and modern database technologies.",
    instructor: "Emma Wilson",
    thumbnail:
      "https://existek3-838c.kxcdn.com/wp-content/uploads/2020/07/001-1-768x401-1.webp",
    rating: 4.7,
    students: 1654,
    duration: "14 weeks",
    level: "Intermediate",
    category: "Backend",
    price: "Free",
  },
  {
    id: "html-css-basics",
    title: "HTML & CSS Fundamentals",
    description:
      "Learn the building blocks of web development with hands-on projects and modern CSS techniques.",
    instructor: "Lisa Park",
    thumbnail: "https://img-c.udemycdn.com/course/750x422/365886_45be_3.jpg",
    rating: 4.8,
    students: 4521,
    duration: "6 weeks",
    level: "Beginner",
    category: "Frontend",
    price: "Free",
  },
  {
    id: "python-web-dev",
    title: "Python Web Development",
    description:
      "Build web applications with Python, Django, and modern development practices.",
    instructor: "Carlos Martinez",
    thumbnail:
      "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220826185259/Why-to-Use-Python-for-Web-Development.jpg",
    rating: 4.6,
    students: 1876,
    duration: "16 weeks",
    level: "Intermediate",
    category: "Backend",
    price: "Free",
  },
];

export function CourseCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const filteredCourses = allCourses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        course.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesLevel =
        selectedLevel === "all" ||
        course.level.toLowerCase() === selectedLevel.toLowerCase();

      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.students - a.students;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return 0; // Would sort by date in real implementation
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900">
          Explore Our Courses
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose from our collection of project-based courses designed to help
          you master real-world skills
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="full-stack">Full-Stack</SelectItem>
            </SelectContent>
          </Select>

          {/* Level Filter */}
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-600">
          Showing {filteredCourses.length} of {allCourses.length} courses
        </p>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0"
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
                    variant={course.price === "Free" ? "secondary" : "default"}
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
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                  </div>
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

                <Button asChild className="w-full">
                  <Link href={`/courses/${course.id}`}>View Course</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {filteredCourses.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Courses
          </Button>
        </div>
      )}

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-2">
            No courses found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search criteria or browse all courses
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedLevel("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

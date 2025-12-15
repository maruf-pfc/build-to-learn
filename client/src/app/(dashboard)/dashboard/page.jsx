"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import {
  BookOpen,
  Users,
  BarChart,
  Medal,
  MessageSquare,
  Plus,
  LogOut,
  Layout,
  Award,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [instructorStats, setInstructorStats] = useState(null);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      if (user?.role === "admin") {
        api
          .get("/admin/stats")
          .then((res) => setStats(res.data))
          .catch((err) => console.error(err));
      } else if (user?.role === "instructor") {
        api
          .get("/courses/instructor/stats")
          .then((res) => setInstructorStats(res.data))
          .catch((err) => console.error(err));
      } else if (user?.role === "student") {
        // Fetch certificates
        api
          .get("/certificates/my")
          .then((res) => setCertificates(res.data))
          .catch((err) => console.error(err));
      }
    }
  }, [isAuthenticated, router, user]);

  if (!isAuthenticated && !user) return null;
  if (!user)
    return (
      <div className="p-8 text-muted-foreground">Loading Dashboard...</div>
    );

  return (
    <div className="p-8 bg-muted/20 min-h-screen">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">
          Welcome Back, {user.name}!
        </h2>
        <p className="text-muted-foreground mt-2">
          Here is what is happening with your learning journey.
        </p>
      </header>

      {/* ADMIN VIEW */}
      {user.role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-muted-foreground text-sm font-medium mb-1">
                Total Users
              </div>
              <div className="text-3xl font-bold text-foreground">
                {stats?.totalUsers || "..."}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-muted-foreground text-sm font-medium mb-1">
                Total Courses
              </div>
              <div className="text-3xl font-bold text-foreground">
                {stats?.totalCourses || "..."}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* INSTRUCTOR VIEW */}
      {user.role === "instructor" && (
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full text-blue-600 dark:text-blue-400">
                  <BookOpen size={24} />
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">
                    My Courses
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {instructorStats?.courses?.length || 0}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full text-green-600 dark:text-green-400">
                  <Users size={24} />
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">
                    Total Students
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {instructorStats?.totalStudents || 0}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-full text-yellow-600 dark:text-yellow-400">
                  <DollarSign size={24} />
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Earnings</div>
                  <div className="text-2xl font-bold text-foreground">
                    ৳{instructorStats?.totalEarnings || 0}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary rounded-2xl p-8 text-primary-foreground flex items-center justify-between shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Create a New Course</h3>
              <p className="text-primary-foreground/80">
                Share your knowledge with the world.
              </p>
            </div>
            <Link href="/instructor/create-course" className="relative z-10">
              <Button variant="secondary" size="lg" className="font-bold">
                Create Course
              </Button>
            </Link>
            {/* Decor */}
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
              <BookOpen size={200} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              My Courses
            </h3>
            {instructorStats?.courses?.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructorStats.courses.map((course) => (
                  <Card
                    key={course._id}
                    className="hover:shadow-md transition card-hover"
                  >
                    <CardContent className="p-6">
                      <h4 className="font-bold text-lg mb-2 truncate text-foreground">
                        {course.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {course.enrolledCount} students
                      </p>
                      <div className="flex gap-4 mt-2">
                        <Link
                          href={`/courses/${course._id}`}
                          className="text-primary text-sm font-bold hover:underline"
                        >
                          View
                        </Link>
                        <Link
                          href={`/instructor/edit-course/${course._id}`}
                          className="text-green-600 dark:text-green-400 text-sm font-bold hover:underline"
                        >
                          Edit
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center text-muted-foreground">
                  You haven't created any courses yet.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* STUDENT VIEW */}
      {user.role === "student" && (
        <div className="space-y-8">
          {/* Enrollments */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen size={24} className="text-primary" /> My Enrollments
            </h3>

            {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.enrolledCourses.map((enrollment) => {
                  const course = enrollment.course;
                  if (!course) return null;

                  const courseId = course._id || course; 
                  const courseTitle = course.title || "Untitled Course";

                  return (
                    <Link href={`/learning/${courseId}`} key={enrollment._id}>
                      <Card className="hover:shadow-md transition group h-full">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition">
                            {courseTitle}
                          </h4>
                          <div className="w-full bg-muted rounded-full h-2 mb-4">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${enrollment.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {enrollment.progress}% Complete
                            </span>
                            <span className="text-primary font-semibold">
                              Continue Learning
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="p-12 text-center">
                  <BookOpen
                    size={48}
                    className="mx-auto text-muted-foreground/50 mb-4"
                  />
                  <h4 className="text-lg font-bold text-foreground">
                    No active enrollments
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Explore our catalog and start learning today.
                  </p>
                  <Link href="/courses">
                    <Button>Browse Courses</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Certificates */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Award
                size={24}
                className="text-yellow-600 dark:text-yellow-400"
              />{" "}
              My Certificates
            </h3>
            {certificates.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <Card
                    key={cert.certificateId}
                    className="hover:shadow-md transition card-hover border-l-4 border-l-yellow-500"
                  >
                    <CardContent className="p-6">
                      <h4 className="font-bold text-lg mb-1 truncate text-foreground">
                        {cert.courseTitle}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Issued: {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold uppercase tracking-wider">
                          Verified
                        </span>
                        <Link href={`/certificate/${cert.certificateId}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Medal size={14} /> View
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 flex items-center justify-center h-32 text-muted-foreground">
                  Complete a course to earn certificates!
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

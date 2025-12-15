"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useCourseStore } from "@/store/useCourseStore";
import {
  Lock,
  Unlock,
  PlayCircle,
  FileText,
  CheckCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const { enrollCourse } = useCourseStore();
  const router = useRouter();

  // Helper to check if enrolled
  const isEnrolled = user?.enrolledCourses?.some(
    (e) =>
      (typeof e.course === "string" && e.course === id) ||
      e.course?._id === id ||
      e.course?.toString() === id ||
      e.course?._id?.toString() === id
  );

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load course", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetails();
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) return router.push("/login");

    setEnrollLoading(true);
    try {
      await enrollCourse(id);
      await checkAuth();
      alert("Enrolled successfully!");
      router.refresh();
      router.push("/dashboard");
    } catch (err) {
      alert(err);
    } finally {
      setEnrollLoading(false);
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-muted-foreground">Loading...</div>
    );
  if (!course)
    return (
      <div className="p-8 text-center text-muted-foreground">
        Course not found
      </div>
    );

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Hero Section */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <Badge className="mb-4">{course.category}</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
            {course.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
            {course.description}
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {course.instructor?.name?.[0] || <User size={20} />}
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Instructor
                </div>
                <div className="font-medium text-foreground">
                  {course.instructor?.name}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {isEnrolled ? (
              <Link href={`/learning/${course._id}`}>
                <Button
                  size="lg"
                  className="text-lg px-8 bg-green-600 hover:bg-green-700"
                >
                  Continue Learning
                </Button>
              </Link>
            ) : (
              <Button
                onClick={handleEnroll}
                disabled={enrollLoading}
                size="lg"
                className="text-lg px-8"
              >
                {enrollLoading ? "Processing..." : "Enroll Now"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold mb-6 text-foreground tracking-tight">
          Course Content
        </h2>

        {course.modules && course.modules.length > 0 ? (
          <div className="space-y-4">
            {course.modules.map((module) => (
              <Card
                key={module._id}
                className="overflow-hidden border-border transition-all hover:shadow-md"
              >
                <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">
                    {module.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {module.subModules?.length || 0} items
                  </span>
                </div>

                <div className="divide-y divide-border">
                  {module.subModules?.map((sub, idx) => (
                    <div
                      key={idx}
                      className="px-6 py-3 flex items-center gap-3 text-sm hover:bg-muted/30 transition-colors"
                    >
                      {sub.type === "video" && (
                        <PlayCircle size={16} className="text-blue-500" />
                      )}
                      {(sub.type === "documentation" ||
                        sub.type === "text") && (
                        <FileText size={16} className="text-muted-foreground" />
                      )}
                      {sub.type === "mcq" && (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                      {sub.type === "project" && (
                        <CheckCircle size={16} className="text-purple-500" />
                      )}
                      <span className="text-foreground">{sub.title}</span>

                      {!isEnrolled && module.order > 1 ? (
                        <Lock
                          size={14}
                          className="ml-auto text-muted-foreground opacity-50"
                        />
                      ) : (
                        <Unlock
                          size={14}
                          className="ml-auto text-green-500 opacity-0"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl shadow-sm p-8 text-center text-muted-foreground border border-dashed border-border">
            No modules available yet.
          </div>
        )}
      </div>
    </div>
  );
}

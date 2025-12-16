"use client";

import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import {
  CheckCircle,
  PlayCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  Menu,
  Lock,
  Code,
  Award,
  Layers,
  CheckSquare,
} from "lucide-react";
import { toast } from "sonner";
import MCQPlayer from "@/components/course/MCQPlayer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function LearningPage() {
  const { courseId } = useParams();
  const router = useRouter();

  // Data State
  const [course, setCourse] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [loading, setLoading] = useState(true);

  // View State
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [repoUrl, setRepoUrl] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  // Derived State
  const activeModule = course?.modules?.[activeModuleIndex];
  const activeLesson = activeModule?.subModules?.[activeLessonIndex];

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, userRes] = await Promise.all([
          api.get(`/courses/${courseId}`),
          api.get("/auth/me"),
        ]);

        setCourse(courseRes.data);

        if (userRes.data.enrolledCourses) {
          const enrollment = userRes.data.enrolledCourses.find(
            (e) => e.course === courseId || e.course?._id === courseId
          );
          if (enrollment) {
            setCompletedModules(enrollment.completedModules || []);

            const mods = courseRes.data.modules || [];
            const completed = enrollment.completedModules || [];

            let targetModIndex = 0;
            for (let i = 0; i < mods.length; i++) {
              if (!completed.includes(mods[i]._id)) {
                targetModIndex = i;
                break;
              }
            }

            if (completed.length === mods.length && mods.length > 0)
              targetModIndex = 0;

            setActiveModuleIndex(targetModIndex);
            setActiveLessonIndex(0);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  // Helpers
  const isModuleLocked = (index) => {
    if (index === 0) return false;
    const prevModuleId = course.modules[index - 1]._id;
    return !completedModules.includes(prevModuleId);
  };

  const handleLessonSelect = (modIndex, lessonIndex) => {
    if (isModuleLocked(modIndex)) {
      toast.error("Complete previous modules to unlock this!");
      return;
    }
    setActiveModuleIndex(modIndex);
    setActiveLessonIndex(lessonIndex);
    setRepoUrl("");
  };

  // Navigation Handlers
  const goToNext = async () => {
    if (!activeModule) return;

    if (activeLessonIndex < activeModule.subModules.length - 1) {
      setActiveLessonIndex((prev) => prev + 1);
      return;
    }

    const isModComplete = completedModules.includes(activeModule._id);

    if (!isModComplete) {
      try {
        await api.post(
          `/courses/${courseId}/modules/${activeModule._id}/complete`,
          {
            moduleId: activeModule._id,
          }
        );

        setCompletedModules((prev) => [...prev, activeModule._id]);
        toast.success("Module Completed! Next module unlocked.");

        if (activeModuleIndex < course.modules.length - 1) {
          setActiveModuleIndex((prev) => prev + 1);
          setActiveLessonIndex(0);
        }
      } catch (err) {
        toast.error("Failed to complete module");
      }
    } else {
      if (activeModuleIndex < course.modules.length - 1) {
        setActiveModuleIndex((prev) => prev + 1);
        setActiveLessonIndex(0);
      }
    }
  };

  const goToPrev = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex((prev) => prev - 1);
    } else if (activeModuleIndex > 0) {
      setActiveModuleIndex((prev) => prev - 1);
      const prevMod = course.modules[activeModuleIndex - 1];
      setActiveLessonIndex(prevMod.subModules.length - 1);
    }
  };

  // Project Submission
  const submitProject = async () => {
    if ({}.toString) return toast.error("Please enter URL");
    if (!repoUrl) return toast.error("Please enter a GitHub URL");
    try {
      await api.post(
        `/courses/${courseId}/modules/${activeModule._id}/submit-project`,
        { repoUrl }
      );
      toast.success("Project submitted successfully!");
      goToNext();
    } catch (err) {
      toast.error("Submission failed");
    }
  };

  // Certificate
  const claimCertificate = async () => {
    try {
      const res = await api.post("/certificates/generate", { courseId });
      toast.success("Certificate Generated!");
      router.push(`/certificate/${res.data.certificateId}`);
    } catch (err) {
      toast.error("Failed to generate certificate");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-muted-foreground">
        Loading Classroom...
      </div>
    );
  if (!course)
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Course not found
      </div>
    );

  const isLastModule = activeModuleIndex === course.modules.length - 1;
  const isLastLesson =
    activeModule && activeLessonIndex === activeModule.subModules.length - 1;
  const allModulesCompleted = course.modules.every((m) =>
    completedModules.includes(m._id)
  );

  return (
    <div className="flex h-full bg-background/0 overflow-hidden font-sans">
      <div
        className={`flex-1 flex flex-col transition-all duration-300 relative ${
          showSidebar ? "lg:mr-80" : "mr-0"
        }`}
      >
        {/* Header */}
        <header className="h-16 border-b border-border bg-white flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
            >
              <ChevronLeft size={18} /> Dashboard
            </Button>
            <h1 className="font-bold text-lg hidden md:block truncate max-w-md">
              {course.title}
            </h1>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? <ChevronRight size={18} /> : <Menu size={18} />}
            <span className="ml-2 hidden sm:inline">
              {showSidebar ? "Hide" : "Show"} Curriculum
            </span>
          </Button>
        </header>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 bg-gray-50/50">
          <div className="max-w-5xl mx-auto p-6 md:p-10 pb-32">
            {activeLesson ? (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {activeLesson.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wider">
                    <Badge variant="outline" className="bg-white">
                      {activeModule.title}
                    </Badge>
                    <span>•</span>
                    <span>
                      Lesson {activeLessonIndex + 1} of{" "}
                      {activeModule.subModules.length}
                    </span>
                  </div>
                </div>

                {/* Content Player */}
                <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden min-h-[400px]">
                  {activeLesson.type === "video" && (
                    <div className="aspect-video bg-black">
                      <ReactPlayer
                        url={activeLesson.url}
                        width="100%"
                        height="100%"
                        controls
                        onEnded={goToNext}
                      />
                    </div>
                  )}

                  {activeLesson.type === "text" && (
                    <div className="p-8 prose max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {activeLesson.content}
                      </ReactMarkdown>
                    </div>
                  )}

                  {activeLesson.type === "project" && (
                    <div className="p-8">
                      <div className="prose mb-8">
                        <h3>Project Instructions</h3>
                        <ReactMarkdown>{activeLesson.content}</ReactMarkdown>
                      </div>
                      <Card className="bg-gray-50 border-dashed">
                        <CardContent className="pt-6">
                          <h4 className="font-bold flex items-center gap-2 mb-4">
                            <Code /> Submit Project
                          </h4>
                          <div className="flex gap-2">
                            <Input
                              placeholder="GitHub Repository URL"
                              value={repoUrl}
                              onChange={(e) => setRepoUrl(e.target.value)}
                              className="bg-white"
                            />
                            <Button onClick={submitProject}>Submit</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {activeLesson.type === "mcq" && (
                    <div className="p-4">
                      <MCQPlayer
                        courseId={courseId}
                        moduleId={activeModule._id}
                        lesson={activeLesson}
                        onComplete={goToNext}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                Select a lesson to begin.
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Bottom Navigation Bar */}
        <div className="h-20 border-t border-border bg-white absolute bottom-0 left-0 right-0 px-6 flex items-center justify-between shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
          <Button
            variant="ghost"
            onClick={goToPrev}
            disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
            className="gap-2"
          >
            <ChevronLeft size={20} /> Previous
          </Button>

          <div className="flex items-center gap-4">
            {allModulesCompleted && (
              <Button
                onClick={claimCertificate}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold animate-pulse"
              >
                <Award size={18} className="mr-2" /> Claim Certificate
              </Button>
            )}

            <Button
              onClick={goToNext}
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90 text-white"
            >
              {isLastLesson && !completedModules.includes(activeModule?._id) ? (
                <>
                  Complete Module <CheckCircle size={18} />
                </>
              ) : (
                <>
                  Next Lesson <ChevronRight size={18} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* RIGHT: Sidebar (Modules) */}
      <aside
        className={`fixed right-0 top-0 bottom-0 w-80 bg-white border-l border-border flex flex-col transition-transform duration-300 z-20 ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        } shadow-2xl lg:shadow-none`}
      >
        <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-gray-50">
          <h3 className="font-bold flex items-center gap-2 uppercase text-sm tracking-wider">
            <Layers size={16} /> Course Content
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSidebar(false)}
            className="lg:hidden"
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {course.modules?.map((module, mIndex) => {
              const isLocked = isModuleLocked(mIndex);
              const isCompleted = completedModules.includes(module._id);
              const isActive = activeModuleIndex === mIndex;

              return (
                <div
                  key={module._id}
                  className={cn(
                    "rounded-lg border transition-all",
                    isActive
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border",
                    isLocked ? "opacity-50 grayscale" : ""
                  )}
                >
                  <div
                    className={cn(
                      "p-3 flex items-center justify-between font-medium text-sm",
                      isActive ? "text-primary" : "text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-current opacity-40" />
                      )}
                      <span>Module {mIndex + 1}</span>
                    </div>
                    {isLocked && <Lock size={14} />}
                  </div>

                  {!isLocked && (
                    <div className="border-t border-border/50">
                      {module.subModules?.map((lesson, lIndex) => (
                        <button
                          key={lIndex}
                          onClick={() => handleLessonSelect(mIndex, lIndex)}
                          className={cn(
                            "w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-muted/50 transition-colors",
                            activeModuleIndex === mIndex &&
                              activeLessonIndex === lIndex
                              ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                              : "text-muted-foreground border-l-2 border-transparent"
                          )}
                        >
                          {lesson.type === "video" ? (
                            <PlayCircle size={14} />
                          ) : lesson.type === "mcq" ? (
                            <CheckSquare size={14} />
                          ) : (
                            <FileText size={14} />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Progress Footer */}
        <div className="p-4 border-t border-border bg-muted/10">
          <div className="flex justify-between text-xs mb-2 font-medium text-muted-foreground">
            <span>Progress</span>
            <span>
              {Math.round(
                (completedModules.length / course.modules.length) * 100
              )}
              %
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500 will-change-transform"
              style={{
                width: `${
                  (completedModules.length / course.modules.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

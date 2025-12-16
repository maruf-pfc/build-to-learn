"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import {
  Plus,
  Trash,
  ChevronRight,
  Video,
  FileText,
  HelpCircle,
  Edit2,
  GripVertical,
  Trash2,
  Code,
  Settings,
  Save,
  ArrowLeft,
  Layout,
} from "lucide-react";
import MarkdownEditor from "@/components/ui/MarkdownEditor";
import QuestionEditor from "@/components/instructor/QuestionEditor";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function EditCoursePage() {
  const router = useRouter();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Data
  const [courseData, setCourseData] = useState(null);
  const [modules, setModules] = useState([]);

  // UI State
  const [activeTab, setActiveTab] = useState("editor"); // 'editor', 'settings'
  const [selectedLesson, setSelectedLesson] = useState(null); // { moduleId, lesson }
  const [lessonForm, setLessonForm] = useState(null); // Local edit state

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const res = await api.get(`/courses/${courseId}`);
      setCourseData(res.data);
      setModules(res.data.modules || []);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load course");
      setLoading(false);
    }
  };

  // --- Modals State ---
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const [targetModuleId, setTargetModuleId] = useState(null);
  const [editingModuleId, setEditingModuleId] = useState(null);

  // --- Module Actions ---

  const openModuleModal = () => {
    setTempTitle("");
    setEditingModuleId(null);
    setIsModuleModalOpen(true);
  };

  const openEditModuleModal = (module) => {
    setTempTitle(module.title);
    setEditingModuleId(module._id);
    setIsModuleModalOpen(true);
  };

  const handleAddOrEditModule = async (e) => {
    e.preventDefault();
    if (!tempTitle.trim()) return;

    try {
      if (editingModuleId) {
        // Edit existing
        const res = await api.put(
          `/courses/${courseId}/modules/${editingModuleId}`,
          {
            title: tempTitle,
          }
        );
        setModules(
          modules.map((m) =>
            m._id === editingModuleId ? { ...m, title: res.data.title } : m
          )
        );
        toast.success("Module updated");
      } else {
        // Create new
        const res = await api.post(`/courses/${courseId}/modules`, {
          title: tempTitle,
          order: modules.length,
        });
        setModules([...modules, { ...res.data, subModules: [] }]);
        toast.success("Module added");
      }
      setIsModuleModalOpen(false);
    } catch (err) {
      toast.error(
        editingModuleId ? "Failed to update module" : "Failed to add module"
      );
    }
  };

  const deleteModule = async (moduleId) => {
    if (!confirm("Delete this module and all its lessons?")) return;
    try {
      await api.delete(`/courses/${courseId}/modules/${moduleId}`);
      setModules(modules.filter((m) => m._id !== moduleId));
      if (selectedLesson?.moduleId === moduleId) {
        setSelectedLesson(null);
        setLessonForm(null);
      }
      toast.success("Module deleted");
    } catch (err) {
      toast.error("Failed to delete module");
    }
  };

  // --- Lesson Actions ---

  const openLessonModal = (moduleId) => {
    setTargetModuleId(moduleId);
    setTempTitle("");
    setIsLessonModalOpen(true);
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!tempTitle.trim() || !targetModuleId) return;

    // Default new lesson
    const newLesson = {
      title: tempTitle,
      type: "video",
      content: "",
      url: "",
      questions: [],
    };

    try {
      const res = await api.post(
        `/courses/${courseId}/modules/${targetModuleId}/lessons`,
        newLesson
      );
      const updatedModule = res.data;

      setModules(
        modules.map((m) => (m._id === targetModuleId ? updatedModule : m))
      );

      // Auto-select the new lesson
      if (updatedModule.subModules && updatedModule.subModules.length > 0) {
        const lastLesson =
          updatedModule.subModules[updatedModule.subModules.length - 1];
        selectLesson(targetModuleId, lastLesson);
      }
      toast.success("Lesson created");
      setIsLessonModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create lesson");
    }
  };

  const deleteLesson = async (moduleId, lessonId, e) => {
    e.stopPropagation();
    if (!confirm("Delete this lesson?")) return;
    try {
      const res = await api.delete(
        `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`
      );
      setModules(modules.map((m) => (m._id === moduleId ? res.data : m)));
      if (selectedLesson?.lesson._id === lessonId) {
        setSelectedLesson(null);
        setLessonForm(null);
      }
      toast.success("Lesson deleted");
    } catch (err) {
      toast.error("Failed to delete lesson");
    }
  };

  const selectLesson = (moduleId, lesson) => {
    setSelectedLesson({ moduleId, lesson });
    setLessonForm({
      ...lesson,
      url: lesson.videoUrl || lesson.url || "",
    });
  };

  const saveActiveLesson = async () => {
    if (!selectedLesson || !lessonForm) return;
    setSaving(true);
    try {
      const { moduleId, lesson } = selectedLesson;
      const res = await api.put(
        `/courses/${courseId}/modules/${moduleId}/lessons/${lesson._id}`,
        lessonForm
      );

      // Update local modules state
      setModules(modules.map((m) => (m._id === moduleId ? res.data : m)));

      // Update selection reference
      const updatedModule = res.data;
      const updatedLesson = updatedModule.subModules.find(
        (l) => l._id === lesson._id
      );
      setSelectedLesson({ moduleId, lesson: updatedLesson });

      toast.success("Lesson saved");
    } catch (err) {
      toast.error("Failed to save lesson");
    } finally {
      setSaving(false);
    }
  };

  // --- Course Settings ---
  const updateCourseSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/courses/${courseId}`, courseData);
      toast.success("Course settings updated");
    } catch (err) {
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Modal
        isOpen={isModuleModalOpen}
        onClose={() => setIsModuleModalOpen(false)}
        title={editingModuleId ? "Edit Module" : "Add New Module"}
      >
        <form onSubmit={handleAddOrEditModule} className="space-y-4">
          <div>
            <Label>Module Title</Label>
            <Input
              autoFocus
              className="mt-1"
              placeholder="e.g. Introduction to React"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            {editingModuleId ? "Update Module" : "Create Module"}
          </Button>
        </form>
      </Modal>

      <Modal
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        title="Add New Lesson"
      >
        <form onSubmit={handleAddLesson} className="space-y-4">
          <div>
            <Label>Lesson Title</Label>
            <Input
              autoFocus
              className="mt-1"
              placeholder="e.g. Setting up the environment"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Create Lesson
          </Button>
        </form>
      </Modal>

      {/* Sidebar / Module List */}
      <div className="w-80 bg-card border-r flex flex-col h-full z-10">
        <div className="p-4 border-b flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft size={20} />
          </Button>
          <span className="font-bold text-card-foreground truncate px-2">
            {courseData?.title}
          </span>
          <Button
            variant={activeTab === "settings" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {activeTab === "settings" ? (
            <div className="text-center py-10">
              <Settings
                size={48}
                className="mx-auto text-muted-foreground mb-4"
              />
              <p className="text-muted-foreground">Settings Open</p>
              <Button
                variant="link"
                onClick={() => setActiveTab("editor")}
                className="mt-4"
              >
                Back to Editor
              </Button>
            </div>
          ) : (
            modules.map((module, mIdx) => (
              <div key={module._id} className="space-y-2">
                <div className="flex items-center justify-between group">
                  <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wide flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="w-6 h-6 flex items-center justify-center rounded-full p-0"
                    >
                      {mIdx + 1}
                    </Badge>
                    {module.title}
                  </h3>
                  <div className="flex items-center opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditModuleModal(module)}
                      className="h-6 w-6 text-muted-foreground hover:text-primary"
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteModule(module._id)}
                      className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>

                <div className="space-y-1 ml-2 pl-4 border-l-2 border-border">
                  {module.subModules?.map((lesson) => (
                    <button
                      key={lesson._id}
                      onClick={() => selectLesson(module._id, lesson)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-sm text-left group transition-colors ${
                        selectedLesson?.lesson._id === lesson._id
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {lesson.type === "text" && <FileText size={14} />}
                        {lesson.type === "video" && <Video size={14} />}
                        {lesson.type === "mcq" && <HelpCircle size={14} />}
                        {lesson.type === "project" && <Code size={14} />}
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <div
                        onClick={(e) => deleteLesson(module._id, lesson._id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded"
                      >
                        <Trash size={12} />
                      </div>
                    </button>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openLessonModal(module._id)}
                    className="w-full justify-start text-xs text-muted-foreground"
                  >
                    <Plus size={14} className="mr-2" /> Add Lesson
                  </Button>
                </div>
              </div>
            ))
          )}
          {activeTab !== "settings" && (
            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={openModuleModal}
            >
              + Add Section
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-background overflow-hidden">
        {activeTab === "settings" ? (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Course Settings</h2>
              <form
                onSubmit={updateCourseSettings}
                className="bg-card p-8 rounded-2xl shadow-sm border space-y-6"
              >
                <div>
                  <Label>Title</Label>
                  <Input
                    className="mt-1"
                    value={courseData?.title || ""}
                    onChange={(e) =>
                      setCourseData({ ...courseData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <textarea
                    className="w-full border p-3 rounded-lg bg-background h-32 focus:outline-none focus:ring-1 focus:ring-ring"
                    value={courseData?.description || ""}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    value={courseData?.category || ""}
                    onChange={(e) =>
                      setCourseData({ ...courseData, category: e.target.value })
                    }
                  >
                    <option value="">Select...</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Backend Engineering">
                      Backend Engineering
                    </option>
                    <option value="UI / UX Design">UI / UX Design</option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="Databases">Databases</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Career Skills">Career Skills</option>
                    <option value="Programming Basics">
                      Programming Basics
                    </option>
                  </select>
                </div>
                <div>
                  <Label>Thumbnail URL</Label>
                  <Input
                    className="mt-1"
                    value={courseData?.thumbnail || ""}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        thumbnail: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="pt-4 border-t">
                  <Button disabled={saving} className="w-full">
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : selectedLesson ? (
          <div className="flex-1 flex flex-col h-full">
            {/* Toolbar */}
            <div className="bg-card border-b px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg bg-accent text-accent-foreground`}
                >
                  {lessonForm.type === "text" && <FileText size={20} />}
                  {lessonForm.type === "video" && <Video size={20} />}
                  {lessonForm.type === "mcq" && <HelpCircle size={20} />}
                  {lessonForm.type === "project" && <Code size={20} />}
                </div>
                <Input
                  className="text-lg font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto"
                  value={lessonForm.title}
                  onChange={(e) =>
                    setLessonForm({ ...lessonForm, title: e.target.value })
                  }
                  placeholder="Lesson Title"
                />
              </div>
              <div className="flex items-center gap-3">
                <select
                  className="border rounded-md px-3 py-2 text-sm bg-background"
                  value={lessonForm.type}
                  onChange={(e) =>
                    setLessonForm({ ...lessonForm, type: e.target.value })
                  }
                >
                  <option value="text">Written / Markdown</option>
                  <option value="video">Video Lesson</option>
                  <option value="mcq">Quiz (MCQ)</option>
                  <option value="project">Project Assignment</option>
                </select>
                <Button onClick={saveActiveLesson} disabled={saving}>
                  {saving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save size={16} className="mr-2" /> Save
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Content Editor */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-4xl mx-auto">
                {lessonForm.type === "video" && (
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="pt-6">
                        <Label>Video URL</Label>
                        <Input
                          className="mt-2"
                          placeholder="YouTube embed URL..."
                          value={lessonForm.url || ""}
                          onChange={(e) =>
                            setLessonForm({
                              ...lessonForm,
                              url: e.target.value,
                            })
                          }
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Supports YouTube, Vimeo, or direct MP4 links.
                        </p>
                      </CardContent>
                    </Card>
                    {lessonForm.url && (
                      <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                        <iframe
                          src={lessonForm.url.replace("watch?v=", "embed/")}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>
                )}

                {(lessonForm.type === "text" ||
                  lessonForm.type === "project") && (
                  <div className="space-y-4">
                    {lessonForm.type === "project" && (
                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-purple-800 text-sm mb-4 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300">
                        <strong>Project Type:</strong> Students will be asked to
                        submit a GitHub repository link for this lesson. Use the
                        editor below to describe the project requirements.
                      </div>
                    )}
                    <div className="bg-card rounded-xl border min-h-[500px] flex flex-col">
                      <MarkdownEditor
                        value={lessonForm.content || ""}
                        onChange={(val) =>
                          setLessonForm({ ...lessonForm, content: val })
                        }
                      />
                    </div>
                  </div>
                )}

                {lessonForm.type === "mcq" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">Quiz Builder</h3>
                      <span className="text-sm text-muted-foreground">
                        {lessonForm.questions?.length || 0} Questions
                      </span>
                    </div>
                    <QuestionEditor
                      questions={lessonForm.questions || []}
                      onChange={(newQuestions) =>
                        setLessonForm({
                          ...lessonForm,
                          questions: newQuestions,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <Layout size={64} className="mb-4 opacity-20" />
            <p>Select a lesson from the sidebar to edit</p>
            <p className="text-sm">or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}

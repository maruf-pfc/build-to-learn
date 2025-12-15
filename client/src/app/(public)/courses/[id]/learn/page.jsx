"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MCQComponent from "@/components/MCQComponent";
import {
  CheckCircle,
  Circle,
  Lock,
  Menu,
  X,
  ChevronRight,
  FileText,
  PlayCircle,
  HelpCircle,
} from "lucide-react";

export default function CourseLearnPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState({
    modIdx: 0,
    subIdx: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [completedModules, setCompletedModules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        setCourse(data);
        setModules(data.modules);

        if (user && user.enrolledCourses) {
          const enrollment = user.enrolledCourses.find(
            (e) => e.course === id || e.course._id === id
          );
          if (enrollment) {
            setCompletedModules(enrollment.completedModules || []);
          } else {
            router.push(`/courses/${id}`);
          }
        }

        if (data.modules.length > 0 && data.modules[0].subModules.length > 0) {
          setActiveModule(data.modules[0].subModules[0]);
          setActiveModuleIndex({ modIdx: 0, subIdx: 0 });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user, router]);

  const handleModuleClick = (modIdx, subIdx, subModule) => {
    // Check if locked
    setActiveModule(subModule);
    setActiveModuleIndex({ modIdx, subIdx });
  };

  const markCompleted = async () => {
    try {
      const parentModule = modules[activeModuleIndex.modIdx];

      // Call API
      await api.post(`/courses/${id}/modules/${parentModule._id}/complete`);

      // Update local state
      setCompletedModules([...completedModules, parentModule._id]);
    } catch (err) {
      alert(err.message || "Failed to complete");
    }
  };

  // Helper to check if parent module is locked
  const isModuleLocked = (modIdx) => {
    if (modIdx === 0) return false;
    const prevModuleId = modules[modIdx - 1]._id;
    return !completedModules.includes(prevModuleId);
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white border-r w-80 transform transition-transform duration-300 z-20 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-bold text-gray-800 truncate">{course.title}</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          {modules.map((module, modIdx) => {
            const isLocked = isModuleLocked(modIdx);
            const isCompleted = completedModules.includes(module._id);

            return (
              <div key={module._id} className="border-b border-gray-100">
                <div
                  className={`p-4 bg-gray-50 flex items-center justify-between ${
                    isLocked ? "opacity-50" : ""
                  }`}
                >
                  <span className="font-semibold text-sm text-gray-700">
                    {module.title}
                  </span>
                  {isCompleted ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : isLocked ? (
                    <Lock size={16} className="text-gray-400" />
                  ) : (
                    <Circle size={16} className="text-gray-300" />
                  )}
                </div>

                {!isLocked && (
                  <div>
                    {module.subModules.map((sub, subIdx) => {
                      const isActive =
                        activeModuleIndex.modIdx === modIdx &&
                        activeModuleIndex.subIdx === subIdx;
                      return (
                        <button
                          key={sub._id}
                          onClick={() => handleModuleClick(modIdx, subIdx, sub)}
                          className={`w-full text-left p-3 pl-6 text-sm flex items-center gap-3 transition-colors ${
                            isActive
                              ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                              : "hover:bg-gray-50 text-gray-600"
                          }`}
                        >
                          {sub.type === "video" && <PlayCircle size={14} />}
                          {sub.type === "documentation" && (
                            <FileText size={14} />
                          )}
                          {sub.type === "mcq" && <HelpCircle size={14} />}
                          <span className="truncate">{sub.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="bg-white border-b p-4 flex items-center gap-4 shadow-sm z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded"
          >
            <Menu size={20} />
          </button>
          <h1 className="font-bold text-lg text-gray-800 truncate">
            {activeModule?.title}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm min-h-[500px] border p-6 md:p-8">
            {/* Content Rendering */}
            {activeModule?.type === "video" && (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <ReactPlayer
                  url={activeModule.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            )}

            {(activeModule?.type === "documentation" ||
              activeModule?.type === "summary") && (
              <div className="prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {activeModule.content}
                </ReactMarkdown>
              </div>
            )}

            {activeModule?.type === "mcq" && (
              <MCQComponent
                courseId={id}
                moduleId={modules[activeModuleIndex.modIdx]._id}
                subModule={activeModule}
                onComplete={markCompleted}
              />
            )}
          </div>

          {/* Navigation & Completion Actions */}
          <div className="max-w-4xl mx-auto mt-8 flex justify-between items-center">
            <button className="text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2">
              Previous
            </button>

            {activeModuleIndex.modIdx !== -1 &&
              activeModuleIndex.subIdx ===
                modules[activeModuleIndex.modIdx]?.subModules.length - 1 &&
              !completedModules.includes(
                modules[activeModuleIndex.modIdx]._id
              ) && (
                <button
                  onClick={markCompleted}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <CheckCircle size={20} />
                  Mark Module as Completed
                </button>
              )}

            {/* Next Button */}
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 flex items-center gap-2">
              Next Lesson <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

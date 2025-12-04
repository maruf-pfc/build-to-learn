"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X } from "lucide-react";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

export default function TaskManagerPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // === Fetch Courses ===
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/courses?instructor=${user._id}`);
        setCourses(res.data?.data || []);
      } catch {
        toast.error("Failed to load courses");
      }
    })();
  }, []);

  // === Fetch Modules ===
  useEffect(() => {
    if (!selectedCourse) return;
    (async () => {
      try {
        const res = await api.get(`/units/${selectedCourse}`);
        setModules(res.data?.data || []);
      } catch {
        toast.error("Failed to load modules");
      }
    })();
  }, [selectedCourse]);

  // === Fetch Tasks ===
  const fetchTasks = async (unitId) => {
    if (!unitId) return;
    setLoading(true);
    try {
      const res = await api.get(`/tasks/${unitId}`);
      setTasks(res.data?.data || []);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // === Delete Task ===
  const deleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks(selectedUnit);
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* ---------- Header ---------- */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Tasks</h1>
          <p className="text-gray-500 text-sm">
            Organize tasks for your course modules
          </p>
        </div>

        <button
          disabled={!selectedUnit}
          onClick={() => {
            setSelectedTask(null);
            setShowModal(true);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium shadow transition cursor-pointer 
            ${
              selectedUnit
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-300 cursor-not-allowed"
            }
          `}
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* ---------- Filters ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Course Select */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Select Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setSelectedUnit("");
              setModules([]);
              setTasks([]);
            }}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Choose a course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Module Select */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Select Module
          </label>
          <select
            value={selectedUnit}
            onChange={(e) => {
              setSelectedUnit(e.target.value);
              fetchTasks(e.target.value);
            }}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Choose a module</option>
            {modules.map((m) => (
              <option key={m._id} value={m._id}>
                {m.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---------- Task Table ---------- */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-sm text-gray-600 border-b">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-center">Max Points</th>
              <th className="py-3 px-4 text-center">Per Correct Point</th>
              <th className="py-3 px-4 text-center">Created</th>
              <th className="py-3 px-4 text-center">Due</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-8 text-center text-gray-500 italic"
                >
                  Loading tasks...
                </td>
              </tr>
            ) : tasks.length ? (
              tasks.map((t) => (
                <tr
                  key={t._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {t.title || (
                      <span className="text-gray-400 italic">Untitled</span>
                    )}
                    {t.description && (
                      <p className="text-xs text-gray-500">{t.description}</p>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${
                          t.type === "quiz"
                            ? "bg-indigo-100 text-indigo-700"
                            : t.type === "video"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }
                      `}
                    >
                      {t.type}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    {t.maxPoints ?? "—"}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {t.perCorrectPoint ?? "—"}
                  </td>

                  <td className="py-4 px-4 text-center text-gray-600 text-sm">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-4 px-4 text-center text-gray-600 text-sm">
                    {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-"}
                  </td>

                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedTask(t);
                        setShowModal(true);
                      }}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteTask(t._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-8 text-center text-gray-500 italic"
                >
                  No tasks found for this module.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- Modal ---------- */}
      <TaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        task={selectedTask}
        unitId={selectedUnit}
        refresh={() => fetchTasks(selectedUnit)}
      />
    </div>
  );
}

/* ============================================================
   Add / Edit Task Modal (UI Enhanced — Logic unchanged)
============================================================ */
function TaskModal({ open, onClose, unitId, task, refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    maxPoints: "",
    perCorrectPoint: "",
    type: "",
  });

  useEffect(() => {
    if (task) setForm(task);
    else
      setForm({
        title: "",
        description: "",
        dueDate: "",
        maxPoints: "",
        perCorrectPoint: "",
        type: "",
      });
  }, [task]);

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        description: form.description,
        dueDate: form.dueDate,
        maxPoints: parseInt(form.maxPoints || 0),
        perCorrectPoint: parseInt(form.perCorrectPoint || 0),
        type: form.type,
        unitId,
      };

      if (task?._id) await api.put(`/tasks/${task._id}`, payload);
      else await api.post("/tasks/create", payload);

      toast.success("Task saved!");
      onClose();
      refresh();
    } catch {
      toast.error("Failed to save task");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="
      bg-white 
      max-w-lg w-full 
      rounded-xl 
      p-7 
      shadow-2xl 
      border border-gray-300
      text-gray-900
    "
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {task ? "Edit Task" : "Add Task"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-gray-900">
            {/* Title */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                placeholder="Task title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                placeholder="Short description"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                Deadline
              </label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate?.split("T")[0] || ""}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          focus:ring-2 focus:ring-indigo-500 text-gray-900"
              />
            </div>

            {/* Max Points */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                Max Points
              </label>
              <input
                type="number"
                name="maxPoints"
                value={form.maxPoints}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="e.g. 100"
              />
            </div>

            {/* Type */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                Assignment Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          focus:ring-2 focus:ring-indigo-500 text-gray-900"
              >
                <option value="">Select type</option>
                <option value="quiz">Quiz</option>
                <option value="video">Video</option>
                <option value="pdf">PDF</option>
              </select>
            </div>

            {form.type === "quiz" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label className="text-sm font-semibold text-gray-800">
                  Point Per Question
                </label>
                <input
                  type="number"
                  name="perCorrectPoint"
                  value={form.perCorrectPoint}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
            focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  placeholder="e.g. 5"
                />
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg 
        font-semibold shadow transition"
            >
              Save Task
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

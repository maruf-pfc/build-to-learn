"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/apiClient";
import { useAddUnit, useUnits } from "@/hooks/useUnit";

export default function UnitManager({ courseId }) {
  const { register, handleSubmit, reset } = useForm();
  const { data: units = [], isLoading } = useUnits(courseId);
  const addUnit = useAddUnit(courseId);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      course: courseId,
      orderIndex: units.length + 1,
    };
    addUnit.mutate(payload);
    reset();
  };

  const deleteUnit = async (id) => {
    if (!confirm("Delete this module?")) return;
    try {
      await api.delete(`/units/${id}`);
      toast.success("Module deleted");
      window.location.reload();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      {/* ---------------- Header ---------------- */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Course Modules
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Add, remove, and manage course modules.
        </p>
      </div>

      {/* ---------------- Add Unit Form ---------------- */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-3 mb-10"
      >
        <input
          {...register("title", { required: true })}
          placeholder="Enter new module title"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />

        <button
          type="submit"
          disabled={addUnit.isLoading}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg shadow-md font-medium transition active:scale-[0.98] cursor-pointer"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Module</span>
        </button>
      </form>

      {/* ---------------- Units List ---------------- */}
      {isLoading ? (
        <p className="text-gray-500 text-sm">Loading units...</p>
      ) : units.length > 0 ? (
        <div className="space-y-4">
          {units.map((u, i) => (
            <motion.div
              key={u._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="flex justify-between items-center px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition"
            >
              {/* Unit Info */}
              <div>
                <p className="font-semibold text-gray-900">{u.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Order #{u.orderIndex}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteUnit(u._id)}
                className="p-2 rounded-md text-red-500 hover:bg-red-50 hover:text-red-600 transition"
                title="Delete Module"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm italic text-center py-8">
          No modules added yet. Start by creating one above.
        </p>
      )}
    </div>
  );
}

"use client";
import { useParams } from "next/navigation";
import TaskManager from "@/components/modules/dashboard/instructorr/TaskManager";

export default function UnitTaskPage() {
  const { courseId, unitId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">Instructor → Tasks</p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">
            Manage Tasks for This Unit
          </h1>
        </div>

        {/* Task Manager */}
        <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6">
          <TaskManager courseId={courseId} unitId={unitId} />
        </div>
      </div>
    </div>
  );
}

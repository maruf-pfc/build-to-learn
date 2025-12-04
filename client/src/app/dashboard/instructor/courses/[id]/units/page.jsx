"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import UnitManager from "@/components/modules/dashboard/instructorr/UnitManager";

export default function ModulesPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <p className="text-sm text-gray-500">Instructor → Course Modules</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              Manage Course Modules
            </h1>
          </div>

          <Link
            href={`/dashboard/instructor/courses/${id}/lessons`}
            className="mt-4 md:mt-0 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium transition"
          >
            Next → Lessons
          </Link>
        </div>

        {/* Unit Manager */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <UnitManager courseId={id} />
        </div>
      </div>
    </div>
  );
}

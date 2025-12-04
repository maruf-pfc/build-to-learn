"use client";
import { useParams } from "next/navigation";
import QuizManager from "@/components/modules/dashboard/instructorr/QuizManager";

export default function UnitQuizPage() {
  const { courseId, unitId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">Instructor → Quizzes</p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">
            Manage Quizzes for This Unit
          </h1>
        </div>

        {/* Quiz Manager */}
        <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6">
          <QuizManager courseId={courseId} unitId={unitId} />
        </div>
      </div>
    </div>
  );
}

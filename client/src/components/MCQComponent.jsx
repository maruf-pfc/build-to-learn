"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import api from "@/lib/api";

export default function MCQComponent({
  courseId,
  moduleId,
  subModule,
  onComplete,
}) {
  const [answers, setAnswers] = useState({});
  const [cheated, setCheated] = useState(false);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCheated(true);
      }
    };

    const handleBlur = () => {
      setCheated(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleOptionSelect = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const { data } = await api.post(
        `/courses/${courseId}/modules/${moduleId}/submit-mcq`,
        {
          answers,
          cheated,
          subModuleId: subModule._id,
        }
      );

      setResult(data);
      if (data.passed) {
        // If passed, maybe unlock next?
      }
    } catch (err) {
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div
        className={`text-center p-8 rounded-xl border-2 ${
          result.passed
            ? "border-green-100 bg-green-50"
            : "border-red-100 bg-red-50"
        }`}
      >
        {result.passed ? (
          <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
        ) : (
          <XCircle size={48} className="mx-auto text-red-600 mb-4" />
        )}

        <h3 className="text-2xl font-bold mb-2">{result.message}</h3>
        <p className="text-lg">
          Score: {result.score} / {result.totalPoints}
        </p>

        {result.cheated && (
          <div className="mt-4 flex items-center justify-center gap-2 text-red-600 font-bold">
            <AlertTriangle size={20} /> Cheating Activity Detected
          </div>
        )}

        {!result.passed && (
          <button
            onClick={() => setResult(null)}
            className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto select-none"
      onCopy={(e) => e.preventDefault()}
    >
      {cheated && (
        <div className="mb-6 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
          <AlertTriangle className="flex-shrink-0" />
          <div>
            <p class="font-bold">Warning: Tab Switch Detected!</p>
            <p class="text-sm">This attempt has been marked as suspicious.</p>
          </div>
        </div>
      )}

      {subModule.questions.map((q, idx) => (
        <div key={q._id} className="mb-8">
          <h3 className="font-semibold text-lg mb-4">
            {idx + 1}. {q.questionText}
          </h3>

          <div className="space-y-3">
            {q.options.map((option) => (
              <label
                key={option}
                className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                  answers[q._id] === option
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name={q._id}
                  value={option}
                  checked={answers[q._id] === option}
                  onChange={() => handleOptionSelect(q._id, option)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Answers"}
      </button>
    </div>
  );
}

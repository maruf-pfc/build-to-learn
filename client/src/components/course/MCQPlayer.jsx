import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function MCQPlayer({ courseId, moduleId, lesson, onComplete }) {
  // State
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [cheatingFlags, setCheatingFlags] = useState([]);

  // --- Anti-Cheat System ---
  const logCheating = useCallback(
    (type, details) => {
      if (submitted) return;
      const flag = { type, details, timestamp: new Date() };
      setCheatingFlags((prev) => [...prev, flag]);
      toast.error(
        `⚠️ Warning: ${type} detected! This incident has been recorded.`
      );
    },
    [submitted]
  );

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden)
        logCheating("TAB_SWITCH", "User switched tabs or minimized window");
    };
    const handleBlur = () => {
      logCheating("FOCUS_LOST", "User clicked outside window");
    };
    const handleCopy = (e) => {
      e.preventDefault();
      logCheating("COPY_ATTEMPT", "User tried to copy content");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("copy", handleCopy);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("copy", handleCopy);
    };
  }, [logCheating]);

  // --- Interaction Handlers ---
  const handleSingleSelect = (qId, optionText) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optionText }));
  };

  const handleMultiSelect = (qId, optionText) => {
    if (submitted) return;
    const current = answers[qId] || [];
    const newSelection = current.includes(optionText)
      ? current.filter((o) => o !== optionText)
      : [...current, optionText];
    setAnswers((prev) => ({ ...prev, [qId]: newSelection }));
  };

  const handleTextChange = (qId, text) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: text }));
  };

  const submitQuiz = async () => {
    // Validation
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < lesson.questions.length) {
      toast.error(
        `Please answer all questions (${answeredCount}/${lesson.questions.length})`
      );
      return;
    }

    try {
      const res = await api.post(
        `/courses/${courseId}/modules/${moduleId}/mcq`,
        {
          subModuleId: lesson._id,
          answers,
          cheatingFlags,
        }
      );

      setResult(res.data);
      setSubmitted(true);

      if (res.data.passed) {
        toast.success("Quiz Passed! 🎉");
        onComplete();
      } else {
        toast.error("Quiz Failed. Try again.");
      }
    } catch (err) {
      toast.error("Failed to submit quiz");
    }
  };

  const retryQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setCheatingFlags([]);
  };

  return (
    <Card className="max-w-4xl mx-auto h-full overflow-y-auto border-border shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7 border-b border-border">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold">{lesson.title}</CardTitle>
          <CardDescription>
            {lesson.questions?.length} Questions •{" "}
            {lesson.quizSettings?.timeLimit
              ? `${lesson.quizSettings.timeLimit} mins`
              : "No time limit"}
          </CardDescription>
        </div>
        {cheatingFlags.length > 0 && (
          <Badge
            variant="destructive"
            className="flex items-center gap-2 px-4 py-2 text-sm"
          >
            <AlertTriangle size={18} />
            <span>Flags: {cheatingFlags.length}</span>
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-8 pt-6">
        {/* Result View */}
        {result && (
          <div
            className={cn(
              "p-6 rounded-xl text-center border",
              result.passed
                ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400"
                : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400"
            )}
          >
            <div className="flex justify-center mb-4">
              {result.passed ? (
                <CheckCircle size={48} />
              ) : (
                <XCircle size={48} />
              )}
            </div>
            <h3 className="text-2xl font-bold mb-2">
              {result.passed ? "Excellent Work!" : "Keep Practicing"}
            </h3>
            <p className="text-lg mb-4">
              You scored <span className="font-bold">{result.score}%</span>{" "}
              (Target: {result.passingScore || 70}%)
            </p>

            {!result.passed && (
              <Button variant="destructive" onClick={retryQuiz}>
                Retry Quiz
              </Button>
            )}
          </div>
        )}

        {/* Questions List */}
        <div
          className={cn(
            "space-y-8",
            submitted && "opacity-80 pointer-events-none select-none"
          )}
        >
          {lesson.questions?.map((q, idx) => (
            <Card
              key={q._id || idx}
              className="relative border-muted shadow-sm"
            >
              <CardContent className="pt-6">
                <Badge variant="secondary" className="absolute top-4 left-4">
                  Q{idx + 1}
                </Badge>
                <div className="ml-10">
                  <h3 className="text-lg font-semibold mb-2">{q.text}</h3>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-4">
                    {q.type === "single"
                      ? "Pick one"
                      : q.type === "multiple"
                      ? "Select all that apply"
                      : "Type your answer"}{" "}
                    • {q.points} pt
                  </p>

                  <div className="space-y-3">
                    {q.type === "text" ? (
                      <Textarea
                        className="w-full resize-none"
                        rows={3}
                        placeholder="Type your answer here..."
                        value={answers[q._id] || ""}
                        onChange={(e) =>
                          handleTextChange(q._id, e.target.value)
                        }
                      />
                    ) : (
                      q.options.map((opt, oIdx) => {
                        const optText =
                          typeof opt === "string" ? opt : opt.text;
                        const isSelected =
                          q.type === "single"
                            ? answers[q._id] === optText
                            : (answers[q._id] || []).includes(optText);

                        return (
                          <div
                            key={oIdx}
                            onClick={() =>
                              q.type === "single"
                                ? handleSingleSelect(q._id, optText)
                                : handleMultiSelect(q._id, optText)
                            }
                            className={cn(
                              "p-4 border-2 rounded-xl cursor-pointer transition flex items-center gap-4 hover:bg-accent hover:text-accent-foreground",
                              isSelected
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-muted bg-card"
                            )}
                          >
                            <div
                              className={cn(
                                "w-5 h-5 rounded flex items-center justify-center border-2",
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-muted-foreground"
                              )}
                            >
                              {isSelected && (
                                <div className="w-2.5 h-2.5 rounded-sm bg-primary-foreground" />
                              )}
                            </div>
                            <span className="font-medium text-lg">
                              {optText}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      {!submitted && (
        <CardFooter className="flex justify-end pb-8">
          <Button
            size="lg"
            onClick={submitQuiz}
            className="w-full sm:w-auto px-10 shadow-lg shadow-primary/20"
          >
            Submit Final Answers
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

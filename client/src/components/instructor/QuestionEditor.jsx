"use client";

import { useState } from "react";
import {
  Plus,
  Trash,
  GripVertical,
  CheckCircle,
  Circle,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function QuestionEditor({ questions, onChange }) {
  const addQuestion = () => {
    const newQ = {
      text: "",
      type: "single",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      points: 10,
      explanation: "",
    };
    onChange([...questions, newQ]);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    onChange(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    onChange(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push({ text: "", isCorrect: false });
    onChange(newQuestions);
  };

  const updateOption = (qIndex, oIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex][field] = value;

    // If single choice, ensure only one is correct
    if (
      field === "isCorrect" &&
      value === true &&
      newQuestions[qIndex].type === "single"
    ) {
      newQuestions[qIndex].options.forEach((opt, idx) => {
        if (idx !== oIndex) opt.isCorrect = false;
      });
    }
    onChange(newQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    onChange(newQuestions);
  };

  return (
    <div className="space-y-6">
      {questions.map((q, qIdx) => (
        <Card key={qIdx} className="relative group border-border">
          <CardContent className="pt-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeQuestion(qIdx)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition"
            >
              <Trash size={18} />
            </Button>

            <div className="flex items-start gap-4 mb-4">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                Q{qIdx + 1}
              </Badge>
              <div className="flex-1">
                <Input
                  className="text-lg font-medium border-transparent shadow-none focus-visible:ring-0 px-0 h-auto placeholder:text-muted-foreground"
                  placeholder="Enter your question here..."
                  value={q.text}
                  onChange={(e) => updateQuestion(qIdx, "text", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 bg-muted/50 p-4 rounded-lg">
              <div>
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  Type
                </Label>
                <select
                  className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={q.type}
                  onChange={(e) => updateQuestion(qIdx, "type", e.target.value)}
                >
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="text">Short Answer</option>
                </select>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  Points
                </Label>
                <Input
                  type="number"
                  className="mt-1"
                  value={q.points}
                  onChange={(e) =>
                    updateQuestion(qIdx, "points", parseInt(e.target.value))
                  }
                />
              </div>
            </div>

            {q.type !== "text" ? (
              <div className="space-y-3 pl-4 border-l-2 border-border">
                {q.options.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateOption(qIdx, oIdx, "isCorrect", !opt.isCorrect)
                      }
                      className={`flex-shrink-0 transition-colors ${
                        opt.isCorrect
                          ? "text-green-500"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {q.type === "single" ? (
                        opt.isCorrect ? (
                          <CheckCircle size={20} />
                        ) : (
                          <Circle size={20} />
                        )
                      ) : (
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            opt.isCorrect
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-muted-foreground"
                          }`}
                        >
                          {opt.isCorrect && <Plus size={14} />}
                        </div>
                      )}
                    </button>
                    <Input
                      className="flex-1"
                      placeholder={`Option ${oIdx + 1}`}
                      value={opt.text}
                      onChange={(e) =>
                        updateOption(qIdx, oIdx, "text", e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOption(qIdx, oIdx)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="link"
                  onClick={() => addOption(qIdx)}
                  className="px-0 text-primary hover:text-primary/90"
                >
                  <Plus size={16} className="mr-2" /> Add Option
                </Button>
              </div>
            ) : (
              <div className="bg-muted/30 p-4 rounded-lg border border-dashed text-center text-muted-foreground text-sm">
                Students will type the answer. You can provide keywords or
                manual grading logic later.
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        onClick={addQuestion}
        className="w-full py-8 border-dashed text-muted-foreground hover:text-primary hover:border-primary"
      >
        <Plus size={20} className="mr-2" /> Add New Question
      </Button>
    </div>
  );
}

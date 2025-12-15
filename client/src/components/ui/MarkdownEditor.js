"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Eye, Edit3, Image as ImageIcon } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function MarkdownEditor({ value, onChange, label }) {
  const [view, setView] = useState("write"); // 'write' | 'preview'
  const [showImageUploader, setShowImageUploader] = useState(false);

  const handleImageUpload = (url) => {
    const imageMarkdown = `![Image](${url})`;
    onChange(value + "\n" + imageMarkdown);
    setShowImageUploader(false);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <div className="border border-input rounded-lg overflow-hidden bg-background shadow-sm">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-2 py-2 bg-muted/40 border-b border-input">
          <div className="flex gap-1">
            <Button
              type="button"
              variant={view === "write" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("write")}
              title="Write"
              className="h-8 w-8 p-0"
            >
              <Edit3 size={16} />
            </Button>
            <Button
              type="button"
              variant={view === "preview" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("preview")}
              title="Preview"
              className="h-8 w-8 p-0"
            >
              <Eye size={16} />
            </Button>
          </div>
          <div>
            <Button
              type="button"
              variant={showImageUploader ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowImageUploader(!showImageUploader)}
              className="h-8 px-2 text-xs"
            >
              <ImageIcon size={16} className="mr-2" /> Insert Image
            </Button>
          </div>
        </div>

        {/* Image Uploader Panel */}
        {showImageUploader && (
          <div className="p-4 bg-muted/20 border-b border-input">
            <ImageUpload
              label="Upload image to insert"
              value=""
              onChange={handleImageUpload}
            />
            <Button
              variant="link"
              size="sm"
              onClick={() => setShowImageUploader(false)}
              className="text-destructive h-auto p-0 mt-2"
            >
              Cancel
            </Button>
          </div>
        )}

        {/* Editor / Preview Area */}
        <div className="min-h-[300px] relative">
          {view === "write" ? (
            <Textarea
              className="w-full h-full min-h-[300px] p-4 border-0 rounded-none focus-visible:ring-0 resize-y font-mono text-sm bg-background"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Write in markdown..."
            />
          ) : (
            <div className="prose prose-blue dark:prose-invert max-w-none p-4 min-h-[300px] bg-background">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {value || "*(Nothing to preview)*"}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-right">
        Supports Markdown & GFM
      </p>
    </div>
  );
}

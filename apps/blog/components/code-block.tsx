"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
}

export function CodeBlock({ children, language = "javascript", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="relative group my-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          {filename && <span className="text-sm text-gray-300 ml-3">{filename}</span>}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 uppercase">{language}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div className="bg-gray-900 rounded-b-lg overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className={`language-${language} text-gray-100`}>{children}</code>
        </pre>
      </div>
    </div>
  )
}

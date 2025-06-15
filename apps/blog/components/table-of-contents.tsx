"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { List } from "lucide-react"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0.5,
      },
    )

    // Add IDs to headings in the content
    const contentHeadings = document.querySelectorAll(
      ".blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6",
    )
    contentHeadings.forEach((heading, index) => {
      if (!heading.id && headings[index]) {
        heading.id = headings[index].id
      }
      observer.observe(heading)
    })

    return () => {
      observer.disconnect()
    }
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({
        top: y,
        behavior: "smooth",
      })

      // Update active state immediately
      setActiveId(id)
    }
  }

  if (headings.length === 0) return null

  return (
    <Card className="border-0 shadow-lg absolute">
      <CardHeader className="pb-3 lg:pb-4">
        <CardTitle className="flex items-center text-base lg:text-lg">
          <List className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
          Table of Contents
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <nav>
          <ul className="space-y-1 lg:space-y-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`text-left w-full text-xs lg:text-sm transition-all duration-200 hover:text-blue-600 py-1 px-2 rounded ${
                    activeId === heading.id
                      ? "text-blue-600 font-semibold bg-blue-50 border-l-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  } ${heading.level === 3 ? "pl-4 lg:pl-6" : ""} ${heading.level === 4 ? "pl-6 lg:pl-10" : ""}`}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  )
}

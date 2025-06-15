import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkHtml from "remark-html"
import remarkGfm from "remark-gfm"

export interface BlogPost {
  slug: string
  title: string
  description: string
  keywords: string[]
  image: string
  author: string
  date: string
  readTime: string
  content: string
  headings: Array<{ id: string; text: string; level: number }>
  category: string
  authorDetails: {
    name: string
    bio: string
    avatar: string
    role: string
    social: {
      twitter?: string
      linkedin?: string
      github?: string
      website?: string
    }
  }
}

const contentDirectory = path.join(process.cwd(), "src/content")

// Categories mapping with icons
const categoryMapping: Record<string, { name: string; icon: string }> = {
  "web development": { name: "Web Development", icon: "Globe" },
  react: { name: "React", icon: "Atom" },
  javascript: { name: "JavaScript", icon: "Code" },
  frontend: { name: "Frontend", icon: "Monitor" },
  backend: { name: "Backend", icon: "Server" },
  css: { name: "CSS", icon: "Palette" },
  html: { name: "HTML", icon: "FileText" },
  nodejs: { name: "Node.js", icon: "Zap" },
  programming: { name: "Programming", icon: "Terminal" },
  tutorial: { name: "Tutorials", icon: "BookOpen" },
  "beginner guide": { name: "Beginner Guides", icon: "GraduationCap" },
  "best practices": { name: "Best Practices", icon: "CheckCircle" },
  async: { name: "Async Programming", icon: "Clock" },
  promises: { name: "Promises", icon: "GitBranch" },
  performance: { name: "Performance", icon: "Gauge" },
  hooks: { name: "React Hooks", icon: "Link" },
  components: { name: "Components", icon: "Package" },
}

// Author data
const authors = {
  "sarah-johnson": {
    name: "Sarah Johnson",
    bio: "Senior Full-Stack Developer with 8+ years of experience. Passionate about teaching modern web development and helping developers grow their careers.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    role: "Senior Developer & Instructor",
    social: {
      twitter: "https://twitter.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      github: "https://github.com/sarahjohnson",
      website: "https://sarahjohnson.dev",
    },
  },
  "mike-chen": {
    name: "Mike Chen",
    bio: "Full-stack developer and educator specializing in React, Node.js, and modern JavaScript. Love sharing knowledge through practical examples.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    role: "Full-Stack Developer",
    social: {
      twitter: "https://twitter.com/mikechen",
      linkedin: "https://linkedin.com/in/mikechen",
      github: "https://github.com/mikechen",
    },
  },
  "alex-rodriguez": {
    name: "Alex Rodriguez",
    bio: "JavaScript expert and former bootcamp instructor. Specializes in making complex concepts simple and engaging for new developers.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    role: "JavaScript Instructor",
    social: {
      twitter: "https://twitter.com/alexrodriguez",
      linkedin: "https://linkedin.com/in/alexrodriguez",
      github: "https://github.com/alexrodriguez",
    },
  },
}

function extractHeadings(content: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Array<{ id: string; text: string; level: number }> = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    headings.push({ id, text, level })
  }

  return headings
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

function getMainCategory(keywords: string[]): string {
  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase()
    if (categoryMapping[normalizedKeyword]) {
      return categoryMapping[normalizedKeyword].name
    }
  }
  return "Programming" // Default category
}

// Simple remark plugin to add IDs to headings
function remarkAddHeadingIds() {
  return (tree: any) => {
    function visit(node: any) {
      if (node.type === "heading" && node.children && node.children[0]) {
        const text = node.children[0].value || ""
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")

        node.data = node.data || {}
        node.data.hProperties = node.data.hProperties || {}
        node.data.hProperties.id = id
      }

      if (node.children) {
        node.children.forEach(visit)
      }
    }

    if (tree.children) {
      tree.children.forEach(visit)
    }
  }
}

// BULLETPROOF HTML POST-PROCESSING
function transformCodeBlocks(html: string): string {
  console.log("🔧 Starting HTML code block transformation...")

  // More comprehensive regex to catch all variations of code blocks
  const codeBlockRegex = /<pre><code(?:\s+class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g

  let transformedHtml = html
  let match
  let blockCount = 0

  while ((match = codeBlockRegex.exec(html)) !== null) {
    const fullMatch = match[0]
    const language = match[1] || "text"
    let codeContent = match[2]

    console.log(`📦 Processing code block ${blockCount + 1}:`, {
      language,
      originalLength: codeContent.length,
      preview: codeContent.substring(0, 100) + "...",
    })

    // Decode HTML entities that might have been encoded by remark
    codeContent = codeContent
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")

    // Re-encode for safe HTML display
    const safeCode = codeContent
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")

    // Create the enhanced code block
    const enhancedCodeBlock = `<div class="code-block-wrapper">
  <div class="code-block-header">
    <div class="code-block-dots">
      <div class="dot red"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
    </div>
    <div class="code-block-info">
      <span class="language-label">${language.toUpperCase()}</span>
      <button class="copy-button" onclick="copyCodeToClipboard(this)" data-code="${encodeURIComponent(codeContent)}" title="Copy code">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
  </div>
  <div class="code-block-content">
    <pre><code class="language-${language}">${safeCode}</code></pre>
  </div>
</div>`

    transformedHtml = transformedHtml.replace(fullMatch, enhancedCodeBlock)
    blockCount++

    console.log(`✅ Transformed code block ${blockCount}`)
  }

  console.log(`🎉 Total code blocks transformed: ${blockCount}`)
  return transformedHtml
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    const files = fs.readdirSync(contentDirectory)
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"))

    const blogs = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace(".mdx", "")
        return await getBlogBySlug(slug)
      }),
    )

    return blogs.filter((blog): blog is BlogPost => blog !== null)
  } catch (error) {
    console.error("Error reading blog directory:", error)
    return []
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)

    console.log(`📝 Processing blog: ${slug}`)

    // Clean up any escaped backticks in the content
    const cleanContent = content.replace(/\\`\\`\\`/g, "```").replace(/\\`/g, "`")

    console.log(`📄 Original content length: ${content.length}`)
    console.log(`🧹 Cleaned content length: ${cleanContent.length}`)

    // Process markdown with standard remark pipeline
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkAddHeadingIds)
      .use(remarkHtml, { sanitize: false })
      .process(cleanContent)

    let htmlContent = processedContent.toString()
    console.log(`🔄 Remark HTML length: ${htmlContent.length}`)

    // Transform code blocks in the final HTML
    htmlContent = transformCodeBlocks(htmlContent)
    console.log(`✅ Final HTML length: ${htmlContent.length}`)

    const headings = extractHeadings(content)
    const readTime = calculateReadTime(content)

    // Get author details
    const authorKey = data.author?.toLowerCase().replace(/\s+/g, "-") || "sarah-johnson"
    const authorDetails = authors[authorKey as keyof typeof authors] || authors["sarah-johnson"]

    return {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      keywords: Array.isArray(data.keywords)
        ? data.keywords
        : typeof data.keywords === "string"
          ? data.keywords.split(",").map((k: string) => k.trim())
          : [],
      image:
        data.image ||
        data["og:image"] ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
      author: data.author || "Sarah Johnson",
      date: data.date || new Date().toLocaleDateString(),
      readTime,
      content: htmlContent,
      headings,
      category: getMainCategory(Array.isArray(data.keywords) ? data.keywords : []),
      authorDetails,
    }
  } catch (error) {
    console.error(`Error reading blog ${slug}:`, error)
    return null
  }
}

export async function getRelatedBlogs(currentSlug: string, keywords: string[]): Promise<BlogPost[]> {
  const allBlogs = await getAllBlogs()

  const relatedBlogs = allBlogs
    .filter((blog) => blog.slug !== currentSlug)
    .map((blog) => {
      const matchingKeywords = blog.keywords.filter((keyword) =>
        keywords.some((k) => k.toLowerCase() === keyword.toLowerCase()),
      )
      return { ...blog, matchScore: matchingKeywords.length }
    })
    .filter((blog) => blog.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)

  return relatedBlogs.slice(0, 6)
}

export async function getBlogsByTag(
  tag: string,
  page = 1,
  limit = 9,
): Promise<{
  blogs: BlogPost[]
  totalPages: number
  currentPage: number
  totalBlogs: number
}> {
  const allBlogs = await getAllBlogs()

  const filteredBlogs = allBlogs.filter((blog) =>
    blog.keywords.some((keyword) => keyword.toLowerCase() === tag.toLowerCase()),
  )

  const totalBlogs = filteredBlogs.length
  const totalPages = Math.ceil(totalBlogs / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const blogs = filteredBlogs.slice(startIndex, endIndex)

  return {
    blogs,
    totalPages,
    currentPage: page,
    totalBlogs,
  }
}

export async function getBlogsByCategory(
  category: string,
  page = 1,
  limit = 9,
): Promise<{
  blogs: BlogPost[]
  totalPages: number
  currentPage: number
  totalBlogs: number
}> {
  const allBlogs = await getAllBlogs()

  const filteredBlogs = allBlogs.filter((blog) => blog.category.toLowerCase() === category.toLowerCase())

  const totalBlogs = filteredBlogs.length
  const totalPages = Math.ceil(totalBlogs / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const blogs = filteredBlogs.slice(startIndex, endIndex)

  return {
    blogs,
    totalPages,
    currentPage: page,
    totalBlogs,
  }
}

export async function getAllCategories(): Promise<Array<{ name: string; count: number; slug: string; icon: string }>> {
  const allBlogs = await getAllBlogs()
  const categoryCount: Record<string, number> = {}

  allBlogs.forEach((blog) => {
    categoryCount[blog.category] = (categoryCount[blog.category] || 0) + 1
  })

  return Object.entries(categoryCount).map(([name, count]) => {
    const categoryKey = Object.keys(categoryMapping).find(
      (key) => categoryMapping[key].name.toLowerCase() === name.toLowerCase(),
    )
    const icon = categoryKey ? categoryMapping[categoryKey].icon : "BookOpen"

    return {
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      icon,
    }
  })
}

export async function getAllTags(): Promise<Array<{ name: string; count: number; slug: string }>> {
  const allBlogs = await getAllBlogs()
  const tagCount: Record<string, number> = {}

  allBlogs.forEach((blog) => {
    blog.keywords.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })

  return Object.entries(tagCount)
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    }))
    .sort((a, b) => b.count - a.count)
}

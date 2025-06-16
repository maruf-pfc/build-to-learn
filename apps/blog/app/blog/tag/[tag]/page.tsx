import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, ArrowRight, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { getBlogsByTag, getAllTags } from "@/lib/blog"
import { Pagination } from "@/components/pagination"
import { notFound } from "next/navigation"

interface TagPageProps {
  params: {
    tag: string
  }
  searchParams: {
    page?: string
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: tag.slug,
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const tagName = params.tag.replace(/-/g, " ")

  return {
    title: `${tagName} Articles - Build to Learn Blog`,
    description: `Explore all articles tagged with ${tagName}. Learn through practical tutorials and guides.`,
  }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const currentPage = Number(searchParams.page) || 1
  const tagName = params.tag.replace(/-/g, " ")

  const result = await getBlogsByTag(tagName, currentPage, 9)

  if (result.totalBlogs === 0) {
    notFound()
  }

  return (
    <main>
      <PageHeader
        title={`#${tagName}`}
        description={`${result.totalBlogs} articles tagged with "${tagName}"`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: `#${tagName}` }]}
      />

      <ContentSection className="bg-white">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Tag className="w-6 h-6 text-blue-600" />
            <h2 className="font-poppins font-bold text-2xl text-gray-900">Articles tagged with "{tagName}"</h2>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            {result.totalBlogs} articles
          </Badge>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {result.blogs.map((blog) => (
            <Card
              key={blog.slug}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
            >
              <img
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-1 mb-3">
                  {blog.keywords.slice(0, 3).map((tag) => (
                    <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Badge
                        variant={tag.toLowerCase() === tagName.toLowerCase() ? "default" : "outline"}
                        className="text-xs hover:bg-blue-100 cursor-pointer transition-colors"
                      >
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
                <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{blog.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild className="w-full group/btn">
                  <Link href={`/blog/${blog.slug}`} className="flex items-center justify-center">
                    Read More
                    <ArrowRight className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={result.currentPage}
          totalPages={result.totalPages}
          baseUrl={`/blog/tag/${params.tag}`}
        />
      </ContentSection>
    </main>
  )
}

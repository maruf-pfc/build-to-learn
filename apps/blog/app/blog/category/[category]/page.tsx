import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, ArrowRight, Clock, BookOpen } from "lucide-react"
import Link from "next/link"
import { getBlogsByCategory, getAllCategories } from "@/lib/blog"
import { Pagination } from "@/components/pagination"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    category: string
  }
  searchParams: {
    page?: string
  }
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const categoryName = params.category.replace(/-/g, " ")

  return {
    title: `${categoryName} Articles - Build to Learn Blog`,
    description: `Explore all articles in the ${categoryName} category. Learn through practical tutorials and guides.`,
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const currentPage = Number(searchParams.page) || 1
  const categoryName = params.category.replace(/-/g, " ")

  const result = await getBlogsByCategory(categoryName, currentPage, 9)

  if (result.totalBlogs === 0) {
    notFound()
  }

  return (
    <main>
      <PageHeader
        title={result.blogs[0]?.category || categoryName}
        description={`${result.totalBlogs} articles in this category`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: result.blogs[0]?.category || categoryName },
        ]}
      />

      <ContentSection className="bg-white">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="font-poppins font-bold text-2xl text-gray-900">
              {result.blogs[0]?.category || categoryName} Articles
            </h2>
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
                      <Badge variant="outline" className="text-xs hover:bg-blue-100 cursor-pointer transition-colors">
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
          baseUrl={`/blog/category/${params.category}`}
        />
      </ContentSection>
    </main>
  )
}

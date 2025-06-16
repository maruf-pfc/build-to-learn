import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Clock, Tag, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getAllBlogs, getAllCategories, getAllTags } from "@/lib/blog"
import { Pagination } from "@/components/pagination"
import { CategoryIcon } from "@/components/category-icon"

interface BlogPageProps {
  searchParams: {
    page?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1
  const blogsPerPage = 9

  const allBlogs = await getAllBlogs()
  const categories = await getAllCategories()
  const tags = await getAllTags()

  // Pagination logic
  const totalBlogs = allBlogs.length
  const totalPages = Math.ceil(totalBlogs / blogsPerPage)
  const startIndex = (currentPage - 1) * blogsPerPage
  const endIndex = startIndex + blogsPerPage
  const blogs = allBlogs.slice(startIndex, endIndex)

  const featuredBlog = allBlogs[0] // First blog as featured
  const regularBlogs = blogs.slice(featuredBlog && currentPage === 1 ? 1 : 0)

  // Show top 20 tags initially, with option to show more
  const topTags = tags.slice(0, 20)
  const hasMoreTags = tags.length > 20

  return (
    <main>
      <PageHeader
        title="Blog"
        description="Insights, tutorials, and tips from our team of educators and industry experts to help you on your learning journey."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      {/* Categories Section */}
      <ContentSection className="bg-white">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-xl text-gray-600">Explore articles organized by topic</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.slice(0, 8).map((category) => (
            <Link key={category.slug} href={`/blog/category/${category.slug}`}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CategoryIcon name={category.icon} className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-blue-600 font-medium">{category.count} articles</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {categories.length > 8 && (
          <div className="text-center">
            <Link href="/blog/categories">
              <Button variant="outline" className="group">
                View All Categories
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </ContentSection>

      {/* Popular Tags */}
      <ContentSection className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">Popular Tags</h2>
          <p className="text-xl text-gray-600">Discover content by tags</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {topTags.map((tag) => (
            <Link key={tag.slug} href={`/blog/tag/${tag.slug}`}>
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm hover:bg-blue-100 hover:text-blue-800 hover:border-blue-300 cursor-pointer transition-colors"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag.name} ({tag.count})
              </Badge>
            </Link>
          ))}
        </div>

        {hasMoreTags && (
          <div className="text-center">
            <Link href="/blog/tags">
              <Button variant="outline" className="group">
                View All {tags.length} Tags
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </ContentSection>

      <ContentSection className="bg-white">
        {/* Featured Post */}
        {featuredBlog && currentPage === 1 && (
          <div className="mb-16">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-blue-600 font-medium">Featured Article</span>
            </div>

            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <img
                  src={featuredBlog.image || "/placeholder.svg"}
                  alt={featuredBlog.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredBlog.keywords.slice(0, 3).map((tag) => (
                      <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Badge variant="secondary" className="hover:bg-blue-200 cursor-pointer transition-colors">
                          #{tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                  <h2 className="font-poppins font-bold text-2xl lg:text-3xl text-gray-900 mb-4">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{featuredBlog.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredBlog.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredBlog.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredBlog.readTime}</span>
                    </div>
                  </div>
                  <Button asChild className="w-fit group">
                    <Link href={`/blog/${featuredBlog.slug}`} className="flex items-center">
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {regularBlogs.map((blog) => (
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
                  {blog.keywords.slice(0, 2).map((tag) => (
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
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/blog" />}
      </ContentSection>

      {/* Newsletter Signup */}
      <ContentSection className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest articles, tutorials, and learning resources delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button size="lg">Subscribe</Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">No spam, unsubscribe at any time.</p>
        </div>
      </ContentSection>

      {/* Copy code functionality */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          function copyCodeToClipboard(button) {
            const codeBlock = button.closest('.code-block-wrapper');
            const code = codeBlock.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
              const originalHTML = button.innerHTML;
              button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"></polyline></svg>';
              setTimeout(() => {
                button.innerHTML = originalHTML;
              }, 2000);
            });
          }
        `,
        }}
      />
    </main>
  )
}
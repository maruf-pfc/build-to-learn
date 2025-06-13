import { PageHeader } from "@/components/page-header";
import { ContentSection } from "@/components/content-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: "getting-started-web-development",
    title: "Getting Started with Web Development in 2024",
    excerpt:
      "A comprehensive guide for beginners looking to start their journey in web development. Learn about the essential technologies and roadmap.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Beginner Guide",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop",
    featured: true,
  },
  {
    id: "react-best-practices",
    title: "React Best Practices for 2024",
    excerpt:
      "Discover the latest React patterns and best practices that will make your code more maintainable and performant.",
    author: "Mike Chen",
    date: "2024-01-12",
    readTime: "12 min read",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop",
  },
  {
    id: "javascript-async-programming",
    title: "Mastering Async Programming in JavaScript",
    excerpt:
      "Learn how to handle asynchronous operations in JavaScript with promises, async/await, and modern patterns.",
    author: "Alex Rodriguez",
    date: "2024-01-10",
    readTime: "15 min read",
    category: "JavaScript",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=300&fit=crop",
  },
  {
    id: "nodejs-api-development",
    title: "Building Scalable APIs with Node.js",
    excerpt:
      "A deep dive into creating robust and scalable REST APIs using Node.js, Express, and modern development practices.",
    author: "Emma Wilson",
    date: "2024-01-08",
    readTime: "18 min read",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop",
  },
  {
    id: "css-grid-flexbox",
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt:
      "Understanding the differences between CSS Grid and Flexbox, and knowing when to use each layout method effectively.",
    author: "Lisa Park",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "CSS",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
  },
  {
    id: "career-transition-tech",
    title: "Successfully Transitioning to a Tech Career",
    excerpt:
      "Practical advice and strategies for making a successful career change into the tech industry, regardless of your background.",
    author: "Carlos Martinez",
    date: "2024-01-03",
    readTime: "14 min read",
    category: "Career",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop",
  },
];

const categories = [
  "All",
  "Beginner Guide",
  "React",
  "JavaScript",
  "Backend",
  "CSS",
  "Career",
];

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <main>
      <PageHeader
        title="Blog"
        description="Insights, tutorials, and tips from our team of educators and industry experts to help you on your learning journey."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <ContentSection className="bg-white">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-blue-600 font-medium">
                Featured Article
              </span>
            </div>

            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                  <h2 className="font-poppins font-bold text-2xl lg:text-3xl text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <Button asChild className="w-fit group">
                    <Link
                      href={`/blog/${featuredPost.id}`}
                      className="flex items-center"
                    >
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card
              key={post.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
            >
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-3">
                  {post.category}
                </Badge>
                <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="w-full group/btn"
                >
                  <Link
                    href={`/blog/${post.id}`}
                    className="flex items-center justify-center"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </ContentSection>

      {/* Newsletter Signup */}
      <ContentSection className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest articles, tutorials, and learning resources delivered
            to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button size="lg">Subscribe</Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </ContentSection>
    </main>
  );
}

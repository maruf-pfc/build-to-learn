import { PageHeader } from "@/components/page-header";
import { ContentSection } from "@/components/content-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Users,
  TrendingUp,
  Search,
  Plus,
  Eye,
  ThumbsUp,
  Clock,
} from "lucide-react";

const forumStats = [
  { icon: Users, label: "Members", value: "12,500+" },
  { icon: MessageSquare, label: "Discussions", value: "8,200+" },
  { icon: TrendingUp, label: "Daily Posts", value: "150+" },
];

const categories = [
  {
    name: "General Discussion",
    description: "General topics about learning and career advice",
    posts: 1250,
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "JavaScript",
    description: "All things JavaScript, from basics to advanced topics",
    posts: 890,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    name: "React",
    description: "React discussions, tips, and troubleshooting",
    posts: 720,
    color: "bg-cyan-100 text-cyan-800",
  },
  {
    name: "Node.js",
    description: "Backend development with Node.js",
    posts: 540,
    color: "bg-green-100 text-green-800",
  },
  {
    name: "Career Advice",
    description: "Job hunting, interviews, and career transitions",
    posts: 680,
    color: "bg-purple-100 text-purple-800",
  },
  {
    name: "Project Showcase",
    description: "Share your projects and get feedback",
    posts: 420,
    color: "bg-pink-100 text-pink-800",
  },
];

const recentPosts = [
  {
    title: "How to handle async operations in React?",
    author: "john_dev",
    category: "React",
    replies: 12,
    views: 245,
    lastActivity: "2 hours ago",
    solved: true,
  },
  {
    title: "Best practices for Node.js API development",
    author: "sarah_codes",
    category: "Node.js",
    replies: 8,
    views: 156,
    lastActivity: "4 hours ago",
    solved: false,
  },
  {
    title: "Transitioning from marketing to web development",
    author: "career_changer",
    category: "Career Advice",
    replies: 15,
    views: 320,
    lastActivity: "6 hours ago",
    solved: false,
  },
  {
    title: "My first full-stack project - feedback welcome!",
    author: "newbie_coder",
    category: "Project Showcase",
    replies: 6,
    views: 89,
    lastActivity: "8 hours ago",
    solved: false,
  },
  {
    title: "Understanding JavaScript closures with examples",
    author: "js_expert",
    category: "JavaScript",
    replies: 20,
    views: 450,
    lastActivity: "12 hours ago",
    solved: true,
  },
];

export default function ForumPage() {
  return (
    <main>
      <PageHeader
        title="Community Forum"
        description="Connect with fellow learners, ask questions, share knowledge, and grow together in our supportive community."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Community Forum" },
        ]}
      />

      {/* Forum Stats */}
      <ContentSection className="bg-white">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {forumStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="font-poppins font-bold text-2xl text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and New Post */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="Search discussions..."
              className="pl-10 pr-4 py-3"
            />
          </div>
          <Button size="lg" className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Discussion
          </Button>
        </div>
      </ContentSection>

      {/* Categories */}
      <ContentSection className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Discussion Categories
          </h2>
          <p className="text-xl text-gray-600">
            Find the right place for your questions and discussions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className={category.color}>{category.name}</Badge>
                  <span className="text-sm text-gray-500">
                    {category.posts} posts
                  </span>
                </div>
                <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* Recent Discussions */}
      <ContentSection className="bg-white">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-poppins font-bold text-2xl text-gray-900">
            Recent Discussions
          </h2>
          <Button variant="outline">View All</Button>
        </div>

        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      {post.solved && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          Solved
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>by {post.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>{post.replies} replies</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* Community Guidelines */}
      <ContentSection className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-6">
            Community Guidelines
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Help us maintain a welcoming and supportive environment for all
            learners
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <ThumbsUp className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">
                Be Respectful
              </h3>
              <p className="text-gray-600 text-sm">
                Treat everyone with kindness and respect, regardless of their
                skill level.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <MessageSquare className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">
                Stay On Topic
              </h3>
              <p className="text-gray-600 text-sm">
                Keep discussions relevant to learning and development topics.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Users className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">
                Help Others
              </h3>
              <p className="text-gray-600 text-sm">
                Share your knowledge and help fellow learners succeed.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

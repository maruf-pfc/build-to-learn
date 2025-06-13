import { PageHeader } from "@/components/page-header";
import { ContentSection } from "@/components/content-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  MessageCircle,
  Video,
  FileText,
  Search,
  HelpCircle,
} from "lucide-react";

const helpCategories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "New to Build to Learn? Start here for setup and basics",
    articles: 12,
  },
  {
    icon: Video,
    title: "Course Help",
    description: "Questions about courses, progress, and certificates",
    articles: 18,
  },
  {
    icon: MessageCircle,
    title: "Technical Support",
    description: "Having technical issues? We're here to help",
    articles: 8,
  },
  {
    icon: FileText,
    title: "Account & Billing",
    description: "Manage your account settings and billing information",
    articles: 6,
  },
];

const popularArticles = [
  {
    title: "How to enroll in a course",
    category: "Getting Started",
    views: "2.3k views",
  },
  {
    title: "Troubleshooting video playback issues",
    category: "Technical Support",
    views: "1.8k views",
  },
  {
    title: "How to download your certificate",
    category: "Course Help",
    views: "1.5k views",
  },
  {
    title: "Resetting your password",
    category: "Account & Billing",
    views: "1.2k views",
  },
  {
    title: "Course progress not saving",
    category: "Technical Support",
    views: "980 views",
  },
];

export default function HelpPage() {
  return (
    <main>
      <PageHeader
        title="Help Center"
        description="Find answers to common questions and get the support you need to succeed in your learning journey."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Help Center" }]}
      />

      {/* Search Section */}
      <ContentSection className="bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-6">
            How can we help you?
          </h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="Search for help articles..."
              className="pl-12 pr-4 py-4 text-lg"
            />
          </div>
        </div>
      </ContentSection>

      {/* Help Categories */}
      <ContentSection className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600">
            Find help articles organized by topic
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {helpCategories.map((category, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <p className="text-sm text-blue-600 font-medium">
                  {category.articles} articles
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* Popular Articles */}
      <ContentSection className="bg-white">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-8">
              Popular Articles
            </h2>
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{article.category}</span>
                          <span>•</span>
                          <span>{article.views}</span>
                        </div>
                      </div>
                      <HelpCircle className="w-5 h-5 text-gray-400 ml-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-8">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <Card className="border-0 shadow-lg bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-1">
                        Contact Support
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Get personalized help from our support team
                      </p>
                    </div>
                    <Button>Contact</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-1">
                        Community Forum
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Ask questions and get help from other learners
                      </p>
                    </div>
                    <Button variant="outline">Visit Forum</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-purple-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-1">
                        Video Tutorials
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Watch step-by-step guides and tutorials
                      </p>
                    </div>
                    <Button variant="outline">Watch</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Still Need Help */}
      <ContentSection className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Can't find what you're looking for? Our support team is here to help
            you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Contact Support</Button>
            <Button size="lg" variant="outline">
              Schedule a Call
            </Button>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

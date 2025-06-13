import { PageHeader } from "@/components/page-header";
import { ContentSection } from "@/components/content-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Code,
  Zap,
  Settings,
  Search,
  ExternalLink,
} from "lucide-react";

const docSections = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Learn the basics of using Build to Learn platform",
    articles: [
      "Creating your account",
      "Navigating the platform",
      "Enrolling in your first course",
      "Understanding course structure",
    ],
  },
  {
    icon: Code,
    title: "Course Features",
    description: "Make the most of our interactive learning features",
    articles: [
      "Video lessons and playback",
      "Interactive code examples",
      "Lab exercises and projects",
      "Progress tracking",
    ],
  },
  {
    icon: Zap,
    title: "Advanced Features",
    description: "Unlock the full potential of your learning experience",
    articles: [
      "Certificate generation",
      "Community integration",
      "Study groups and collaboration",
      "Mobile app usage",
    ],
  },
  {
    icon: Settings,
    title: "Account Management",
    description: "Manage your profile, settings, and preferences",
    articles: [
      "Profile customization",
      "Notification settings",
      "Privacy controls",
      "Data export and deletion",
    ],
  },
];

const quickLinks = [
  {
    title: "API Documentation",
    description: "For developers integrating with our platform",
    link: "/docs/api",
  },
  {
    title: "Troubleshooting Guide",
    description: "Common issues and their solutions",
    link: "/docs/troubleshooting",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step visual guides",
    link: "/docs/videos",
  },
  {
    title: "FAQ",
    description: "Frequently asked questions",
    link: "/docs/faq",
  },
];

export default function DocsPage() {
  return (
    <main>
      <PageHeader
        title="Documentation"
        description="Everything you need to know about using Build to Learn effectively. Find guides, tutorials, and reference materials."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Documentation" }]}
      />

      {/* Search */}
      <ContentSection className="bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-6">
            Search Documentation
          </h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="Search for guides, tutorials, and help articles..."
              className="pl-12 pr-4 py-4 text-lg"
            />
          </div>
        </div>
      </ContentSection>

      {/* Documentation Sections */}
      <ContentSection className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Documentation Sections
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive guides organized by topic
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {docSections.map((section, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{section.description}</p>
                    <ul className="space-y-2">
                      {section.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <a
                            href="#"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center group"
                          >
                            {article}
                            <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* Quick Links */}
      <ContentSection className="bg-white">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Quick Links
          </h2>
          <p className="text-xl text-gray-600">
            Jump to commonly accessed resources
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{link.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-blue-600 group-hover:text-white transition-colors"
                >
                  View Docs
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* Popular Articles */}
      <ContentSection className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-8">
              Popular Articles
            </h2>
            <div className="space-y-4">
              {[
                "How to enroll in a course",
                "Understanding course progress tracking",
                "Downloading and sharing certificates",
                "Using the mobile app effectively",
                "Troubleshooting video playback issues",
              ].map((article, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 hover:text-blue-600 transition-colors">
                        {article}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-8">
              Recently Updated
            </h2>
            <div className="space-y-4">
              {[
                { title: "New course enrollment process", date: "2 days ago" },
                { title: "Updated mobile app features", date: "1 week ago" },
                { title: "Certificate template changes", date: "2 weeks ago" },
                { title: "Community forum guidelines", date: "3 weeks ago" },
                { title: "API rate limiting updates", date: "1 month ago" },
              ].map((article, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-900 hover:text-blue-600 transition-colors block">
                          {article.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          {article.date}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Contribute */}
      <ContentSection className="bg-white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Contribute to Documentation
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Help us improve our documentation by suggesting edits, reporting
            issues, or contributing new content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Suggest Edit</Button>
            <Button size="lg" variant="outline">
              Report Issue
            </Button>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

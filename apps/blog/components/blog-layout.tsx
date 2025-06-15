"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  Share2,
  Bookmark,
  Menu,
  X,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { TableOfContents } from "@/components/table-of-contents";
import { AuthorCard } from "@/components/author-card";
import { ScrollToTop } from "@/components/scroll-to-top";
import type { BlogPost } from "@/lib/blog";

interface BlogLayoutProps {
  blog: BlogPost;
  relatedBlogs: BlogPost[];
}

export function BlogLayout({ blog, relatedBlogs }: BlogLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize copy functionality when component mounts
  useEffect(() => {
    // Define the copy function globally so it can be called from inline onclick
    (window as any).copyCodeToClipboard = async (button: HTMLElement) => {
      try {
        const encodedCode = button.getAttribute("data-code");
        if (!encodedCode) {
          console.error("No code data found");
          return;
        }

        const code = decodeURIComponent(encodedCode);

        // Try modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(code);
        } else {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = code;
          textArea.style.position = "fixed";
          textArea.style.left = "-9999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }

        // Show success feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>`;
        button.style.color = "#10b981";

        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.color = "";
        }, 2000);
      } catch (error) {
        console.error("Copy failed:", error);
      }
    };

    return () => {
      // Cleanup
      delete (window as any).copyCodeToClipboard;
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-20 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-lg"
        >
          {sidebarOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content - Takes 3 columns on desktop */}
            <div className="lg:col-span-3">
              <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
                {blog.keywords.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer transition-colors text-xs lg:text-sm"
                    >
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>

              <h1 className="font-poppins font-bold text-2xl lg:text-4xl text-gray-900 mb-4 lg:mb-6 leading-tight">
                {blog.title}
              </h1>

              <img
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-48 lg:h-80 object-cover rounded-xl shadow-lg mb-4 lg:mb-6"
              />

              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 lg:mb-8">
                {blog.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-b border-gray-200 py-4 mb-6 lg:mb-8 gap-4">
                <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Sidebar - Takes 1 column */}
            {/* <div className="hidden lg:block lg:col-span-1 fixed">
              <div className="sticky top-8">
                <TableOfContents headings={blog.headings} />
              </div>
            </div> */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-8">
                <TableOfContents headings={blog.headings} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 space-y-6 mt-16">
          <TableOfContents headings={blog.headings} />
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <div
              className="blog-content prose prose-lg max-w-none prose-headings:font-poppins prose-headings:font-bold prose-a:text-blue-600"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Social Sharing */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 font-medium">
                    Share this article:
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm">
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      Facebook
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Heart className="w-4 h-4" />
                  <span>42 likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Details */}
      <div id="author-section" className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <AuthorCard author={blog.authorDetails} />
        </div>
      </div>

      {/* Related Blogs */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <h2 className="font-poppins font-bold text-2xl lg:text-3xl text-gray-900 mb-8 lg:mb-12 text-center">
            Related Articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {relatedBlogs.slice(0, 6).map((relatedBlog) => (
              <Card
                key={relatedBlog.slug}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                <img
                  src={relatedBlog.image || "/placeholder.svg"}
                  alt={relatedBlog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {relatedBlog.keywords.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {relatedBlog.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {relatedBlog.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-full group/btn"
                  >
                    <Link
                      href={`/blog/${relatedBlog.slug}`}
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
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
          <h2 className="font-poppins font-bold text-2xl lg:text-3xl text-gray-900 mb-4">
            Never Miss an Update
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 mb-8">
            Get the latest tutorials, tips, and insights delivered straight to
            your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button size="lg" className="sm:px-8">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight">
                Master Real-World Skills,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  One Project at a Time
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Stop learning in theory. Start building your future with
                hands-on, project-based courses designed by industry experts.
                Focus on one course at a time for maximum impact.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="group">
                <Link href="/courses" className="flex items-center">
                  Explore Courses
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group">
                <Play className="mr-2 w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="font-poppins font-bold text-2xl text-gray-900">
                  10,000+
                </div>
                <div className="text-sm text-gray-600">Students Enrolled</div>
              </div>
              <div>
                <div className="font-poppins font-bold text-2xl text-gray-900">
                  50+
                </div>
                <div className="text-sm text-gray-600">
                  Project-Based Courses
                </div>
              </div>
              <div>
                <div className="font-poppins font-bold text-2xl text-gray-900">
                  95%
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <Play className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-white font-bold text-sm">JS</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white font-bold text-xs">React</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

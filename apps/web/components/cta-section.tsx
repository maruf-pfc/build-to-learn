import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 text-white/90 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Join 10,000+ successful learners</span>
            </div>

            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Ready to Start Building Your Future?
            </h2>

            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Stop learning in theory. Start building real projects and master
              the skills that will advance your career. Your journey begins with
              a single course.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 group"
              asChild
            >
              <Link href="/signup" className="flex items-center">
                Get Started for Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-blue-600 hover:bg-white hover:text-blue-700"
              asChild
            >
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>

          <div className="text-white/80 text-sm">
            No credit card required • Start learning immediately • Cancel
            anytime
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Award,
  Users,
  Layers,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import HomeStats from "@/components/home/HomeStats";
import FeaturedCourses from "@/components/home/FeaturedCourses";

export const metadata = {
  title: "Build To Learn - Modern Learning Management System",
  description:
    "A modern Learning Management System designed for students, instructors, and lifelong learners. Learn, practice, test, and earn certificates.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* ================= HERO ================= */}
      <Section className="min-h-screen flex flex-col justify-center items-center pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32 text-center px-6 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-16 right-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-16 left-10 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />

        <Container className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Start your learning journey today</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Learn Skills That{" "}
            <span className="text-primary">Actually Matter</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            A modern Learning Management System designed for students,
            instructors, and lifelong learners.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "text-lg px-8 shadow-lg hover:shadow-xl transition-shadow"
              )}
            >
              Start Learning <ArrowRight size={20} className="ml-2" />
            </Link>

            <Link
              href="/courses"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "text-lg px-8 bg-background/80 backdrop-blur-sm"
              )}
            >
              Browse Courses
            </Link>
          </div>
        </Container>
      </Section>

      {/* ================= CATEGORIES ================= */}
      <Section variant="muted">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Popular Categories
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore courses across various domains and skill levels
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Web Development", icon: "💻", color: "from-blue-500/10 to-cyan-500/10" },
              { name: "Backend Engineering", icon: "⚙️", color: "from-green-500/10 to-emerald-500/10" },
              { name: "UI / UX Design", icon: "🎨", color: "from-pink-500/10 to-rose-500/10" },
              { name: "Data Structures", icon: "📊", color: "from-purple-500/10 to-violet-500/10" },
              { name: "Databases", icon: "🗄️", color: "from-orange-500/10 to-amber-500/10" },
              { name: "DevOps", icon: "🚀", color: "from-red-500/10 to-pink-500/10" },
              { name: "Career Skills", icon: "💼", color: "from-indigo-500/10 to-blue-500/10" },
              { name: "Programming Basics", icon: "📝", color: "from-teal-500/10 to-cyan-500/10" },
            ].map((cat) => (
              <Link
                href={`/courses?category=${encodeURIComponent(cat.name)}`}
                key={cat.name}
              >
                <Card 
                  interactive
                  className={cn(
                    "h-full bg-gradient-to-br",
                    cat.color
                  )}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full min-h-[140px]">
                    <span className="text-4xl mb-3">{cat.icon}</span>
                    <h3 className="font-semibold text-center">{cat.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= FEATURED COURSES ================= */}
      <FeaturedCourses />

      {/* ================= STATS ================= */}
      <HomeStats />

      {/* ================= HOW IT WORKS ================= */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              How This Platform Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Simple, structured, and effective learning path designed for your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <HowCard
              step="01"
              icon={Target}
              title="Enroll in a Course"
              description="Choose a course and start learning instantly. One active course at a time for focused learning."
              color="from-blue-500 to-cyan-500"
            />
            <HowCard
              step="02"
              icon={Zap}
              title="Complete Modules"
              description="Read documentation, watch videos, pass quizzes, and submit projects at your own pace."
              color="from-purple-500 to-pink-500"
            />
            <HowCard
              step="03"
              icon={Award}
              title="Earn Certificate"
              description="Finish all modules and unlock your verified certificate to showcase your achievement."
              color="from-orange-500 to-yellow-500"
            />
          </div>
        </Container>
      </Section>

      {/* ================= FEATURES ================= */}
      <Section variant="muted">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Why Choose Build To Learn?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features designed to enhance your learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              title="Structured Learning"
              text="Modules unlock progressively so learners stay focused and consistent."
              icon={Layers}
            />
            <Feature
              title="Cheating Detection"
              text="Advanced MCQ monitoring using tab-switch and clipboard detection."
              icon={CheckCircle}
            />
            <Feature
              title="Progress Tracking"
              text="Track learning progress, completed modules, and achievements."
              icon={Target}
            />
            <Feature
              title="Gamification"
              text="Earn points, climb leaderboards, and unlock premium resources."
              icon={Sparkles}
            />
            <Feature
              title="Community & Forum"
              text="Ask questions, share knowledge, and learn together."
              icon={Users}
            />
            <Feature
              title="Verified Certificates"
              text="Auto-generated certificates after course completion."
              icon={Award}
            />
          </div>
        </Container>
      </Section>

      {/* ================= CTA ================= */}
      <Section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950 dark:bg-black" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Join thousands of learners and instructors building the future of education together. 
              Get started today for free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/register?role=student"
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                  "min-w-[200px] text-lg h-14 bg-white text-slate-950 hover:bg-slate-200 border-0"
                )}
              >
                Join as Student
              </Link>

              <Link
                href="/register?role=instructor"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "min-w-[200px] text-lg h-14 border-slate-700 text-slate-100 hover:bg-slate-800 hover:text-white bg-transparent"
                )}
              >
                Become Instructor
              </Link>
            </div>
            
            <p className="text-sm text-slate-500 mt-8">
              No credit card required for free courses.
            </p>
          </div>
        </Container>
      </Section>
      <Footer />
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function HowCard({ step, icon: Icon, title, description, color }) {
  return (
    <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
      <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r", color)} />
      <CardContent className="p-8">
        <div className="flex items-center gap-4 mb-4">
          <span className={cn(
            "text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
            color
          )}>
            {step}
          </span>
          <div className={cn(
            "p-3 rounded-lg bg-gradient-to-r",
            color,
            "bg-opacity-10"
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function Feature({ title, text, icon: Icon }) {
  return (
    <Card className="border-border/50 hover:border-primary/50 transition-colors duration-300">
      <CardContent className="p-6">
        <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit">
          <Icon className="text-primary h-6 w-6" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{text}</p>
      </CardContent>
    </Card>
  );
}

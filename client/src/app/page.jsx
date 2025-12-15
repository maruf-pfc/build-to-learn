import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Layers,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-24 text-center px-6 bg-gradient-to-b from-primary/20 to-background">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
          Learn Skills That <br />
          <span className="text-primary">Actually Matter</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          A modern Learning Management System designed for students,
          instructors, and lifelong learners. Learn, practice, test, and earn
          certificates.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className={cn(buttonVariants({ size: "lg" }), "text-lg px-8")}
          >
            Start Learning <ArrowRight size={20} className="ml-2" />
          </Link>

          <Link
            href="/courses"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "text-lg px-8 bg-background/50 backdrop-blur-sm"
            )}
          >
            Browse Courses
          </Link>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat icon={<Users />} value="10K+" label="Active Learners" />
          <Stat icon={<BookOpen />} value="300+" label="Courses" />
          <Stat icon={<Award />} value="5K+" label="Certificates Issued" />
          <Stat icon={<Layers />} value="100+" label="Instructors" />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">
          How This Platform Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <HowCard
            step="01"
            title="Enroll in a Course"
            description="Choose a course and start learning instantly. One active course at a time for focus."
          />
          <HowCard
            step="02"
            title="Complete Modules"
            description="Read documentation, watch videos, pass quizzes, and submit projects."
          />
          <HowCard
            step="03"
            title="Earn Certificate"
            description="Finish all modules and unlock your certificate after eligibility."
          />
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-24 bg-muted/30 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">
            Popular Categories
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Web Development",
              "Backend Engineering",
              "UI / UX Design",
              "Data Structures",
              "Databases",
              "DevOps",
              "Career Skills",
              "Programming Basics",
            ].map((cat) => (
              <Link
                href={`/courses?category=${encodeURIComponent(cat)}`}
                key={cat}
              >
                <Card className="hover:bg-accent/50 transition-colors border-border/50 cursor-pointer h-full">
                  <CardContent className="flex items-center justify-center p-6 h-full">
                    <h3 className="font-semibold text-center">{cat}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">
          Why Choose This LMS?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            title="Structured Learning"
            text="Modules unlock progressively so learners stay focused and consistent."
          />
          <Feature
            title="Cheating Detection"
            text="Advanced MCQ monitoring using tab-switch and clipboard detection."
          />
          <Feature
            title="Progress Tracking"
            text="Track learning progress, completed modules, and achievements."
          />
          <Feature
            title="Gamification"
            text="Earn points, climb leaderboards, and unlock premium resources."
          />
          <Feature
            title="Community & Forum"
            text="Ask questions, share knowledge, and learn together."
          />
          <Feature
            title="Certificates"
            text="Auto-generated certificates after course completion."
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-primary text-primary-foreground text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Start Learning Today
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-10 text-primary-foreground/90">
          Whether you are a student or an instructor, this platform is built for
          growth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "text-lg px-8"
            )}
          >
            Join as Student
          </Link>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "text-lg px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            )}
          >
            Become an Instructor
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Stat({ icon, value, label }) {
  return (
    <div>
      <div className="flex justify-center mb-3 text-primary">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}

function HowCard({ step, title, description }) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="p-8">
        <span className="text-primary font-bold text-sm block mb-2">
          {step}
        </span>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function Feature({ title, text }) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="p-6">
        <CheckCircle className="text-green-500 mb-4 h-6 w-6" />
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
}

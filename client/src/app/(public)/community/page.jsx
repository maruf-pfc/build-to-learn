import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MessageSquare, BookOpen, Users } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Community Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with learners, ask questions, and grow together through
            discussions and shared knowledge.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CommunityCard
            icon={<MessageSquare className="h-6 w-6" />}
            title="Discussion Forum"
            description="Ask questions, help others, and discuss course material."
            href="/forum"
            action="Go to Forum"
          />

          <CommunityCard
            icon={<BookOpen className="h-6 w-6" />}
            title="Blog & Articles"
            description="Read tutorials, success stories, and platform updates."
            href="/blog"
            action="Read Blog"
            variant="outline"
          />

          <CommunityCard
            icon={<Users className="h-6 w-6" />}
            title="Top Instructors"
            description="Explore the instructors and top-performing learners."
            href="/leaderboard"
            action="View Leaderboard"
            variant="secondary"
          />
        </div>
      </main>
    </div>
  );
}

/* ================= COMPONENT ================= */

function CommunityCard({
  icon,
  title,
  description,
  href,
  action,
  variant = "default",
}) {
  return (
    <Card className="border-border/60 hover:shadow-md transition-shadow">
      <CardHeader className="space-y-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant={variant} className="w-full">
          <Link href={href}>{action}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

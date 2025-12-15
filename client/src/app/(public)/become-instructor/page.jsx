import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, DollarSign, Globe } from "lucide-react";

export default function BecomeInstructorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Become an Instructor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your knowledge, inspire students worldwide, and earn money by
            teaching what you love.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/register?role=instructor">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Teach With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard
              icon={Globe}
              title="Reach Global Audience"
              description="Connect with students from all over the world and make an impact."
            />
            <BenefitCard
              icon={DollarSign}
              title="Earn Money"
              description="Get paid for every course you sell. Top instructors earn 6 figures."
            />
            <BenefitCard
              icon={Users}
              title="Build Your Brand"
              description="Establish yourself as an expert in your field and grow your following."
            />
            <BenefitCard
              icon={CheckCircle}
              title="Easy Tools"
              description="Our course builder is intuitive and powerful. No coding required."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-6 bg-muted/30 border-y border-border"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step
              number="1"
              title="Plan Your Course"
              description="Choose a topic and structure your content."
            />
            <Step
              number="2"
              title="Create Content"
              description="Record videos and create quizzes using our tools."
            />
            <Step
              number="3"
              title="Publish & Earn"
              description="Launch your course and start earning revenue."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Ready to Start?</h2>
          <p className="text-muted-foreground">
            Join thousands of instructors who are changing lives through
            learning.
          </p>
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/register?role=instructor">Join Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, description }) {
  return (
    <Card className="text-center p-6 hover:shadow-lg transition-shadow">
      <CardContent className="pt-6 space-y-4">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <Icon size={24} />
        </div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="space-y-4">
      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto">
        {number}
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

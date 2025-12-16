import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Globe } from "lucide-react";

export const metadata = {
  title: "About Us - Build To Learn",
  description: "Democratizing education for everyone, everywhere.",
};

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <Section className="bg-primary text-primary-foreground py-24 text-center">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            We are on a mission to democratize education and make high-quality
            learning accessible to everyone, everywhere.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold mb-6 tracking-tight">
                Our Story
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Founded in 2025, LMS Platform started with a simple idea: that
                everyone should have the opportunity to learn from the best. What
                began as a small project has grew into a global community of
                learners and instructors.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Today, we host thousands of courses across technology, business,
                arts, and sciences, reaching students in over 100 countries.
              </p>
            </div>
            <Card className="bg-muted border-none h-[400px] w-full overflow-hidden relative">
              <CardContent className="flex items-center justify-center h-full text-muted-foreground font-bold text-xl p-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                <span className="relative z-10">Team / Office Image</span>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-12 tracking-tight">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Accessibility",
                  desc: "Education should be available to all, regardless of location or background.",
                  icon: Globe,
                },
                {
                  title: "Quality",
                  desc: "We curate content from top industry experts and academic institutions.",
                  icon: BookOpen,
                },
                {
                  title: "Community",
                  desc: "Learning is more effective when done together. We foster collaboration.",
                  icon: Users,
                },
              ].map((val, i) => (
                <Card key={i} className="bg-card hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <val.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">
                      {val.title}
                    </h3>
                    <p className="text-muted-foreground">{val.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

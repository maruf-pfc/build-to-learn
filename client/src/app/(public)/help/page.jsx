import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            How can we help?
          </h1>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Find answers to common questions or reach out for support.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for answers..."
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="max-w-5xl mx-auto px-6 py-20 space-y-20">
        {/* ================= SUPPORT OPTIONS ================= */}
        <section>
          <div className="grid gap-6 md:grid-cols-2">
            <SupportCard
              icon={<Mail className="h-6 w-6" />}
              title="Email Support"
              description="Get help from our support team within 24 hours."
              action="Contact Support"
            />

            <SupportCard
              icon={<MessageCircle className="h-6 w-6" />}
              title="Community Forum"
              description="Ask questions and get help from other learners."
              action="Visit Forum"
            />
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-10">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-2">
            <FAQ
              value="1"
              question="How do I become an instructor?"
              answer="You can register as an instructor from the registration page. After approval, you can start creating courses."
            />
            <FAQ
              value="2"
              question="Can I get a refund for a course?"
              answer="All courses are currently free. No payment or refund is required."
            />
            <FAQ
              value="3"
              question="How do I reset my password?"
              answer="Go to the login page and click on “Forgot password”. Follow the instructions sent to your email."
            />
            <FAQ
              value="4"
              question="Is there a mobile app?"
              answer="There is no native app yet, but the platform is fully responsive and works perfectly on mobile devices."
            />
          </Accordion>
        </section>
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SupportCard({ icon, title, description, action }) {
  return (
    <Card className="border-border/60 hover:shadow-md transition-shadow">
      <CardContent className="p-8 flex flex-col items-center text-center gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
        <Button variant="outline" className="w-full sm:w-auto">
          {action}
        </Button>
      </CardContent>
    </Card>
  );
}

function FAQ({ value, question, answer }) {
  return (
    <AccordionItem value={value} className="border rounded-lg px-4">
      <AccordionTrigger className="text-left font-medium">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}

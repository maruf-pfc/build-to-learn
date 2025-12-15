"use client";

import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How do I enroll in a course?",
    a: "Browse the course catalog, open a course, and click 'Enroll Now'. You must have no active course to enroll.",
  },
  {
    q: "Can I get a refund?",
    a: "All courses are currently free, so no payment or refund is required.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes. After completing all modules and meeting eligibility requirements, you will receive a digital certificate.",
  },
  {
    q: "Can I teach on this platform?",
    a: "Yes. Register as an instructor or request instructor access from your dashboard.",
  },
  {
    q: "Is there a mobile app?",
    a: "There is no native app yet, but the platform is fully responsive and works perfectly on mobile devices.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ================= HERO ================= */}
      <section className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the platform.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-20 space-y-16">
        {/* FAQ List */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border rounded-lg px-4"
            >
              <AccordionTrigger className="text-left font-medium">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <p className="max-w-3xl whitespace-pre-line break-words">
                  {item.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA */}
        <section className="rounded-2xl border bg-muted/30 p-10 text-center">
          <HelpCircle className="mx-auto mb-4 text-primary h-8 w-8" />
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            If you couldn’t find the answer you were looking for, feel free to
            contact our support team.
          </p>
          <Button asChild size="lg">
            <a href="/contact">Contact Support</a>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

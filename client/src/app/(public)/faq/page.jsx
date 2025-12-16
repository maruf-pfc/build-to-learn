import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

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

export const metadata = {
  title: "FAQ - Build To Learn",
  description: "Frequently asked questions about our platform.",
};

export default function FAQPage() {
  return (
    <>
      <Section className="border-b bg-muted/30 py-20">
        <Container className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the platform.
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl space-y-16">
          {/* FAQ List */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left font-medium py-4 text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  <p className="whitespace-pre-line break-words">
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="rounded-2xl border bg-muted/30 p-10 text-center">
            <HelpCircle className="mx-auto mb-4 text-primary h-10 w-10" />
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              If you couldn’t find the answer you were looking for, feel free to
              contact our support team.
            </p>
            <Button asChild size="lg">
              <a href="/contact">Contact Support</a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

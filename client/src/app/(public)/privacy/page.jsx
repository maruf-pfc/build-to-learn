import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Build To Learn",
  description: "Our commitment to protecting your privacy.",
};

export default function PrivacyPolicy() {
  return (
    <Section className="py-12 md:py-16">
      <Container className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 pb-4 border-b">
          Privacy Policy
        </h1>

        <Card className="shadow-sm">
          <CardContent className="p-8 md:p-12 space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Shield className="text-primary h-6 w-6" /> Data Collection
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly to us, such as when
                you create or modify your account, request on-demand services,
                contact customer support, or otherwise communicate with us. This
                information may include: name, email, phone number, postal
                address, profile picture, payment method, and other information you
                choose to provide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Eye className="text-primary h-6 w-6" /> How We Use Your Data
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide, maintain, and improve our Services.</li>
                <li>Process payments and send receipts.</li>
                <li>
                  Send technical notices, updates, security alerts, and support
                  messages.
                </li>
                <li>
                  Respond to comments, questions, and provide customer service.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Lock className="text-primary h-6 w-6" /> Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We take reasonable measures to help protect information about you
                from loss, theft, misuse and unauthorized access, disclosure,
                alteration and destruction. We use HTTPs encryption and secure
                database storage protocols.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies to collect information about your activity,
                browser, and device. This helps us remember your preferences and
                improve your experience.
              </p>
            </section>

            <p className="text-sm text-muted-foreground pt-8 border-t">
              Last Updated: December 2025
            </p>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}

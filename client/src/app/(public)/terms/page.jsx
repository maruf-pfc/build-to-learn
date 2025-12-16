import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Gavel, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service - Build To Learn",
  description: "Terms and conditions for using our platform.",
};

export default function TermsOfService() {
  return (
    <Section className="py-12 md:py-16">
      <Container className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 pb-4 border-b">
          Terms of Service
        </h1>

        <Card className="shadow-sm">
          <CardContent className="p-8 md:p-12 space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <FileText className="text-primary h-6 w-6" /> Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using our services, you agree to be bound by these
                Terms of Service. If you do not agree to all of these terms, do
                not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Gavel className="text-primary h-6 w-6" /> User Conduct
              </h2>
              <p className="mb-4 text-muted-foreground">You agree not to use the Services to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Violate any local, state, national, or international law or
                  regulation.
                </li>
                <li>
                  Transmit any material that is abusive, harassing, defamatory, 
                  vulgar, or invasive of another's privacy.
                </li>
                <li>
                  Transmit any unsolicited or unauthorized advertising,
                  promotional materials, junk mail, spam, or chain letters.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <AlertCircle className="text-primary h-6 w-6" /> Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to terminate or suspend your account and
                access to the Services at our sole discretion, without notice, for
                conduct that we believe violates these Terms or is harmful to
                other users of the Services, us, or third parties, or for any
                other reason.
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

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const metadata = {
  title: "Contact Us - Build To Learn",
  description: "Get in touch with our team for support or inquiries.",
};

export default function Contact() {
  return (
    <Section className="py-12 md:py-20">
      <Container className="max-w-6xl">
        <div className="grid md:grid-cols-2 gap-0 bg-card rounded-2xl shadow-xl overflow-hidden border">
          {/* Contact Info */}
          <div className="bg-primary p-8 md:p-12 text-primary-foreground flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Get in touch</h1>
              <p className="text-primary-foreground/80 text-lg mb-12">
                We'd love to hear from you. Our friendly team is always here to
                chat.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="text-primary-foreground h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Chat to us</h3>
                    <p className="text-primary-foreground/70 text-sm mb-1">
                      Our friendly team is here to help.
                    </p>
                    <p className="font-medium">support@buildtolearn.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="text-primary-foreground h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Visit us</h3>
                    <p className="text-primary-foreground/70 text-sm mb-1">
                      Come say hello at our office HQ.
                    </p>
                    <p className="font-medium">
                      100 Learning Way, EdTech City, CA 90210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="text-primary-foreground h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Call us</h3>
                    <p className="text-primary-foreground/70 text-sm mb-1">
                      Mon-Fri from 8am to 5pm.
                    </p>
                    <p className="font-medium">+1 (555) 000-0000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4 text-primary-foreground/60">
              {/* Social Icons could go here */}
            </div>
          </div>

          {/* Form */}
          <div className="p-8 md:p-12 bg-card">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="First name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Last name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@company.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Leave us a message..."
                  className="min-h-[150px]"
                />
              </div>

              <Button size="lg" className="w-full text-lg h-12 font-semibold">
                Send Message <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}

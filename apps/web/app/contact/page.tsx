import { PageHeader } from "@/components/page-header";
import { ContentSection } from "@/components/content-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageSquare, Users } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    contact: "hello@buildtolearn.com",
    action: "Send Email",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our support team",
    contact: "Available 9 AM - 6 PM EST",
    action: "Start Chat",
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Connect with other learners",
    contact: "Join the discussion",
    action: "Visit Forum",
  },
];

const offices = [
  {
    city: "San Francisco",
    address: "123 Tech Street, Suite 100",
    zipcode: "San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
  },
  {
    city: "New York",
    address: "456 Innovation Ave, Floor 15",
    zipcode: "New York, NY 10001",
    phone: "+1 (555) 987-6543",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        title="Contact Us"
        description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <ContentSection className="bg-white">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                  <method.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-3">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <p className="text-blue-600 font-medium mb-6">
                  {method.contact}
                </p>
                <Button className="w-full">{method.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-6">
              Send us a Message
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="course">Course Question</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Office Information */}
          <div>
            <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-6">
              Our Offices
            </h2>
            <div className="space-y-6">
              {offices.map((office, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-4">
                      {office.city}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-gray-600">{office.address}</p>
                          <p className="text-gray-600">{office.zipcode}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-600">{office.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 border-0 shadow-sm bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-poppins font-semibold text-lg text-gray-900">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContentSection>

      {/* FAQ Section */}
      <ContentSection className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Quick answers to common questions
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              question: "Are all courses really free?",
              answer:
                "Yes! All our courses are completely free. We believe quality education should be accessible to everyone.",
            },
            {
              question: "Do I need any prior experience?",
              answer:
                "Our courses are designed for all skill levels. We have beginner-friendly courses that start from the basics.",
            },
            {
              question: "How long does it take to complete a course?",
              answer:
                "Course duration varies from 6-16 weeks depending on the topic. You can learn at your own pace.",
            },
            {
              question: "Do I get a certificate upon completion?",
              answer:
                "Yes, you'll receive a certificate of completion that you can add to your portfolio and LinkedIn profile.",
            },
          ].map((faq, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>
    </main>
  );
}

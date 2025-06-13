import { PageHeader } from "@/components/page-header";
import { ContentSection } from "@/components/content-section";
import { FeatureGrid } from "@/components/feature-grid";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Heart,
  Zap,
  Coffee,
} from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description:
      "Comprehensive health insurance, mental health support, and wellness programs",
  },
  {
    icon: Zap,
    title: "Flexible Work",
    description:
      "Remote-first culture with flexible hours and unlimited PTO policy",
  },
  {
    icon: Users,
    title: "Learning Budget",
    description:
      "$2,000 annual learning budget for courses, conferences, and books",
  },
  {
    icon: Coffee,
    title: "Great Perks",
    description:
      "Free meals, gym membership, and top-tier equipment for all team members",
  },
];

const openings = [
  {
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    salary: "$120k - $160k",
    description:
      "Join our engineering team to build the next generation of our learning platform using React, Node.js, and modern web technologies.",
    requirements: [
      "5+ years of full-stack development",
      "Experience with React and Node.js",
      "Strong problem-solving skills",
    ],
  },
  {
    title: "Curriculum Designer",
    department: "Education",
    location: "Remote / New York",
    type: "Full-time",
    salary: "$80k - $110k",
    description:
      "Design and develop engaging, project-based courses that help students master real-world skills.",
    requirements: [
      "Experience in instructional design",
      "Background in tech education",
      "Strong communication skills",
    ],
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $140k",
    description:
      "Help us scale our infrastructure and improve our deployment processes to serve millions of learners.",
    requirements: [
      "Experience with AWS/GCP",
      "Knowledge of Docker and Kubernetes",
      "CI/CD pipeline experience",
    ],
  },
  {
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "San Francisco",
    type: "Full-time",
    salary: "$90k - $120k",
    description:
      "Drive product marketing strategy and help us reach more learners around the world.",
    requirements: [
      "3+ years in product marketing",
      "Experience in EdTech",
      "Data-driven mindset",
    ],
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote / New York",
    type: "Full-time",
    salary: "$85k - $115k",
    description:
      "Create beautiful, intuitive user experiences that make learning engaging and accessible.",
    requirements: [
      "Strong portfolio in web design",
      "Experience with Figma",
      "User research experience",
    ],
  },
  {
    title: "Community Manager",
    department: "Community",
    location: "Remote",
    type: "Full-time",
    salary: "$60k - $80k",
    description:
      "Build and nurture our learning community, helping students succeed in their coding journey.",
    requirements: [
      "Community management experience",
      "Passion for education",
      "Excellent communication skills",
    ],
  },
];

export default function CareersPage() {
  return (
    <main>
      <PageHeader
        title="Join Our Mission"
        description="Help us make quality tech education free and accessible to everyone. Build the future of learning with us."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      {/* Mission Section */}
      <ContentSection className="bg-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-6">
              Why Work With Us?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At Build to Learn, we're not just building a product – we're
              democratizing education and changing lives. Every day, our work
              helps thousands of people around the world learn new skills and
              advance their careers.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We're a remote-first company that values diversity, creativity,
              and continuous learning. Our team is passionate about education,
              technology, and making a positive impact on the world.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join us in our mission to make quality tech education accessible
              to everyone, everywhere.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
              alt="Team working together"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </ContentSection>

      {/* Benefits Section */}
      <ContentSection className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Benefits & Perks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We take care of our team so they can focus on what they do best
          </p>
        </div>
        <FeatureGrid features={benefits} columns={4} />
      </ContentSection>

      {/* Open Positions */}
      <ContentSection className="bg-white">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Open Positions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your next opportunity and help us build the future of education
          </p>
        </div>

        <div className="space-y-6">
          {openings.map((job, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="font-poppins font-semibold text-xl text-gray-900">
                        {job.title}
                      </h3>
                      <Badge variant="outline">{job.department}</Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Key Requirements:
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <Button size="lg">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* Culture Section */}
      <ContentSection className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Our Culture
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            What it's like to work at Build to Learn
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Remote-First",
              description:
                "Work from anywhere in the world. We've been remote since day one and have perfected async collaboration.",
              image:
                "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
            },
            {
              title: "Learning Culture",
              description:
                "Continuous learning is in our DNA. We encourage experimentation and provide resources for growth.",
              image:
                "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
            },
            {
              title: "Impact-Driven",
              description:
                "Every feature we build, every course we create has a direct impact on thousands of learners worldwide.",
              image:
                "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
            },
          ].map((culture, index) => (
            <Card key={index} className="border-0 shadow-lg overflow-hidden">
              <img
                src={culture.image || "/placeholder.svg"}
                alt={culture.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-3">
                  {culture.title}
                </h3>
                <p className="text-gray-600">{culture.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* CTA Section */}
      <ContentSection className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-poppins font-bold text-3xl mb-6">
            Don't See the Right Role?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            We're always looking for talented people who share our mission. Send
            us your resume and tell us how you'd like to contribute.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Send Us Your Resume
          </Button>
        </div>
      </ContentSection>
    </main>
  );
}

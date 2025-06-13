import { PageHeader } from "@/components/page-header";
import { ContentSection } from "@/components/content-section";
import { FeatureGrid } from "@/components/feature-grid";
import { StatsGrid } from "@/components/stats-grid";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Award, Lightbulb, Heart, Globe } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Focus on Practical Skills",
    description:
      "We believe in learning by doing. Every course is designed around real-world projects that build your portfolio.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description:
      "Our platform thrives on collaboration, peer support, and shared learning experiences.",
  },
  {
    icon: Award,
    title: "Quality Education",
    description:
      "All courses are created by industry experts and continuously updated to reflect current best practices.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We constantly evolve our teaching methods to provide the most effective learning experience.",
  },
  {
    icon: Heart,
    title: "Student Success",
    description:
      "Your success is our success. We're committed to helping every student achieve their goals.",
  },
  {
    icon: Globe,
    title: "Accessible to All",
    description:
      "Quality education should be free and accessible to everyone, regardless of background or location.",
  },
];

const stats = [
  {
    value: "50,000+",
    label: "Students Worldwide",
    description: "Active learners",
  },
  { value: "100+", label: "Free Courses", description: "Project-based" },
  { value: "95%", label: "Completion Rate", description: "Industry leading" },
  {
    value: "4.9/5",
    label: "Average Rating",
    description: "Student satisfaction",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Former Google engineer with 10+ years in tech education. Passionate about making quality education accessible to all.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Mike Chen",
    role: "Head of Curriculum",
    bio: "Full-stack developer and educator with expertise in modern web technologies and project-based learning.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Alex Rodriguez",
    role: "Lead Instructor",
    bio: "JavaScript expert and former bootcamp instructor. Specializes in making complex concepts simple and engaging.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Emma Wilson",
    role: "Community Manager",
    bio: "Dedicated to building supportive learning communities and helping students succeed in their coding journey.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        title="About Build to Learn"
        description="We're on a mission to make quality tech education free and accessible to everyone through hands-on, project-based learning."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Mission Section */}
      <ContentSection className="bg-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At Build to Learn, we believe that everyone deserves access to
              quality tech education. Our mission is to democratize learning by
              providing free, project-based courses that teach real-world
              skills.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We focus on practical, hands-on learning because we know that the
              best way to master technology is by building real projects. Our
              "one course at a time" approach ensures deep learning and better
              retention.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Since our founding in 2020, we've helped over 50,000 students
              worldwide launch their tech careers, all without charging a single
              penny for our core educational content.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
              alt="Team collaboration"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </ContentSection>

      {/* Stats Section */}
      <ContentSection className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Our Impact
          </h2>
          <p className="text-xl text-gray-600">
            Numbers that reflect our commitment to accessible education
          </p>
        </div>
        <StatsGrid stats={stats} />
      </ContentSection>

      {/* Values Section */}
      <ContentSection className="bg-white">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Our Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These core principles guide everything we do and shape how we build
            our learning platform
          </p>
        </div>
        <FeatureGrid features={values} columns={3} />
      </ContentSection>

      {/* Team Section */}
      <ContentSection className="bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate educators and technologists dedicated to your learning
            success
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-8">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* Story Section */}
      <ContentSection className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-8">
            Our Story
          </h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              Build to Learn was born from a simple observation: traditional
              tech education was too expensive, too theoretical, and often
              disconnected from real-world applications. Our founder, Sarah
              Johnson, experienced this firsthand while transitioning from a
              non-tech background to becoming a software engineer at Google.
            </p>
            <p className="mb-6">
              After years of mentoring aspiring developers and seeing the same
              struggles repeatedly, Sarah decided to create the learning
              platform she wished had existed during her own journey. The vision
              was clear: free, practical, project-based courses that teach
              skills employers actually need.
            </p>
            <p>
              Today, Build to Learn continues to evolve based on student
              feedback and industry needs, but our core mission remains
              unchanged: making quality tech education accessible to everyone,
              everywhere.
            </p>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

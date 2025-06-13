import { Target, Video, FileText, Headphones, Award, Zap } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Project-Based Learning",
    description:
      "Learn by building real projects that you can showcase in your portfolio",
  },
  {
    icon: Zap,
    title: "One Course at a Time",
    description:
      "Focus on mastering one skill completely before moving to the next",
  },
  {
    icon: Video,
    title: "Interactive Examples",
    description:
      "Follow along with video tutorials and interactive code examples",
  },
  {
    icon: FileText,
    title: "Comprehensive Documentation",
    description: "Access detailed written guides and reference materials",
  },
  {
    icon: Headphones,
    title: "Premium Support",
    description: "Get 1:1 help from instructors when you need it most",
  },
  {
    icon: Award,
    title: "Industry Certificates",
    description:
      "Earn recognized certificates upon successful course completion",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900">
            Why Choose Build to Learn?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience a learning platform designed for real-world success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-7 h-7 text-blue-600" />
              </div>

              <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-3">
                {benefit.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

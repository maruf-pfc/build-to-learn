import { BookOpen, Code, Trophy, Users } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    title: "Enroll & Focus",
    description:
      "Choose one course and commit to completing it. Our focused approach ensures better learning outcomes.",
  },
  {
    icon: Code,
    title: "Learn by Doing",
    description:
      "Follow along with video tutorials, read comprehensive docs, and practice with hands-on labs.",
  },
  {
    icon: Trophy,
    title: "Build Real Projects",
    description:
      "Apply your knowledge by building actual projects that you can showcase in your portfolio.",
  },
  {
    icon: Users,
    title: "Get Certified & Supported",
    description:
      "Earn certificates upon completion and get premium support when you need help.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven methodology helps you master skills faster through
            focused, project-based learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Step Number */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-blue-600" />
              </div>

              {/* Content */}
              <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-200 to-purple-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jessica Martinez",
    role: "Frontend Developer at TechCorp",
    avatar: "https://avatars.githubusercontent.com/u/182491592?v=4",
    content:
      "Build to Learn completely changed how I approach learning. The project-based approach helped me land my dream job as a frontend developer. The one-course-at-a-time focus was exactly what I needed.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Full-Stack Developer",
    avatar: "https://avatars.githubusercontent.com/u/182491592?v=4",
    content:
      "I've tried many online platforms, but none compare to Build to Learn. The combination of videos, documentation, and hands-on projects creates the perfect learning environment. Highly recommended!",
    rating: 5,
  },
  {
    name: "Rachel Thompson",
    role: "Career Changer",
    avatar: "https://avatars.githubusercontent.com/u/182491592?v=4",
    content:
      "As someone transitioning from marketing to tech, Build to Learn made the journey manageable. The structured approach and real projects gave me the confidence to make the career switch successfully.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful learners who have transformed their
            careers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Rating */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-700 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-poppins font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

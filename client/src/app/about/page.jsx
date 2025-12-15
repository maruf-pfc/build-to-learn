import Footer from "@/components/layout/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero */}
      <div className="bg-slate-900 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">About Us</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          We are on a mission to democratize education and make high-quality
          learning accessible to everyone, everywhere.
        </p>
      </div>

      <main className="flex-grow container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Our Story
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Founded in 2025, LMS Platform started with a simple idea: that
              everyone should have the opportunity to learn from the best. What
              began as a small project has grew into a global community of
              learners and instructors.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Today, we host thousands of courses across technology, business,
              arts, and sciences, reaching students in over 100 countries.
            </p>
          </div>
          <div className="bg-gray-200 rounded-2xl h-[400px] w-full object-cover relative overflow-hidden">
            {/* Placeholder image in absence of real assets */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold text-xl">
              Team / Office Image
            </div>
          </div>
        </div>

        <div className="text-center mb-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Accessibility",
                desc: "Education should be available to all, regardless of location or background.",
              },
              {
                title: "Quality",
                desc: "We curate content from top industry experts and academic institutions.",
              },
              {
                title: "Community",
                desc: "Learning is more effective when done together. We foster collaboration.",
              },
            ].map((val, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-xl">
                <h3 className="font-bold text-xl mb-4 text-slate-900">
                  {val.title}
                </h3>
                <p className="text-slate-600">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Contact Info */}
          <div className="bg-blue-900 p-12 text-white flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-6">Get in touch</h1>
              <p className="text-blue-200 text-lg mb-12">
                We'd love to hear from you. Our friendly team is always here to
                chat.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center">
                    <Mail className="text-blue-300" />
                  </div>
                  <div>
                    <p className="font-bold">Chat to us</p>
                    <p className="text-blue-200">
                      Our friendly team is here to help.
                    </p>
                    <p className="font-medium text-white">
                      support@lmsplatform.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center">
                    <MapPin className="text-blue-300" />
                  </div>
                  <div>
                    <p className="font-bold">Visit us</p>
                    <p className="text-blue-200">
                      Come say hello at our office HQ.
                    </p>
                    <p className="font-medium text-white">
                      100 Smith Street, Collingwood VIC 3066 AU
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center">
                    <Phone className="text-blue-300" />
                  </div>
                  <div>
                    <p className="font-bold">Call us</p>
                    <p className="text-blue-200">Mon-Fri from 8am to 5pm.</p>
                    <p className="font-medium text-white">+1 (555) 000-0000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4 text-blue-300">
              {/* Social Icons could go here */}
            </div>
          </div>

          {/* Form */}
          <div className="p-12">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    First Name
                  </label>
                  <input
                    className="w-full border p-3 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 ring-blue-500 outline-none"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    className="w-full border p-3 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 ring-blue-500 outline-none"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  className="w-full border p-3 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 ring-blue-500 outline-none"
                  placeholder="you@company.com"
                  type="email"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full border p-3 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 ring-blue-500 outline-none"
                  rows={4}
                  placeholder="Leave us a message..."
                />
              </div>

              <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

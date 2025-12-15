import Footer from "@/components/layout/Footer";
import { Shield, Lock, Eye } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 border-b pb-4">
          Privacy Policy
        </h1>

        <div className="bg-white p-8 rounded-xl shadow-sm space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Shield className="text-blue-600" /> Data Collection
            </h2>
            <p>
              We collect information you provide directly to us, such as when
              you create or modify your account, request on-demand services,
              contact customer support, or otherwise communicate with us. This
              information may include: name, email, phone number, postal
              address, profile picture, payment method, items requested (for
              delivery services), delivery notes, and other information you
              choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Eye className="text-blue-600" /> How We Use Your Data
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our Services.</li>
              <li>Process payments and send receipts.</li>
              <li>
                Send technical notices, updates, security alerts, and support
                messages.
              </li>
              <li>
                Respond to comments, questions, and provide customer service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Lock className="text-blue-600" /> Data Security
            </h2>
            <p>
              We take reasonable measures to help protect information about you
              from loss, theft, misuse and unauthorized access, disclosure,
              alteration and destruction. We use HTTPs encryption and secure
              database storage protocols.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Cookies</h2>
            <p>
              We use cookies to collect information about your activity,
              browser, and device. This helps us remember your preferences and
              improve your experience.
            </p>
          </section>

          <p className="text-sm text-slate-500 pt-8 border-t">
            Last Updated: December 2025
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Footer from "@/components/layout/Footer";
import { FileText, Gavel, AlertCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 border-b pb-4">
          Terms of Service
        </h1>

        <div className="bg-white p-8 rounded-xl shadow-sm space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="text-blue-600" /> Acceptance of Terms
            </h2>
            <p>
              By accessing or using our services, you agree to be bound by these
              Terms of Service. If you do not agree to all of these terms, do
              not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Gavel className="text-blue-600" /> User Conduct
            </h2>
            <p className="mb-4">You agree not to use the Services to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Violate any local, state, national, or international law or
                regulation.
              </li>
              <li>
                Transmit any material that is abusive, harassing, tortious,
                defamatory, vulgar, pornographic, libelous, invasive of
                another's privacy, hateful, or racially, ethnically, or
                otherwise objectionable.
              </li>
              <li>
                Transmit any unsolicited or unauthorized advertising,
                promotional materials, junk mail, spam, chain letters, pyramid
                schemes, or any other form of solicitation.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <AlertCircle className="text-blue-600" /> Termination
            </h2>
            <p>
              We reserve the right to terminate or suspend your account and
              access to the Services at our sole discretion, without notice, for
              conduct that we believe violates these Terms or is harmful to
              other users of the Services, us, or third parties, or for any
              other reason.
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

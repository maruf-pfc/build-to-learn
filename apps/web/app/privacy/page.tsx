import { PageHeader } from "@/components/page-header";
import { ContentSection } from "@/components/content-section";

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader
        title="Privacy Policy"
        description="Learn how we collect, use, and protect your personal information when you use Build to Learn."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <ContentSection className="bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> January 15, 2024
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when
                you create an account, enroll in courses, participate in our
                community forum, or contact us for support.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Account information (name, email address, password)</li>
                <li>
                  Profile information (bio, profile picture, learning
                  preferences)
                </li>
                <li>Course progress and completion data</li>
                <li>Community forum posts and comments</li>
                <li>Support communications</li>
              </ul>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect to provide, maintain, and
                improve our services:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide access to courses and learning materials</li>
                <li>Track your learning progress and issue certificates</li>
                <li>Facilitate community interactions and support</li>
                <li>Send important updates about our services</li>
                <li>Improve our platform based on usage patterns</li>
                <li>Prevent fraud and ensure platform security</li>
              </ul>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                3. Information Sharing
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties, except in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>
                  With service providers who assist in platform operations
                  (under strict confidentiality agreements)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. This includes
                encryption of sensitive data, regular security audits, and
                access controls.
              </p>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                5. Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access and review your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your account and associated data</li>
                <li>Export your data in a portable format</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar technologies to enhance your
                experience, analyze usage patterns, and provide personalized
                content. You can control cookie settings through your browser
                preferences.
              </p>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                7. Children's Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our services are not intended for children under 13 years of
                age. We do not knowingly collect personal information from
                children under 13. If we become aware of such collection, we
                will delete the information immediately.
              </p>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                8. Changes to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this privacy policy from time to time. We will
                notify you of any material changes by posting the new policy on
                this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                9. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this privacy policy or our data
                practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@buildtolearn.com
                  <br />
                  <strong>Address:</strong> 123 Tech Street, Suite 100, San
                  Francisco, CA 94105
                  <br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

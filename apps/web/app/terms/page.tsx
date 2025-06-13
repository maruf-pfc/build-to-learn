import { PageHeader } from "@/components/page-header";
import { ContentSection } from "@/components/content-section";

export default function TermsPage() {
  return (
    <main>
      <PageHeader
        title="Terms of Service"
        description="Please read these terms carefully before using Build to Learn. By using our service, you agree to these terms."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" },
        ]}
      />

      <ContentSection className="bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> January 15, 2024
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Build to Learn ("the Service"), you
                accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do
                not use this service.
              </p>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Build to Learn provides online educational content and courses
                focused on technology and programming. Our services include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access to free online courses and learning materials</li>
                <li>Interactive coding exercises and projects</li>
                <li>Community forum for learner interaction</li>
                <li>Progress tracking and certificates of completion</li>
                <li>Educational resources and documentation</li>
              </ul>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                3. User Accounts
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To access certain features of the Service, you must create an
                account. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  Provide accurate and complete information when creating your
                  account
                </li>
                <li>Maintain the security of your password and account</li>
                <li>
                  Notify us immediately of any unauthorized use of your account
                </li>
                <li>
                  Accept responsibility for all activities that occur under your
                  account
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                4. Acceptable Use
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree to use the Service only for lawful purposes and in
                accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Upload or share malicious content or code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>
                  Use the Service for commercial purposes without permission
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Service and its original content, features, and
                functionality are owned by Build to Learn and are protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property laws.
              </p>
              <p className="text-gray-600 leading-relaxed">
                You may access and use the educational content for personal,
                non-commercial learning purposes. You may not reproduce,
                distribute, modify, or create derivative works without our
                express written permission.
              </p>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                6. User-Generated Content
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You retain ownership of content you create and share on the
                Service (such as forum posts, project submissions). However, by
                sharing content, you grant us a non-exclusive, royalty-free
                license to use, display, and distribute your content in
                connection with the Service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                You are responsible for ensuring that your content does not
                violate any laws or infringe on the rights of others.
              </p>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                7. Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is important to us. Please review our Privacy
                Policy, which also governs your use of the Service, to
                understand our practices regarding the collection and use of
                your information.
              </p>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                8. Disclaimers
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Service is provided "as is" and "as available" without any
                warranties of any kind. We do not guarantee that:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>The Service will be uninterrupted or error-free</li>
                <li>The content will be accurate or up-to-date</li>
                <li>
                  Your use of the Service will meet your specific requirements
                </li>
                <li>Any defects in the Service will be corrected</li>
              </ul>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                In no event shall Build to Learn be liable for any indirect,
                incidental, special, consequential, or punitive damages,
                including without limitation, loss of profits, data, use,
                goodwill, or other intangible losses, resulting from your use of
                the Service.
              </p>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                10. Termination
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may terminate or suspend your account and access to the
                Service immediately, without prior notice, for conduct that we
                believe violates these Terms or is harmful to other users, us,
                or third parties.
              </p>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will
                notify users of any material changes by posting the new Terms on
                this page and updating the "Last updated" date. Your continued
                use of the Service after such modifications constitutes
                acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                12. Contact Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@buildtolearn.com
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

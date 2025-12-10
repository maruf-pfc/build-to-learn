"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white text-[var(--color-text)] border-t border-gray-200">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          
          {/* =============================
              Brand Section
          ============================= */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.png"
              alt="Build to Learn"
              width={120}
              height={50}
              className="h-[55px] w-auto mb-4 object-contain"
            />

            <p className="text-sm text-gray-600 leading-relaxed">
              Build to Learn — a modern LMS empowering educators and students
              to achieve more through structured learning experiences.
            </p>
          </div>

          {/* =============================
              Footer Columns
          ============================= */}
          <FooterColumn
            title="Support"
            items={["Education", "Enroll Course", "Orders", "Payments", "Blogs"]}
          />

          <FooterColumn
            title="About"
            items={["Categories", "Courses", "About Us", "Contacts", "FAQ"]}
          />

          <FooterColumn
            title="Useful Links"
            items={[
              "Our Values",
              "Advisory Board",
              "Partners",
              "Become a Partner",
              "Careers",
            ]}
          />

          {/* =============================
              Newsletter
          ============================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">
              Subscribe Newsletter
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              Stay updated with new courses & announcements.
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
              />
              <button className="px-6 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* =============================
            Copyright Section
        ============================= */}
        <div className="border-t border-gray-200 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Build to Learn. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-[var(--color-primary)]">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-[var(--color-primary)]">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===========================================
   Reusable Footer Column Component
=========================================== */
const FooterColumn = ({ title, items }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">
        {title}
      </h3>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="block text-gray-600 text-sm hover:text-[var(--color-primary)]"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

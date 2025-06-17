import Link from "next/link";
import { Facebook, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-poppins font-bold text-xl">
                Build to Learn
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Master real-world skills through project-based learning. Focus on
              one course at a time for maximum impact.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/maruf-pfc/build-to-learn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=frontend"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Frontend Development
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=backend"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Backend Development
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=fullstack"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Full-Stack Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/forum"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Community Forum
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  System Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {currentYear} Build to Learn. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

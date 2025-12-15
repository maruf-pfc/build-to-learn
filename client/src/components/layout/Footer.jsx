import Link from "next/link";
import { BookOpen, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Build 2 Learn</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            A modern learning platform built for focused learning, real skills,
            and verified progress.
          </p>
          <div className="flex gap-4 pt-2">
            <SocialIcon Icon={Twitter} />
            <SocialIcon Icon={Github} />
            <SocialIcon Icon={Linkedin} />
          </div>
        </div>

        {/* Platform */}
        <FooterGroup title="Platform">
          <FooterLink href="/courses">Courses</FooterLink>
          <FooterLink href="/forum">Forum</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <div className="flex items-center gap-2">
            <FooterLink href="/cv-generator">CV Builder</FooterLink>
            <span className="bg-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              New
            </span>
          </div>
          <FooterLink href="/become-instructor">Become Instructor</FooterLink>
        </FooterGroup>

        {/* Support */}
        <FooterGroup title="Support">
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/community">Community</FooterLink>
          <FooterLink href="/help">Help Center</FooterLink>
        </FooterGroup>

        {/* Legal */}
        <FooterGroup title="Legal">
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
          <FooterLink href="/careers">Careers</FooterLink>
          <FooterLink href="/about">About</FooterLink>
        </FooterGroup>
      </div>

      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} LMS Platform. All rights reserved.
      </div>
    </footer>
  );
}

/* ================= Helpers ================= */

function FooterGroup({ title, children }) {
  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ Icon }) {
  return (
    <a
      href="#"
      className="text-muted-foreground hover:text-primary transition-colors"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

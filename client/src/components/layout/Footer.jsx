import Link from "next/link";
import { 
  BookOpen, 
  Github, 
  Twitter, 
  Linkedin, 
  Heart,
  ArrowRight 
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="p-1.5 bg-primary rounded-md text-primary-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <span>Build<span className="text-primary">2</span>Learn</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Empowering learners worldwide with cutting-edge skills. 
              Join our community and start building your future today.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialLink href="#" icon={Github} label="GitHub" />
              <SocialLink href="#" icon={Twitter} label="Twitter" />
              <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <FooterLink href="/courses">All Courses</FooterLink>
              <FooterLink href="/learning-paths">Learning Paths</FooterLink>
              <FooterLink href="/instructors">Instructors</FooterLink>
              <FooterLink href="/pricing">Pricing Plans</FooterLink>
              <FooterLink href="/community">Community</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Support</h3>
            <ul className="space-y-2.5 text-sm">
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest updates, new courses, and learning tips directly to your inbox.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-background border-input" 
              />
              <Button size="icon" className="shrink-0">
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Build To Learn. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by 
            <a href="#" className="hover:text-foreground transition-colors">Maruf</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block"
      >
        {children}
      </Link>
    </li>
  );
}

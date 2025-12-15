"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import {
  User,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [role, setRole] = useState(null); // 'student' | 'instructor'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuthStore();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await register({ ...formData, role });
      router.push("/dashboard"); // Redirect to dashboard after success
    } catch (err) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
        <div className="max-w-4xl w-full space-y-8 text-center">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Join as a...
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your path to get started
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Card
              onClick={() => setRole("student")}
              className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
            >
              <CardContent className="p-8 flex flex-col items-center">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen size={48} />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Student</h3>
                <p className="text-muted-foreground mt-2">
                  I want to learn and enroll in courses
                </p>
              </CardContent>
            </Card>

            <Card
              onClick={() => setRole("instructor")}
              className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
            >
              <CardContent className="p-8 flex flex-col items-center">
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900/20 rounded-full text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap size={48} />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Instructor
                </h3>
                <p className="text-muted-foreground mt-2">
                  I want to teach and create content
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="max-w-md w-full shadow-xl border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-base mt-2">
            Signing up as{" "}
            <span className="font-semibold text-primary capitalize">
              {role}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm text-center mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full mt-4">
              {isLoading ? "Creating Account..." : "Get Started"}
              {!isLoading && <ArrowRight size={18} className="ml-2" />}
            </Button>
          </form>

          <div className="text-center text-sm mt-6">
            <Button
              variant="link"
              onClick={() => setRole(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              Change Role
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

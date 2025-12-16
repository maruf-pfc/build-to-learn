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
  CheckCircle,
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
} from "@/components/ui/card";

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
      router.push("/dashboard");
    } catch (err) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4">
        <div className="max-w-5xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Join{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Build To Learn
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your path and start your journey towards mastering new skills
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {/* Student Card */}
            <Card
              onClick={() => setRole("student")}
              interactive
              className="cursor-pointer border-2 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <BookOpen size={56} className="text-blue-600" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">I'm a Student</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Enroll in courses, learn at your own pace, and earn verified certificates
                  </p>
                </div>
                <div className="space-y-2 w-full text-left">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span>Access to all courses</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span>Track your progress</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span>Earn certificates</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Continue as Student
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Instructor Card */}
            <Card
              onClick={() => setRole("instructor")}
              interactive
              className="cursor-pointer border-2 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
              <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={56} className="text-purple-600" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">
                    I'm an Instructor
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Create courses, share your knowledge, and inspire learners worldwide
                  </p>
                </div>
                <div className="space-y-2 w-full text-left">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={16} className="text-purple-600" />
                    <span>Create unlimited courses</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={16} className="text-purple-600" />
                    <span>Manage your students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={16} className="text-purple-600" />
                    <span>Track engagement</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Continue as Instructor
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center pt-6">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4">
      <Card className="max-w-md w-full shadow-2xl border-border/50">
        <CardHeader className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mx-auto">
            <User size={28} />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-base mt-2">
              Signing up as{" "}
              <span className="font-semibold text-primary capitalize">
                {role}
              </span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg text-sm mb-6 flex items-start gap-2">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="h-11"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-11 text-base mt-6"
              loading={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Creating account...
                </>
              ) : (
                <>
                  Get Started
                  <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <Button
              variant="ghost"
              onClick={() => setRole(null)}
              className="w-full text-muted-foreground hover:text-foreground"
            >
              ← Change Role
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

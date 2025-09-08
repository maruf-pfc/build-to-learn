"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon, Loader } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import React, { useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

const LoginPage = () => {
  const [googlePending, startGoogleTransition] = useTransition();
  const [githubPending, startGithubTransition] = useTransition();

  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Sign in with Google successful"),
              toast.info("Redirecting to the home page");
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }
  async function signInWithGitHub() {
    startGithubTransition(async () => {
      await signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Sign in with GitHub successful"),
              toast.info("Redirecting to the home page");
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>
          Login with your GitHub or Gmail Account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          className="w-full cursor-pointer"
          variant={"outline"}
          onClick={signInWithGoogle}
          disabled={googlePending}
        >
          {googlePending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <FcGoogle className="size-4" />
              <span>Sign in with Google</span>
            </>
          )}
        </Button>
        <Button
          className="w-full cursor-pointer"
          variant={"outline"}
          onClick={signInWithGitHub}
          disabled={githubPending}
        >
          {githubPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              <span>Sign in with GitHub</span>
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="user@example.com" />
          </div>
          <Button>Continue with Email</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;

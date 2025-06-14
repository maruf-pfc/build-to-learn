"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 p-2">
            <Image
              src="/logo-main.png"
              alt="Build to Learn Logo"
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
            />
            <span className="font-poppins font-bold text-xl text-gray-900">
              Build to Learn
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/courses"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/forum"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Forum
            </Link>
            <Link
              href="/docs"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Docs
            </Link>
          </div>

          {/* User Profile Area */}
          <div className="hidden md:flex items-center space-x-4 ml-12">
            {!isLoggedIn ? (
              <>
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span>John Doe</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Link href="/dashboard">My Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/my-courses">My Courses</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings">Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              <Link
                href="/courses"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Courses
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Blog
              </Link>
              <Link
                href="/forum"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Forum
              </Link>
              <Link
                href="/docs"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Docs
              </Link>
              {!isLoggedIn ? (
                <div className="flex space-x-2 pt-2">
                  <Button variant="ghost" size="sm" asChild className="flex-1">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button size="sm" asChild className="flex-1">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    My Dashboard
                  </Link>
                  <Link
                    href="/my-courses"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    My Courses
                  </Link>
                  <Link
                    href="/settings"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Account Settings
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const { t } = useTranslation();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const pagesDropdownRef = useRef(null);

  // 🚫 Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  // Close menu on path change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const toggleDropdown = (key) =>
    setOpenDropdown(openDropdown === key ? null : key);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const menuLinks = [
    { name: t("home"), href: "/" },
    { name: t("courses"), href: "/courses" },
    { name: t("leaderboard"), href: "/leaderboard" },
    { name: t("instructors"), href: "/instructors" },
    {
      name: t("pages"),
      key: "pages",
      dropdown: [
        { name: t("pricing"), href: "/pricing" },
        { name: t("dashboard"), href: "/dashboard" },
        { name: t("checkout"), href: "/checkout" },
        { name: t("event"), href: "/event" },
        { name: t("shop"), href: "/shop" },
        { name: t("about"), href: "/about" },
        { name: t("contact"), href: "/contact" },
        { name: t("blog"), href: "/blog" },
        { name: t("sponsorship"), href: "/sponsorship" },
        { name: t("terms"), href: "/terms" },
        { name: t("privacy"), href: "/privacy" },
        { name: t("faq"), href: "/faq" },
        { name: "404", href: "/404" },
        { name: t("success"), href: "/success-history" },
      ],
    },
    { name: t("donation"), href: "/donation" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-[100]">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-black"
        >
          <Image src="/logo.png" width={45} height={45} alt="Logo" />
          <span>Build 2 Learn</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuLinks.map((link) =>
            link.dropdown ? (
              <div key={link.key} className="relative" ref={pagesDropdownRef}>
                <button
                  onClick={() => toggleDropdown(link.key)}
                  className={`flex items-center gap-1 font-medium transition ${
                    openDropdown === link.key
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-500"
                  }`}
                >
                  {link.name}
                  <RiArrowDropDownLine
                    className={`text-2xl transition ${
                      openDropdown === link.key ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Desktop Dropdown */}
                <div
                  className={`absolute left-0 mt-3 w-56 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden transition-all ${
                    openDropdown === link.key
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-4 py-2 text-sm transition ${
                        isActive(item.href)
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition pb-1 ${
                  isActive(link.href)
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-500"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex gap-3">
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                {t("login")}
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {t("register")}
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={logout}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                {t("logout")}
              </button>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {t("dashboard")}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-black rounded-lg hover:bg-gray-100"
        >
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* ===========================
          MOBILE FULL SCREEN MENU
      ============================ */}
      <div
        className={`fixed inset-0 z-[200] bg-white transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <Image src="/logo.png" width={55} height={55} alt="Logo" />
          <button onClick={closeMenu} className="p-2">
            <FaTimes size={26} />
          </button>
        </div>

        {/* Scrollable Menu Content */}
        <div className="p-5 overflow-y-auto h-[calc(100vh-80px)] space-y-3">
          {menuLinks.map((link) =>
            link.dropdown ? (
              <div key={link.key} className="border rounded-lg">
                <button
                  onClick={() => toggleDropdown(link.key + "-mobile")}
                  className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-700"
                >
                  {link.name}
                  <RiArrowDropDownLine
                    className={`text-3xl transition ${
                      openDropdown === link.key + "-mobile"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {/* Mobile Dropdown */}
                <div
                  className={`transition-all ${
                    openDropdown === link.key + "-mobile"
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="block py-2 pl-10 pr-4 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
              >
                {link.name}
              </Link>
            )
          )}

          {/* Auth Buttons */}
          <div className="pt-4 space-y-3">
            {!user ? (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block text-center border border-gray-300 text-gray-700 rounded-lg py-3 hover:bg-gray-100"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="block text-center bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"
                >
                  {t("register")}
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={logout}
                  className="block w-full text-center border border-gray-300 text-gray-700 rounded-lg py-3 hover:bg-gray-100"
                >
                  {t("logout")}
                </button>
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="block text-center bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"
                >
                  {t("dashboard")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

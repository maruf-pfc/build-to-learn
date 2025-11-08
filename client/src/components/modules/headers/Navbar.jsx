"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaGlobe, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  // Refs for dropdowns
  const dropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const pagesDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pagesDropdownRef.current &&
        !pagesDropdownRef.current.contains(event.target)
      ) {
        if (openDropdown === "pages") setOpenDropdown(null);
      }
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        if (openDropdown === "language") setOpenDropdown(null);
      }
      if (isMenuOpen && !event.target.closest("nav")) closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen, openDropdown]);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "ms", label: "Malay", flag: "🇲🇾" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpenDropdown(null);
    closeMenu();
  };

  const menuLinks = [
    { name: t("home"), href: "/" },
    { name: t("courses"), href: "/courses" },
    { name: t("leaderboard"), href: "/leaderboard" },
    { name: t("instructors"), href: "/instructors" },
    { name: t("games"), href: "/games" },
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
    <nav className="bg-[var(--color-background)] border-b border-[var(--color-primary)] shadow sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-extrabold text-[var(--color-secondary)] flex flex-row gap-2 items-center"
        >
          <Image src="/logo.png" alt="Logo Image" width={50} height={50} />
          <h2 className="font-semibold">Build 2 Learn</h2>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name} className="relative" ref={pagesDropdownRef}>
                <button
                  onClick={() => toggleDropdown(link.key)}
                  className={`flex items-center gap-1 font-medium transition-all duration-200 ${
                    openDropdown === link.key
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text)] hover:text-[var(--color-secondary-hover)]"
                  }`}
                >
                  {link.name}
                  <RiArrowDropDownLine
                    className={`text-2xl transition-transform duration-200 ${
                      openDropdown === link.key ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute left-0 mt-3 w-52 bg-[var(--color-background)] border border-[var(--color-primary)] rounded-md shadow-lg z-50 transition-all duration-200 transform origin-top ${
                    openDropdown === link.key
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                        isActive(item.href)
                          ? "bg-[var(--color-primary)] text-white"
                          : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                    : "text-[var(--color-text)] hover:text-[var(--color-secondary-hover)]"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {loading ? (
            <div className="animate-pulse text-gray-400 text-sm">...</div>
          ) : !user ? (
            <>
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex items-center justify-center px-4 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-medium text-sm transition-all duration-200"
                title={t("login")}
              >
                {t("login")}
              </Link>
              <Link
                href="/register"
                onClick={closeMenu}
                className="flex items-center justify-center px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-medium shadow-sm transition-all duration-200"
                title={t("register")}
              >
                {t("register")}
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={logout}
                className="flex items-center justify-center px-4 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-medium text-sm transition-all duration-200"
              >
                {t("logout")}
              </button>
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className="flex items-center justify-center px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-medium shadow-sm transition-all duration-200"
                title={t("dashboard")}
              >
                {t("dashboard")}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-[var(--color-secondary)] p-3 transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white rounded-lg active:scale-95"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>

        {/* Mobile Drawer */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible delay-300"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-500 ${
              isMenuOpen ? "opacity-50" : "opacity-0"
            }`}
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <div
            className={`absolute top-0 right-0 h-[1500px] w-[550px] max-w-[85vw] bg-[var(--color-background)] border-l border-[var(--color-primary)] shadow-2xl transform transition-transform duration-500 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-primary)]">
              <Image src="/logo.png" alt="Logo" width={90} height={70} />
              <button onClick={closeMenu} className="text-xl">
                <FaTimes />
              </button>
            </div>

            <div className="h-[700px] overflow-y-auto bg-[#EDFDF5] p-4 pb-24">
              {menuLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.name} className="mb-2">
                    <button
                      onClick={() => toggleDropdown(`${link.key}-mobile`)}
                      className={`flex justify-between items-center w-full py-3 px-4 rounded-lg text-left font-medium ${
                        openDropdown === `${link.key}-mobile`
                          ? "bg-[var(--color-primary)] text-white"
                          : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
                      }`}
                    >
                      {link.name}
                      <RiArrowDropDownLine
                        className={`text-2xl transition-transform duration-200 ${
                          openDropdown === `${link.key}-mobile`
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        openDropdown === `${link.key}-mobile`
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={closeMenu}
                          className="block py-2 pl-8 pr-4 text-sm hover:bg-[var(--color-primary)] hover:text-white rounded-lg"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className={`block py-3 px-4 rounded-lg font-medium ${
                      isActive(link.href)
                        ? "bg-[var(--color-primary)] text-white"
                        : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}

              {/* Auth Buttons in Mobile */}
              <div className="mt-6 flex flex-col gap-3">
                {loading ? (
                  <div className="animate-pulse text-center text-gray-400">
                    Loading...
                  </div>
                ) : !user ? (
                  <>
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="text-center px-4 py-3 rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                    >
                      {t("login")}
                    </Link>
                    <Link
                      href="/register"
                      onClick={closeMenu}
                      className="text-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-3 rounded-lg"
                    >
                      {t("register")}
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={logout}
                      className="text-center px-4 py-3 rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                    >
                      {t("logout")}
                    </button>
                    <Link
                      href="/dashboard"
                      onClick={closeMenu}
                      className="text-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-3 rounded-lg"
                    >
                      {t("dashboard")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

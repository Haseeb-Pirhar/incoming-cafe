"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Flex, Button } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaBarsStaggered } from "react-icons/fa6";
import { useAuthStore } from "@/store/profileStore";
import NavRes from "@/layout/Navres";
import logo from "../../../public/app-logo.png";
import { logout } from "@/api/api-call/auth-api";
import { clearClientAuthCookies } from "@/utils/client-cookies";

function AdminNavbar() {
  const pathname = usePathname();
  const { setUser, setSelectedChannel } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const t = (key: string) => {
    const translations: Record<string, string> = {
      dashboard: "Dashboard",
      products: "Products",
      category: "Category",
      orders: "Orders",
      profile: "Profile",
      logout: "Logout",
    };
    return translations[key] || key;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tabs = [
    { href: "/admin/dashboard", label: t("dashboard") },
    { href: "/admin/markets", label: t("products") },
    { href: "/admin/category", label: t("category") },
    { href: "/admin/order", label: t("orders") },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setSelectedChannel?.(null);
      clearClientAuthCookies();
      router.push("/auth/login");
    }
  };

  return (
    <>
      <div style={{ fontFamily: "'Work Sans', sans-serif" }}>
        {/* Desktop Sidebar */}
        <aside className="sticky top-0 left-0 h-screen bg-[#2F4F3E] border-r border-[#D4A017]/30 shadow-lg hidden! lg:block! md:hidden! transition-all duration-300 z-50 w-64">
          {/* Sidebar Header */}
          <div className="flex items-center justify-center px-4 py-5 border-b border-[#D4A017]/20">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={100}
                className="object-contain w-24"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="mt-6">
            <ul className="flex flex-col gap-1 px-4 max-h-[70vh] overflow-y-auto">
              {tabs.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block rounded-lg px-3 py-2 text-base capitalize transition-colors font-medium ${
                      pathname === href
                        ? "font-semibold bg-[#D4A017] text-[#2F4F3E] shadow-sm"
                        : "text-[#FAF3E3]/80 hover:bg-[#FAF3E3]/10 hover:text-[#FAF3E3]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin/profile"
                  className={`block rounded-lg px-3 py-2 text-base capitalize transition-colors font-medium ${
                    pathname === "/admin/profile"
                      ? "font-semibold bg-[#D4A017] text-[#2F4F3E] shadow-sm"
                      : "text-[#FAF3E3]/80 hover:bg-[#FAF3E3]/10 hover:text-[#FAF3E3]"
                  }`}
                >
                  {t("profile")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Logout at Bottom */}
          <div className="absolute bottom-10 left-0 w-full px-4">
            <Button
              className="text-base! capitalize w-full! cursor-pointer! border-none! px-3 py-5! rounded-lg! font-medium! bg-[#A5432A]! text-[#FAF3E3]! hover:bg-[#A5432A]/85!"
              onClick={() => {
                handleLogout();
              }}
            >
              {t("logout")}
            </Button>
          </div>
        </aside>

        {/* Mobile Header */}
        <header
          className={`fixed top-0 z-50 w-full transition-colors duration-200 lg:hidden! block mb-6 border-b ${
            isScrolled
              ? "bg-[#FAF3E3] border-[#D4A017]/40 shadow-md"
              : "bg-[#FAF3E3] border-[#D4A017]/20 shadow-sm"
          }`}
        >
          <nav className="px-4 py-6 lg:py-5 mx-auto max-w-7xl">
            <Flex justify="between" align="center" px="4">
              {/* Logo */}
              <Box>
                <Link
                  href="/"
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Image
                    src={logo}
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-24 h-auto object-contain"
                  />
                </Link>
              </Box>

              {/* Mobile Nav Trigger */}
              <Box className="block! lg:hidden! md:block! sm:block!">
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-[#2F4F3E]"
                >
                  <FaBarsStaggered size="1.5rem" />
                </button>
              </Box>
            </Flex>
          </nav>
        </header>
        <NavRes
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          tabs={tabs}
          logout={handleLogout}
        />
      </div>
    </>
  );
}

export default AdminNavbar;

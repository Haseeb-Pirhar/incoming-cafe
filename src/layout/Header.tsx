"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Flex } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import appLogo from "../../public/app-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NavRes from "./Navres";
import { FaBarsStaggered } from "react-icons/fa6";
import { useAuthStore } from "@/store/profileStore";
import { useExtraStore } from "@/store/extraStore";
import { getLikes } from "@/api/api-call/products";
import { Likes } from "@/types/recientItem";
import { logout } from "@/api/api-call/auth-api";
import { clearClientAuthCookies } from "@/utils/client-cookies";
import ProfileDropMenu from "@/components/ProfileDropMenu";

function UserNavbar() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, setUser } = useAuthStore();
  const { setLikes } = useExtraStore();
  const router = useRouter();

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
    { href: "/", label: "Home" },
    { href: "#myads", label: "My Ads" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contacts" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      clearClientAuthCookies();
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    if (!user?._id) return;
    const fetchLikes = async () => {
      const userLikes = await getLikes(user?._id);
      if (userLikes?.data) {
        setLikes(userLikes.data as Likes[]);
      }
    };
    fetchLikes();
  }, [user?._id]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full   transition-colors duration-200 ${
          isScrolled
            ? "bg-orange-100 border-gray-400 shadow-md"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav className="px-4 py-6 lg:py-5 ">
          <Flex justify="between" align="center" px="4">
            {/* Logo */}
            <Box>
              <Link
                href="/"
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Image
                  width={100}
                  height={100}
                  src={appLogo}
                  alt="App Logo"
                  className="h-12 w-auto"
                />
              </Link>
            </Box>

            {/* Desktop Nav */}
            <Box className="!hidden lg:!block md:!block">
              <ul>
                <div className="flex justify-between items-center gap-6 lg:!gap-12">
                  {tabs.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`text-lg capitalize font-medium ${
                          pathname.startsWith(href)
                            ? "font-bold text-[#00B0A6]"
                            : "font-normal text-[#F25822]"
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                  <ProfileDropMenu logout={handleLogout} url="user" />
                </div>
              </ul>
            </Box>
            {/* Mobile Nav */}
            <Box className="lg:!hidden md:!hidden">
              <button onClick={() => setIsDrawerOpen(true)}>
                <FaBarsStaggered size="1.5rem" />
              </button>{" "}
            </Box>
          </Flex>
        </nav>
      </header>

      <NavRes
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        tabs={tabs}
        logout={handleLogout}
      />
    </>
  );
}

export default UserNavbar;

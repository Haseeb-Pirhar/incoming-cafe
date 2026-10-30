"use client";

import React from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { Button, Flex } from "@radix-ui/themes";
import appLogo from "../../public/app-logo.png";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tabs: { href: string; label: string }[];
  logout: () => void;
}

const NavRes: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  tabs,
  logout,
}) => {
  const pathname = usePathname();

  const t = (key: string) => {
    const translations: Record<string, string> = {
      profile: "Profile",
      logout: "Logout",
    };

    return translations[key] || key;
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-[1px] bg-black/40"
        onClick={onClose}
      />

      {/* Offcanvas Drawer */}
      <div
        className={`absolute top-0 right-0 h-full flex flex-col justify-between min-w-[65%] max-w-xs bg-white shadow-lg p-6 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Flex justify="between" align="center" mb="8">
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

          <button onClick={onClose}>
            <IoClose size="1.7rem" />
          </button>
        </Flex>

        <div className="flex flex-col justify-between h-full">
          <ul className="space-y-4">
            {tabs.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-lg block ${
                    pathname === href ? "font-bold" : "font-normal"
                  }`}
                  onClick={onClose}
                >
                  {label}
                </Link>
              </li>
            ))}

            <li>
              <Link
                href="/store/profile"
                className={`text-lg block ${
                  pathname === "/store/profile" ? "font-bold" : "font-normal"
                }`}
                onClick={onClose}
              >
                {t("profile")}
              </Link>
            </li>
          </ul>

          <Button
            className="text-lg capitalize cursor-pointer border px-3 py-1 !rounded-md font-medium !bg-[#F25822] !text-white"
            onClick={() => {
              logout();
              onClose();
            }}
          >
            {t("logout")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavRes;

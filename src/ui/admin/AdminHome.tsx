"use client";
import React, { useEffect, useState } from "react";
import { Box, Flex, Grid } from "@radix-ui/themes";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { AiFillProduct } from "react-icons/ai";
import Loader from "@/components/ui/loader";

const AdminHome: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("week");
  const [loading, setLoading] = useState<boolean>(false);

  const t = (key: string) => {
    const translations: Record<string, string> = {
      totalUsers: "Total Users",
      totalMarkets: "Total Markets",
      totalStores: "Total Stores",
      adminDashboard: "Admin Dashboard",
      splash: "Splash",
      noSplashesAvailable: "No splashes available",
    };
    return translations[key] || key;
  };

  const data = [
    {
      title: t("totalUsers"),
      total: "—",
      icon: <Users className="h-5 w-5" />,
      bgColor: "bg-[#2F4F3E]/10",
      iconColor: "text-[#2F4F3E]",
      url: "/admin/users",
    },
    {
      title: t("totalMarkets"),
      total: "—",
      icon: <AiFillProduct className="h-5 w-5" />,
      bgColor: "bg-[#D4A017]/15",
      iconColor: "text-[#D4A017]",
      url: "/admin/markets",
    },
    {
      title: t("totalStores"),
      total: "—",
      icon: <HiOutlineBuildingStorefront className="h-5 w-5" />,
      bgColor: "bg-[#A5432A]/10",
      iconColor: "text-[#A5432A]",
      url: "/admin/store",
    },
  ];

  return (
    <PageLayout>
      <div style={{ fontFamily: "'Work Sans', sans-serif" }}>
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="6">
            <div className="my-6 flex w-full justify-between items-center flex-wrap">
              <h1
                className="text-3xl font-bold text-[#2F4F3E]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {t("adminDashboard")}
              </h1>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.map((item, index) => (
                <Link href={item.url || "#"} key={index}>
                  <Card
                    className={`${item.bgColor} border border-[#D4A017]/20 hover:shadow-md hover:border-[#D4A017]/50 transition-all duration-300 cursor-pointer group hover:-translate-y-0.5 !bg-white`}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium capitalize text-[#2F4F3E]/70">
                        {item.title}
                      </CardTitle>
                      <span
                        className={`${item.bgColor} ${item.iconColor} p-2 rounded-lg`}
                      >
                        {item.icon}
                      </span>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-2xl font-bold text-[#2F4F3E]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {item?.total}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </Flex>
        </Flex>
      </div>
    </PageLayout>
  );
};

export default AdminHome;

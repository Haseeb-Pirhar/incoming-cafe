"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  User,
  Mail,
  Calendar,
  MapPin,
  AlertCircle,
} from "lucide-react";
import type { User as UserType } from "@/types";
import Loader from "@/components/ui/loader";
import FilterTabs from "@/components/ui/filterTabs";

export function AdminUsers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");

  const t = (key: string) => {
    const translations: Record<string, string> = {
      usersManagement: "Users Management",
      manageAllUsersInYourPlateform: "Manage all users in your platform",
      users: "Users",
      searchAndFilters: "Search & Filters",
      filters: "Filters",
      allUsers: "All Users",
    };
    return translations[key] || key;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const countries = [
    "All",
    ...Array.from(new Set(users.map((u) => u.country).filter(Boolean))),
    "other",
  ];

  useEffect(() => {
    let filtered = users;
    if (selectedCountry === "other") {
      filtered = filtered.filter((u) => !u.city && !u.country);
    } else if (selectedCountry !== "All") {
      filtered = filtered.filter((u) => u.country === selectedCountry);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredUsers(filtered);
  }, [searchTerm, users, selectedCountry, selectedCity]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
    
      setUsers([]);
      setFilteredUsers([]);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "Unknown";
    }
  };

  const usersWithNoCityAndNoCountry = users.filter(
    (u) => !u.city && !u.country,
  );

  if (loading) {
    return (
      <div
        className="space-y-6"
        style={{ fontFamily: "'Work Sans', sans-serif" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-3xl font-bold text-[#2F4F3E]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {t("usersManagement")}
            </h1>
            <p className="text-[#2F4F3E]/60 mt-1">
              {t("manageAllUsersInYourPlateform")}
            </p>
          </div>
        </div>

        <Loader label={t("users")} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="space-y-6"
        style={{ fontFamily: "'Work Sans', sans-serif" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-3xl font-bold text-[#2F4F3E]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {t("usersManagement")}
            </h1>
            <p className="text-[#2F4F3E]/60 mt-1">
              {t("manageAllUsersInYourPlateform")}
            </p>
          </div>
        </div>

        <Card className="!border-[#D4A017]/20">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-[#A5432A] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#2F4F3E] mb-2">
                Error Loading Users
              </h3>
              <p className="text-[#2F4F3E]/60 mb-4">{error}</p>
              <Button
                onClick={fetchUsers}
                variant="outline"
                className="!border-[#2F4F3E]/30 !text-[#2F4F3E] hover:!bg-[#2F4F3E]/5"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="space-y-6"
      style={{ fontFamily: "'Work Sans', sans-serif" }}
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold text-[#2F4F3E]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {t("usersManagement")}
          </h1>
          <p className="text-[#2F4F3E]/60 mt-1">
            {t("manageAllUsersInYourPlateform")}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="!border-[#D4A017]/20">
        <CardHeader>
          <CardTitle className="text-[#2F4F3E]">
            {t("searchAndFilters")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F4F3E]/40 w-4 h-4" />
                <Input
                  placeholder="Search users by name, email, username, country or city..."
                  className="pl-10 !border-[#D4A017]/40 focus-visible:!ring-[#2F4F3E]/30"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 !border-[#2F4F3E]/30 !text-[#2F4F3E] hover:!bg-[#2F4F3E]/5"
            >
              <Filter className="w-4 h-4" />
              {t("filters")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <h1
        className="text-lg font-bold text-[#2F4F3E]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Users by Country
      </h1>

      {/* Country Filter Tabs */}
      <FilterTabs
        options={countries.map((country) => ({
          label: country,
          count:
            country === "All"
              ? users.length
              : country === "other"
                ? usersWithNoCityAndNoCountry.length
                : users.filter((u) => u.country === country).length,
        }))}
        selected={selectedCountry}
        onSelect={setSelectedCountry}
      />

      {/* Users List */}
      <Card className="!border-[#D4A017]/20">
        <CardHeader>
          <CardTitle className="text-[#2F4F3E]">
            {t("allUsers")}{" "}
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              ({filteredUsers.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-[#2F4F3E]/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#2F4F3E] mb-2">
                {searchTerm ? "No users found" : "No users available"}
              </h3>
              <p className="text-[#2F4F3E]/60">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Users will appear here once they register"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-4 border border-[#D4A017]/25 rounded-xl hover:border-[#A5432A]/40 hover:bg-[#FAF3E3]/50 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-wrap">
                    <div className="w-12 h-12 rounded-full bg-[#2F4F3E]/10 flex items-center justify-center shrink-0">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.fullName || user.username}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-[#2F4F3E] font-semibold text-lg">
                          {(user.fullName || user.username || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3
                        className="font-medium text-[#2F4F3E]"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        {user.fullName || user.username || "Unknown User"}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-[#2F4F3E]/60 flex-wrap space-y-1">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{user.email}</span>
                        </div>
                        {user.username && (
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>@{user.username}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Joined {formatDate(user.createdAt)}</span>
                        </div>
                        {user.city || user.country ? (
                          <div className="flex items-center space-x-1 bg-[#D4A017]/15 text-[#2F4F3E] px-2 py-1 rounded-lg font-medium">
                            <MapPin className="w-3 h-3" />
                            <span>{user.city || user.country}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

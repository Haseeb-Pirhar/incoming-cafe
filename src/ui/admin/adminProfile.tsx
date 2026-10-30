"use client";
import React from "react";
import { useAuthStore } from "@/store/profileStore";
import { FaUserAlt, FaEnvelope, FaCity } from "react-icons/fa";
const AdminProfile = () => {
  const { user } = useAuthStore();

  return (
    <div
      className="max-w-lg mx-auto mt-12 rounded-3xl shadow-xl border border-[#D4A017]/30"
      style={{ fontFamily: "'Work Sans', sans-serif" }}
    >
      <div className="bg-[#FAF3E3] rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <div className="relative mb-5 group">
            <div className="p-[4px] bg-[#D4A017] rounded-full group-hover:rotate-3 transition-transform duration-300">
              <img
                src={user?.image}
                alt={user?.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#FAF3E3] shadow-lg"
              />
            </div>
            {/* Ear-tag style badge instead of generic online dot */}
            <span
              className="absolute bottom-2 right-2 bg-[#A5432A] text-[#FAF3E3] text-[10px] px-1.5 py-0.5 rounded shadow-md"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              ADMIN
            </span>
          </div>

          {/* Name */}
          <h2
            className="text-3xl font-bold text-[#2F4F3E] mb-1 tracking-tight capitalize"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {user?.fullName}
          </h2>

          {/* Info Card */}
          <div className="w-full bg-white rounded-2xl shadow-sm border border-[#D4A017]/20 p-6 space-y-4">
            <div className="flex items-center text-[#2F4F3E]">
              <FaUserAlt className="text-[#D4A017] mr-3" />
              <span className="font-semibold">Username:</span>
              <span className="ml-2 text-[#2F4F3E]/60">{user?.username}</span>
            </div>
            <div className="border-t border-[#D4A017]/15"></div>
            <div className="flex items-center text-[#2F4F3E]">
              <FaEnvelope className="text-[#D4A017] mr-3" />
              <span className="font-semibold">Email:</span>
              <span className="ml-2 text-[#2F4F3E]/60">{user?.email}</span>
            </div>
            <div className="border-t border-[#D4A017]/15"></div>
            <div className="flex items-center text-[#2F4F3E]">
              <FaCity className="text-[#D4A017] mr-3" />
              <span className="font-semibold">Address:</span>
              <span className="ml-2 text-[#2F4F3E]/60">
                {user?.address || user?.city || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

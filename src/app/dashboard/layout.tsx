"use client";
import { useState } from "react";
import {
  CartProvider,
  useCart,
} from "@/components/user-dashboard/cart/CartContext";
import CartDrawer from "@/components/user-dashboard/cart/CartDrawer";
import DashboardNavbar from "@/components/user-dashboard/DashboardNavbar";
import Footer from "@/components/user-dashboard/Footer";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDrawerOpen, closeDrawer } = useCart();

  return (
    <>
      <DashboardNavbar
        search={search}
        setSearch={setSearch}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {children}
      <Footer />
      <CartDrawer open={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <DashboardShell>{children}</DashboardShell>
    </CartProvider>
  );
}

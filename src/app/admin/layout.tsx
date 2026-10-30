import { redirect } from "next/navigation";
import { getAuthCookies } from "@/utils/cookies";
import AdminNavbar from "@/ui/admin/navbar";
import { SOCKET_URL } from "@/constants";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCookies = await getAuthCookies();

  // Redirect if not authenticated or not admin
  if (!authCookies?.user || authCookies.user.type !== "admin") {
    redirect("/auth/login");
  }
  const { accessToken } = authCookies;

  const constants = {
    urlWebSocket: SOCKET_URL,
  };

  return (
    <div className="min-h-screen bg-[#FAF3E3] flex flex-col lg:flex-row md:flex-col md:gap-8">
      {/* Admin Navbar */}
      <AdminNavbar />

      {/* Main Content - Added top padding for fixed navbar */}
      <div className="pt-16 w-full max-w-[90rem] px-4 sm:px-6 lg:px-8 py-6 lg:mt-4 mt-14">
        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}

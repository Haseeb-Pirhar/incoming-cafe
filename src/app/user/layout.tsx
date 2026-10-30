import UserNavbar from "@/layout/Header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Navbar */}
      <UserNavbar />

      {/* Main Content - Added top padding for fixed navbar */}
      <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}

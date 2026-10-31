import DashboardNavbar from "@/components/user-dashboard/DashboardNavbar";
import Footer from "@/components/user-dashboard/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

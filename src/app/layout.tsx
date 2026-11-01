import type { Metadata } from "next";
import { Chewy, Work_Sans } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

// Chewy is the closest free Google font to the chunky "incoming cafe" lettering.
const chewy = Chewy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-chewy",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Incoming Cafe | Parramatta",
    template: "%s | Incoming Cafe",
  },
  description:
    "Incoming Cafe, 24 Hunter Street, Parramatta. Coffee, fresh drinks and light bites.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Incoming Cafe",
  },
  robots: { index: true, follow: true },
};

const cafeJsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Incoming Cafe",
  address: {
    "@type": "PostalAddress",
    streetAddress: "24 Hunter Street",
    addressLocality: "Parramatta",
    addressRegion: "NSW",
    addressCountry: "AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${chewy.variable} ${workSans.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <ToastProvider />
        <Theme
          accentColor="teal"
          radius="medium"
          className="flex min-h-[100vh] w-full flex-col !bg-[#F1F0EC]"
        >
          {children}
        </Theme>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cafeJsonLd) }}
        />
      </body>
    </html>
  );
}
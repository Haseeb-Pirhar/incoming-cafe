import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import { Flex, Theme } from "@radix-ui/themes";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { CartProvider } from "@/components/user-dashboard/cart/CartContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-work-sans",
});

const SITE_URL = "https://www.happylifepure.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "happyLife — Sexual Wellness & Intimate Care",
    template: "%s | happyLife",
  },
  description:
    "Shop sexual wellness, intimate care, and personal wellness products at happyLife. Discreet packaging, easy WhatsApp ordering, no login required.",
  keywords: [
    "happyLife",
    "sexual wellness Pakistan",
    "intimate care products",
    "personal wellness",
    "discreet delivery",
  ],
  authors: [{ name: "happyLife" }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: "happyLife",
    title: "happyLife — Sexual Wellness & Intimate Care",
    description:
      "Explore sexual wellness, intimate care, and personal wellness products at happyLife — discreet delivery via WhatsApp.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "happyLife — Sexual Wellness & Intimate Care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "happyLife — Sexual Wellness & Intimate Care",
    description:
      "Discreet delivery, easy WhatsApp ordering, no login required.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "RMsPm6ZGYLyMEoB1BNaogJ9lF50OxZg",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "happyLife",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Urdu"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tabler-icons/2.44.0/tabler-icons.min.css"
        />
      </head>

      <body
        className={`${fraunces.variable} ${workSans.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <ToastProvider />

        <Theme
          accentColor="blue"
          radius="medium"
          className="flex min-h-[100vh] w-full flex-col !bg-[#F4F8FF]"
        >
          <CartProvider>
            <Flex direction="column" gap="6">
              {children}
            </Flex>
          </CartProvider>
        </Theme>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}

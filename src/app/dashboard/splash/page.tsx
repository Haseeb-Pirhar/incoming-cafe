import { Metadata } from "next";

import { Splash } from "@/ui/dashboard/splash/splash";

export const metadata: Metadata = {
  title: "happyLife | Splash",
  description:
    "Naya collection live hai — shop everyday things that make everyday life a little happier.",
};

/**
 * /dashboard/splash — public page, no login required.
 */
export default function SplashPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Splash />
    </main>
  );
}

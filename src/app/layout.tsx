import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WedPlan — Wedding Planning & Vendor Directory",
    template: "%s | WedPlan",
  },
  description:
    "Discover and book trusted wedding venues, photographers, florists, caterers and more. WedPlan brings your celebration together in one beautifully organised place.",
  keywords: [
    "wedding planning",
    "wedding vendors",
    "wedding directory",
    "wedding services",
    "Bangladesh weddings",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
        <Toaster
          position="top-center"
          theme="light"
          richColors
          closeButton
          toastOptions={{
            style: {
              borderRadius: "2px",
              fontFamily: "var(--font-nunito)",
            },
          }}
        />
      </body>
    </html>
  );
}

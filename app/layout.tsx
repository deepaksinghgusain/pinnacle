import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SERVER_URL } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SERVER_URL),
  title: "Pinnacle Serve — Operations and Technology, Working as One",
  description:
    "Pinnacle Serve brings operational support and modern technology together to help organizations improve service, simplify work, and grow with confidence.",
  openGraph: {
    type: "website",
    siteName: "Pinnacle Serve",
    title: "Pinnacle Serve — Operations and Technology, Working as One",
    description:
      "Pinnacle Serve brings operational support and modern technology together to help organizations improve service, simplify work, and grow with confidence.",
    images: [{ url: "/squaread.png", alt: "Pinnacle Serve" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinnacle Serve — Operations and Technology, Working as One",
    description:
      "Pinnacle Serve brings operational support and modern technology together to help organizations improve service, simplify work, and grow with confidence.",
    images: [{ url: "/squaread.png", alt: "Pinnacle Serve" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

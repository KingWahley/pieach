import { Outfit, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  title: "PIEACH Limited | Architecture, Master Planning & Interior Design",
  description: "Established in 2007, PIEACH Limited is a multi-disciplinary practice of visionary specialists in architecture, master planning, interior design, and project management based in West Africa.",
  metadataBase: new URL("https://pieach.com"),
  openGraph: {
    title: "PIEACH Limited | Architecture & Design",
    description: "Multidisciplinary design practice shaping modern residential, commercial, and urban landscapes in West Africa.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#111111] selection:bg-brand-gold selection:text-brand-navy">
        {children}
      </body>
    </html>
  );
}

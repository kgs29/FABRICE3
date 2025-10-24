// app/layout.tsx

import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./componets/nav/Navbar";
import Footer from "./componets/footer/Footer";

// 1. Importer le CartProvider
import { CartProvider } from "./Context/CartContext"; 

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Shopping Line",
  description: "vente en ligne des produits de qualité",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        {/* 2. Envelopper tous les composants qui ont besoin du panier (Navbar, children, Footer) */}
        <CartProvider> 
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
} 
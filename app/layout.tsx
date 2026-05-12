import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Laundry — Premium Garment Care",
  description: "Platform perawatan busana premium dengan standar kualitas tertinggi. Cuci, setrika, dan perawatan kustom untuk gaya hidup modern Anda.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

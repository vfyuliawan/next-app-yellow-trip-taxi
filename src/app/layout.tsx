// RootLayout.tsx (Server Component)
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientComponent from "./ClientComponent";  // Import the client component

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Yellow Taxi Trip",
  description: "Yellow Taxi Trip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientComponent />  {/* Render the client-side component */}
        {children}
      </body>
    </html>
  );
}

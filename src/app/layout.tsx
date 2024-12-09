// RootLayout.tsx (Server Component)
"use client";
// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientComponent from "./ClientComponent"; // Import the client component
import { IsClientCtxProvider } from "./is-client-ctx";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import { LoadingProvider } from "./context/ILoadingContext";
import FullscreenLoader from "./component/IFulScreenLoading";
import { useEffect, useRef, useState } from "react";
import loginRepository from "./core/domain/repository/LoginRepository/loginRepository";
import { Toast } from "primereact/toast";

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

// export const metadata: Metadata = {
//   title: "Yellow Taxi Trip",
//   description: "Yellow Taxi Trip",
// };
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap the app with PrimeReact provider for styling */}
        <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
          {/* Global loader */}
          <LoadingProvider>
            <FullscreenLoader /> {/* Global loader component */}
            {/* Render the children passed to this layout */}
            {children}
          </LoadingProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}

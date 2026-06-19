import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import StoreProvider from "./StoreProvider";
import { RefreshDataProvider } from "@/components/providers/RefreshDataProvider/RefreshDataProvider";
import { GameDataProvider } from "@/components/providers/GameDataProvider/GameDataProvider";
import { ToastProvider } from "@/components/providers/ToastProvider/ToastProvider";
import { ToastContainer } from "@/components/providers/ToastProvider/components/ToastContainer/ToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isekai Quest",
  description: "A fantasy job board for adventurers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <GameDataProvider>
            <RefreshDataProvider>
              <ToastProvider>
                <ToastContainer />
                {children}
              </ToastProvider>
            </RefreshDataProvider>
          </GameDataProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

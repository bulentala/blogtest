import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { FC, ReactNode } from 'react'
import { NextraTheme } from '@/components/nextra-theme'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        absolute: '',
        template: '%s - Nextra'
    }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { const pageMap = await getPageMap()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <NextraTheme pageMap={pageMap}>{children}</NextraTheme>
      </body>
    </html>
  );
}

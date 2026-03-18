import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const sfMono = localFont({
  src: "./fonts/SFNSMono.ttf",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Edge AI 車用電子產品地圖",
  description:
    "以可探索的互動方式呈現車用電子 Edge AI 產品版圖、晶片平台與部署趨勢。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body className={sfMono.variable}>
        {children}
      </body>
    </html>
  );
}

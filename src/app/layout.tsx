import type { Metadata } from "next";
import Footer from "./_components/layout/footer";
import { ThemeProvider } from "./_components/provider/theme-provider";

import Header from "./_components/layout/header";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "김영덕 기술블로그",
  description: "개발자 김영덕의 기술블로그입니다.",
  authors: { name: "youngduck" },
  generator: "Next.js",
  creator: "youngduck",
  publisher: "Vercel",
  verification: { google: "lybtoBCBf6isHIGdGbYxTHG7N2dUanHjWahiXMgKtXY" },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

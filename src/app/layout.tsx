import type { Metadata } from "next";
import Footer from "@layout/footer";
import { ThemeProvider } from "./_components/provider/theme-provider";

import Header from "@/app/_components/layout/header/header";
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
  manifest: "/manifest.json",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASED_URL as string),
  openGraph: {
    url: `https://youngduck-devlog.vercel.app`,
    siteName: "youngduck-devlog",
    title: "김영덕 기술블로그",
    description: "개발자 김영덕의 기술블로그입니다.",
    images: ["/assets/blog/openGraph/cover.png"],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="theme-color" content="#F2F2F2" />
        <meta name="msapplication-TileColor" content="#F2F2F2"></meta>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          href="images/icons/icon-192x192.png"
        ></link>
        <link
          href="/assets/splashscreens/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/assets/splashscreens/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/assets/splashscreens/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/assets/splashscreens/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/assets/splashscreens/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/assets/splashscreens/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/assets/splashscreens/ipad_splash.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/assets/splashscreens/ipadpro1_splash.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/assets/splashscreens/ipadpro3_splash.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/assets/splashscreens/ipadpro2_splash.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
      </head>
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

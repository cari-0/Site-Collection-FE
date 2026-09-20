import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import "./globals.css";

const noto = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${noto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="mx-auto w-full flex-1 px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

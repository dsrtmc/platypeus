import "./globals.css";
import { ReactNode } from "react";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Header } from "@/components/header/Header";
import { ConfigLoader } from "@/app/ConfigLoader";
import { availableFonts } from "@/shared/constants/fonts";
import { ErrorProvider } from "@/app/ErrorProvider";
import { ErrorToast } from "@/app/ErrorToast";
import { NotificationProvider } from "@/app/NotificationProvider";
import { NotificationToast } from "@/app/NotificationToast";
import { Providers } from "@/app/Providers";
import { Toasts } from "@/app/Toasts";
import { Footer } from "@/components/footer/Footer";
import { Metadata } from "next";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

export const metadata: Metadata = {
  title: "Platypeus",
  authors: [{ name: "dsrtmc" }],
  description:
    "Platypeus is a website where you can measure your typing speed. It offers a basic account and a scoreboard system, as well as some multiplayer racing capabilities. The default test uses the 200 most common English words as the wordlist.",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/icon-light.png',
        href: '/images/icon-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/icon-dark.png',
        href: '/images/icon-dark.png',
      }
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${Object.entries(availableFonts)
        .map(([name, font]) => font.variable)
        .join(" ")}`}
    >
      <body>
        <ApolloWrapper>
          <Providers>
            <ContentWrapper>
              <Header />
              <Toasts />
              <ConfigLoader />
              <main>{children}</main>
              <Footer />
            </ContentWrapper>
          </Providers>
        </ApolloWrapper>
      </body>
    </html>
  );
}

import { Providers } from "@/redux/provider";
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Poppins } from "next/font/google";
import "./globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata: Metadata = {
  title: "ESHAN TIX LLC",
  description: "Online Retail & E-commerce",
  icons: {
    icon: "/favicon.png", // <-- ekhane favicon image path
    apple: "/favicon.png", // Apple devices er jonno
  },
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-body",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <Providers>
          <CookiesProvider>{children}</CookiesProvider>
        </Providers>
      </body>
    </html>
  );
}

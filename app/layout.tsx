import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import QueryProvider from "@/provider/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kerux Web",
  description: "Aporta Soluciones",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider pageProps={""}>
      <SessionProvider>
        <html lang="es">
          <body className={inter.className}>
            {children}
            <TailwindIndicator />
          </body>
        </html>
      </SessionProvider>
    </QueryProvider>
  );
}

// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import QueryProvider from "@/provider/query-provider";
import ThemeProvider from "@/utils/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kerux Web",
  description: "Aporta Soluciones",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <body className={`min-h-screen ${inter.className}`}>
        <QueryProvider pageProps={""}>
            <ThemeProvider>
              {children}
              <TailwindIndicator />
            </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
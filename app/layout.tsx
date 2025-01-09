import { headers } from "next/headers"; // Para manejar headers en entornos Next.js modernos
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import QueryProvider from "@/provider/query-provider";
import ThemeProvider from "@/utils/ThemeProvider";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kerux Web",
  description: "Aporta Soluciones",
};

async function getSession() {
  try {
    // Usa headers para obtener cookies o datos del contexto
    const headersList = await headers();
    const cookie = headersList.get("cookie");

    if (!cookie) {
      return null;
    }

    // Llama al método auth directamente con los headers
    const session = await auth();
    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="es">
      <body className={`min-h-screen ${inter.className}`}>
        <QueryProvider pageProps={""}>
          <SessionProvider session={session}>
            <ThemeProvider>
              {children}
              <TailwindIndicator />
            </ThemeProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

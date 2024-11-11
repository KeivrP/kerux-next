import Container from "@/lib/container";
import { SideProvider } from "@/provider/sideProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Kerux Web | Aporta Soluciones",
  description: "Aporta Soluciones",
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    
    <SideProvider>
      <Container>

        {children}
      </Container>
    </SideProvider>
  );
};

export default Layout;

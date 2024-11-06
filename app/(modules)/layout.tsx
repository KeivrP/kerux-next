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
      <div style={{ height: "10vh" }}>{children}</div>
    </SideProvider>
  );
};

export default Layout;

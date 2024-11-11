import Container from "@/lib/container";
import { FormProviderHcdocorg } from "@/provider/hcdocorg-provider";
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
      <FormProviderHcdocorg>
        <Container>
          {children}
        </Container>
      </FormProviderHcdocorg>
    </SideProvider>
  );
};

export default Layout;

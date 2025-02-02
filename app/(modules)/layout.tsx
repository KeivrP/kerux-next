'use client';

import { getSession, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import Container from "@/lib/container";
import { FormProviderHcdocorg } from "@/provider/hcdocorg-provider";
import { SideProvider } from "@/provider/sideProvider";
import { Session } from "next-auth";
import Loader from "@/components/backdrop/loader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Obtén la sesión en el cliente
    getSession().then((sessionData) => {
      setSession(sessionData);
    });
  }, []);

  if (session === null) {
    // Puedes agregar un estado de carga aquí
    return <Loader/>;
  }

  return (
    <SessionProvider session={session}>
      <SideProvider>
        <FormProviderHcdocorg>
          <Container>{children}</Container>
        </FormProviderHcdocorg>
      </SideProvider>
    </SessionProvider>
  );
}

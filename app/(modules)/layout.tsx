import { SideProvider } from '@/provider/sideProvider';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Kerux Web",
    description: "Aporta Soluciones",
  };
  

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
            <SideProvider>
                {children}
            </SideProvider>
    );
};

export default Layout;


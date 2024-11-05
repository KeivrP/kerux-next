'use client'
import Navbar from '@/components/navbar';
import React, { createContext, useContext, ReactNode } from 'react';

interface SideProviderProps {
    children: ReactNode;
}

const SideContext = createContext<any>(null);

export const SideProvider = ({ children }: SideProviderProps) => {
    return (
        <SideContext.Provider value={null}>
            <Navbar >
                {children}
            </Navbar>
        </SideContext.Provider>
    );
};

export const useSideContext = () => {
    const context = useContext(SideContext);
    if (context === undefined) {
        throw new Error('useSideContext must be used within a SideProvider');
    }
    return context;
};
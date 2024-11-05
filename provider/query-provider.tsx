'use client';
import React, { createContext, useContext, ReactNode, useState } from 'react';
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
const QueryContext = createContext<QueryClient | undefined>(undefined);

const QueryProvider: React.FC<{ children: ReactNode, pageProps: any }> = ({ children, pageProps }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: 2,
                staleTime: 1000 * 60,
            },
        },
    }));

    return (
        <QueryContext.Provider value={queryClient}>
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={pageProps?.dehydratedState || {}}>
                    {children}
                </HydrationBoundary>
            </QueryClientProvider>
        </QueryContext.Provider>
    );
};

export const useQueryClient = () => {
    const context = useContext(QueryContext);
    if (context === undefined) {
        throw new Error('useQueryClient must be used within a QueryProvider');
    }
    return context;
};

export default QueryProvider;
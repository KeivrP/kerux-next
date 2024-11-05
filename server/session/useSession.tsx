'use client';
import { useQuery, useMutation } from "@tanstack/react-query";
import { getMenuUser, getSubMenuUser, getUserLogin, UserLogin } from "./api";
import { useSession } from "next-auth/react";
import { useMemo } from 'react';

// Función auxiliar para obtener token y email de la sesión
const useSessionData = () => {
    const { data: session } = useSession();

    const { token, email } = useMemo(() => {
        const token = session?.user.token;
        const email = session?.user?.email;
        return { token, email };
    }, [session]);
    return { token, email };
};

export const useSignIn = () => {
    return useMutation({
        mutationFn: ({ data }: { data: UserLogin }) => getUserLogin(data),
        onSuccess: (res) => {
            console.log();
        },
        onError: (error) => {
            console.error('Error updating Compradores:', error);
        }
    });
};

export const useMenu = () => {
    const { token, email } = useSessionData();
    return useQuery({
        queryKey: ['menu', token, email],
        queryFn: async () => {
            if (!token || !email) {
                throw new Error('Token or email is missing');
            }
            return await getMenuUser({ token, email });
        },
    });
};

export const useSubMenu = (codmenu: string) => {
    const { token, email } = useSessionData();
    return useQuery({
        queryKey: ['submenu', token, email],
        queryFn: async () => await getSubMenuUser({ token, email, codmenu }),
    });
};
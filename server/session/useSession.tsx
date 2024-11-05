'use client';
import { useQuery } from "@tanstack/react-query";
import { getMenuUser, getUserLogin, UserLogin } from "./api";

import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

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
}


export const useMenu = () => {
    const {data: session} = useSession();
    const token = session?.user.token;
    const email = session?.user?.email;
    console.log(token, email, 'token, email');
    return useQuery({
      queryKey: ['menu', session],
      queryFn: async () => await getMenuUser({ token, email }),
    });
  };


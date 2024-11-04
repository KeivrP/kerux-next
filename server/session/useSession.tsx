'use client';
import { useQuery } from "@tanstack/react-query";
import { getUserLogin, UserLogin } from "./api";

import { useMutation } from "@tanstack/react-query";

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


export const useMenu = ({email, password}: UserLogin) => {
    return useQuery({
      queryKey: ['Login', { email }],
      queryFn: async () => await getUserLogin({email, password}),
      staleTime: 1000 * 60 * 5,
    });
  };
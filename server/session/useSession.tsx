"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getMenuUser, getSubMenuUser, getUserLogin, UserLogin } from "./api";

export const useSignIn = () => {
  return useMutation({
    mutationFn: ({ data }: { data: UserLogin }) => getUserLogin(data),
    onSuccess: (res) => {
    },
    onError: (error) => {
      console.error("Error updating Compradores:", error);
    },
  });
};

export const useMenu = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      return await getMenuUser();
    },
  });
};

export const useSubMenu = (codmenu: string) => {
  return useQuery({
    queryKey: ["submenu", codmenu],
    queryFn: async () => await getSubMenuUser({ codmenu }),
  });
};

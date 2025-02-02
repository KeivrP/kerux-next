"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function handleCredentialsSignin({ 
    email, 
    password 
  }: { 
    email: string
    password: string 
  }) {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/"
      })
      return result
    } catch (error) {
      if (error instanceof AuthError) {
        return { message: "Credenciales inválidas" }
      }
      throw error
    }
  }


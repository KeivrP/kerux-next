"use server";

import { signIn, signOut } from "@/auth";
import { removeAuthTokenCookie } from "@/lib/cookies"; // Ensure this import is correct
import { AuthError } from "next-auth";

export async function handleCredentialsSignin({ email, password }: {
    email: string,
    password: string
}) {
    try {
        await signIn("credentials", { email, password, redirectTo: "/" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Credenciales invalidas. Por favor, verifique su correo y contraseña.',
                    }
                default:
                    return {
                        message: 'Ocurrió un error inesperado. Por favor, intente nuevamente.',
                    }
            }
        }
        throw error;
    }
}

export async function handleSignOut() {
   await removeAuthTokenCookie("token");
   await  removeAuthTokenCookie("email");
    await signOut();
}

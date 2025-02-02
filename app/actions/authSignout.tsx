import { signOut } from "next-auth/react";
import { NextResponse } from "next/server";

export const handleSignOut = async () => {
    try {
      // Llama a la API para eliminar cookies en el servidor
      await fetch("/api/auth/signout", {
        method: "POST",
      });

      // Cierra sesión usando next-auth
      await signOut({ callbackUrl: "/auth/signin" });

      return NextResponse.redirect("/auth/signin");

    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
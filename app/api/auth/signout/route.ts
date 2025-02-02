// app/api/auth/signout/route.ts
import { removeAuthTokenCookie } from "@/lib/cookies";
import { NextResponse } from "next/server";

export async function POST() {
  
  // Elimina las cookies
  await  removeAuthTokenCookie("authjs.session-token");
  await removeAuthTokenCookie("token");
  await  removeAuthTokenCookie("email");

  return NextResponse.json({ message: "Sesión cerrada correctamente" });
}

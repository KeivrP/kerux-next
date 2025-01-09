import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Helper para verificar el token de sesión
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/auth/signin", "/api/auth"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir acceso a rutas públicas
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (!process.env.AUTH_SECRET) {
    throw new Error('AUTH_SECRET must be defined');
  }

  // Verificar el token de sesión
  const token = await getToken({ 
    req, 
    secret: process.env.AUTH_SECRET,
    salt: process.env.AUTH_SALT || process.env.AUTH_SECRET
  });

  // Si no hay token, redirigir al login
  if (!token) {
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Si hay token, permitir acceso
  return NextResponse.next();
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    // Proteger todas las rutas excepto las públicas y las de Next.js internas
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};

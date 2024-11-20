// middleware.ts
import { NextResponse } from 'next/server'
import { auth } from './auth'  // Importa la configuración de auth que ya tienes

export default auth((req) => {
  const isAuthenticated = !!req.auth
  const { pathname } = req.nextUrl

  // Lista de rutas públicas que no requieren autenticación
  const publicRoutes = ['/auth/signin', '/api/auth']
  
  // Si la ruta es pública, permitir acceso
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Si no está autenticado y no es una ruta pública, redirigir al login
  if (!isAuthenticated) {
    const signInUrl = new URL('/auth/signin', req.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Si está autenticado, permitir acceso
  return NextResponse.next()
})

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    // Rutas que requieren autenticación
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}
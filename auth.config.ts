// auth.config.ts
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import { getUserLogin, UserLogin } from "./server/session/api"

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials)
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors)
          return null
        }

        const { email, password } = credentials as any

        try {
          const user = await getUserLogin({ email, password })
          if (!user) {
            console.log("Invalid credentials")
            return null
          }
          return user
        } catch (error) {
          console.error("Error during user login:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    session({ session, token }) {
      session.user = {
        ...session.user,
        ...token.user,
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  trustHost: true,
  // Aquí está la configuración de la sesión:
  session: {
    strategy: "jwt", 
    maxAge: 7200, // 2 horas en segundos
  },
}
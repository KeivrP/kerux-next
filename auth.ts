import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { getUserLogin, UserLogin } from "./server/session/api";

// Configuración de NextAuth
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Proveedor de autenticación con credenciales personalizadas
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        // Validar las credenciales usando el esquema de Zod
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }

        const { email, password } = credentials as UserLogin;

        try {
          // Llamar a la API para obtener el usuario
          const user = await getUserLogin({ email, password });

          if (!user) {
            console.log("Invalid credentials");
            return null;
          }

          // Retornar el usuario si las credenciales son válidas
          return user;
        } catch (error) {
          console.error("Error during user login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Callback para autorizar el acceso a rutas específicas
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Redirigir a la página principal si el usuario ya está logueado y trata de acceder a la página de inicio de sesión
      if (pathname.startsWith("/auth/signin") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      // Permitir el acceso si el usuario está autenticado
      return !!auth;
    },
    // Callback para manipular el token JWT
    jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    // Callback para manipular la sesión
    session({ session, token }) {
      session.user = {
        ...session.user,
        ...token.user,
        token: token.token,
      };
      return session;
    },
  },
  // Configuración de las páginas de autenticación
  pages: {
    signIn: "/auth/signin",
  },
});

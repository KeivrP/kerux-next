// types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    token: string;
    correo: string;
    user: UserLogin;
  }
  interface UserLogin {
    codusuariodb: string;
    name: string;
    email: string;
    codominio: string;
    coduadmproband: string;
    descund: string;
    indtodasujec: string;
    indreaund: string;
    codujec: string;
    descundejec: string;
    coddependencia: string;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

export interface Session {
  status: string
  request: Request
}

export interface Request {
  auth: Auth
}

export interface Auth {
  user: User
  expires: string
}




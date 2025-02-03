import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import SignIn from "./signin-form.tsx";
import { QrCode } from "lucide-react";

export default async function SignInPage() {
  
  return (
    <SignIn />
  );
}

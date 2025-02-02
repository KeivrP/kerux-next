"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoadingButton({ pending }: { pending: boolean }) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-[#142F62] hover:bg-[#001944] text-white transition-all duration-300 py-6 text-sm font-medium"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Iniciando sesión...
        </>
      ) : (
        "Iniciar Sesión"
      )}
    </Button>
  );
}
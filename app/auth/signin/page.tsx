import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import SignIn from "./signin-form.tsx";
import { QrCode } from "lucide-react";

export default async function SignInPage() {
  
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#FFE5E5] via-[#E5F0FF] to-[#F5F5F5] flex items-center justify-center p-4">
      {/* iPhone Frame */}
      <div className="w-[320px] h-[680px]">


        {/* Wavy Lines */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-24">
          <svg width="100%" height="40" viewBox="0 0 320 40" fill="none" preserveAspectRatio="none">
            <path d="M-10 20C30 10 50 30 90 20C130 10 150 30 190 20C230 10 250 30 290 20C330 10 350 30 390 20" 
                  stroke="#FFB3B3" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </div>


        {/* Main Content */}
        <div className="flex flex-col items-center justify-center h-full px-8">
          {/* Audio Wave Icon with Animation */}
          <div className="relative mb-16">
            {/* Pulse Rings */}
            <div className="absolute inset-0 animate-ping opacity-75 bg-[#FFB3B3] rounded-2xl scale-150"></div>
            <div className="absolute inset-0 animate-ping opacity-50 bg-[#FFB3B3] rounded-2xl scale-200 animation-delay-150"></div>
            
            {/* Icon Container */}
            <div className="relative w-20 h-20 bg-[#FFB3B3] rounded-2xl shadow-lg flex items-center justify-center">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2v20M17 5v14M7 5v14M2 8v8M22 8v8" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-[#1a1a1a] text-center leading-tight mb-4">
            Acerca tu dispositivo<br />para comenzar
          </h1>
          
          <p className="text-sm text-[#666] text-center mb-16">
            o elige otra opción
          </p>

          {/* QR Code Button */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
            <button className="w-16 h-16 bg-[#FFB3B3] rounded-2xl text-white flex items-center justify-center shadow-lg hover:bg-[#FFA3A3] transition-all">
              <QrCode className="w-8 h-8" />
            </button>
          </div>

         
        </div>
      </div>
    </div>
    </>
  );
}
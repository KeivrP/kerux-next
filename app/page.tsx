'use client';
import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, update } = useSession();
  console.log("s",session   );
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="max-w-sm">
        <CardHeader>
          <Image
            className="rounded-lg"
            src="https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="img"
            width={500}
            height={500}
            priority
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-2 text-2xl font-bold">
            Welcome, {session?.user?.name}
          </CardTitle>
          <p className="text-muted-foreground">
            If you are learning something valuable from this video, please like
            and subscribe to my channel.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

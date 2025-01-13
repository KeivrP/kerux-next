// app/api/auth/[...nextauth]/route.ts
import { type NextRequest } from 'next/server';
import { auth } from '@/auth';

export const GET = auth((request: NextRequest) => {
  return Response.json({ status: "ok" });
}) as any;

export const POST = auth((request: NextRequest) => {
  return Response.json({ status: "ok" });
}) as any;
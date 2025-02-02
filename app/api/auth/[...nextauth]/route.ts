import { type NextRequest } from "next/server";
import { auth } from "@/auth";

export const GET = auth((request: any) => {
  return Response.json({ status: "ok", request });
}) as any;

export const POST = auth((request: NextRequest) => {
  return Response.json({ status: "ok", request });
}) as any;

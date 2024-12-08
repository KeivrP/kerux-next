import { getAuthTokenFromCookies } from "@/lib/cookies";

export async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getAuthTokenFromCookies("email");
  const email = await getAuthTokenFromCookies("token");

  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (email) {
    headers["Auth-User"] = email;
  }

  return headers;
}

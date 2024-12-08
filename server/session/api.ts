import { API_URL_PROSEG } from "@/constants/env.constant";
import { Api_Proseg } from "../API";
import { setAuthTokenInCookies } from "@/lib/cookies";

export interface UserLogin {
  email: string;
  password: string;
}

export const getUserLogin = async (user: UserLogin) => {
  const response = await fetch(`${API_URL_PROSEG}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  setAuthTokenInCookies("token", data.correo, { path: "/" });
  setAuthTokenInCookies("email", data.token, { path: "/" });
  return data;
};

export const getMenuUser = async () => {
  try {
    const response = await Api_Proseg.get("/menu_users");
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching menu user:", error);
    throw error;
  }
};
export const getSubMenuUser = async ({ codmenu }: { codmenu: string }) => {
  try {
    const response = await Api_Proseg.get(
      `/menu_users/show?codmenu=${codmenu}`
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching submenu user:", error);
    throw error;
  }
};

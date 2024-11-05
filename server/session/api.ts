import { API_URL_PROSEG } from "@/constants/env.constant";
import { Api_Proseg } from "../API";

export interface UserLogin {
  email: string,
  password: string,
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
  return data;
};


export const getMenuUser = async ({ token, email }) => {
    try {
        console.log('getMenuUser');
        
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        if (email) {
            headers["Auth-User"] = email;
        }

        const response = await Api_Proseg.get('/menu_users', { headers });
        console.log(response, 'response');
        if (response.status !== 200) {
            throw new Error("Network response was not ok");
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching menu user:', error);
        throw error;
    }
};

export const getSubMenuUser = async ({ token, email, codmenu }) => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (email) {
        headers["Auth-User"] = email;
    }

    const response = await Api_Proseg.get(`/menu_users/show?codmenu=${codmenu}`, { headers });

    if (response.status !== 200) {
        throw new Error("Network response was not ok");
    }

    return response.data;
};
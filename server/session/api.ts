export interface UserLogin {
  email: string,
  password: string,
}

const VITE_APP_API_URL_PROSEG =  process.env.NEXT_PUBLIC_API_URL_PROSEG;

export const getUserLogin = async (user: UserLogin) => {
  const response = await fetch(`${VITE_APP_API_URL_PROSEG}/login`, {
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

export const getMenuUser = async ({token, email}) => {
  console.log("sss",process.env.NEXT_PUBLIC_API_URL_PROSEG);
  const headers: Record<string, string> = {
      "Content-Type": "application/json",
  };

  if (token) {
      headers["Authorization"] = `Bearer ${token}`;
  }

  if (email) {
      headers["Auth-User"] = email;
  }
console.log("headers", headers, token, email);
  const response = await fetch(`${VITE_APP_API_URL_PROSEG}/menu_users`, {
      method: "GET",
      headers,
  });

  if (!response.ok) {
      throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export const getSubMenuUser = async ({token, email, codmenu}) => {
  const headers: Record<string, string> = {
      "Content-Type": "application/json",
  };

  if (token) {
      headers["Authorization"] = `Bearer ${token}`;
  }

  if (email) {
      headers["Auth-User"] = email;
  }
console.log("headers", headers, token, email);
  const response = await fetch(`${VITE_APP_API_URL_PROSEG}/menu_users/show?codmenu=${codmenu}`, {
      method: "GET",
      headers,
  });

  if (!response.ok) {
      throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}
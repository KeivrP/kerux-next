export interface UserLogin {
    email: string,
    password: string,
}

const VITE_APP_API_URL_PROSEG = "http://3.134.157.228:9001/proseg";

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
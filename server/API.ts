interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

const fetchWithToken = async (API_URL: string, endpoint: string, token?: string, email?: string, options: FetchOptions = {}): Promise<any> => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...options.headers, // Permite agregar otros encabezados si es necesario
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (email) {
        headers["Auth-User"] = email;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: headers,
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json(); // Retorna los datos en formato JSON
};

export default fetchWithToken;
import { baseEndpointClients } from "../api/index";

export interface LoginResponse {
  id: string;
  token: string;
}

export const login = async (
  id: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(`${baseEndpointClients}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Login failed");
  }

  const data: LoginResponse = await response.json();
  localStorage.setItem("authToken", data.token);
  return data;
};
import { baseEndpointAdmins } from "../api/index";

export interface AdminRequest {
  fullName: string;
  role: string;
  password: string;
}

export interface AdminResponse {
  ID: string;
  FullName: string;
  Role: string;
}

export const registerAdmin = async (
  adminData: AdminRequest
): Promise<AdminResponse> => {
  const response = await fetch(`${baseEndpointAdmins}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(adminData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error registering admin");
  }

  const data: AdminResponse = await response.json();
  return data;
};

export interface LoginResponse {
  id: string;
  token: string;
}

export const loginAdmin = async (
  id: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(`${baseEndpointAdmins}/login`, {
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
  localStorage.setItem("adminAuthToken", data.token);
  return data;
};
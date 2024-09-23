import { baseEndpointClients } from "../api/index";

export interface ClientRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface ClientResponse {
  ID: string;
  FullName: string;
  Email: string;
}

export const registerClient = async (
  clientData: ClientRequest
): Promise<ClientResponse> => {
  const response = await fetch(baseEndpointClients, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error registering client");
  }

  const data: ClientResponse = await response.json();
  console.log("data: ", data)
  return data;
};
import { baseEndpointLoans } from "../api/index";

export interface LoanRequest {
  clientId: string;
  amount: number;
  termInMonths: number;
}

export interface LoanResponse {
    ID: string;
    ClientID: string;
    Amount: number;
    InterestRate: number;
    TermInMonths: number;
    Status: string;
    CreatedAt: string;
    ApprovedAt: string | null;
    RejectedAt: string | null;
    DueDate: string;
    RemainingAmount: number;
    IsPaid: boolean;
  }

export const requestLoan = async (
  loanData: LoanRequest
): Promise<LoanResponse> => {
  const response = await fetch(baseEndpointLoans, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loanData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error requesting loan");
  }

  const data: LoanResponse = await response.json();
  return data;
};

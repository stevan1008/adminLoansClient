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

export interface PaymentRequest {
  loan_id: string;
  amount: number;
}

export interface PaymentResponse {
  ID: string;
  LoanID: string;
  Amount: number;
  Date: string;
  Status: string;
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

export const getActiveLoan = async (
  clientId: string
): Promise<LoanResponse | null> => {
  const response = await fetch(
    `${baseEndpointLoans}/active?clientId=${clientId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error("Failed to fetch active loan");
  }

  const data: LoanResponse = await response.json();
  return data;
};

export const makePayment = async (
  paymentData: PaymentRequest
): Promise<PaymentResponse> => {
  const response = await fetch(`${baseEndpointLoans}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error processing payment");
  }

  const data: PaymentResponse = await response.json();
  return data;
};

export const getLoanHistory = async (): Promise<any[]> => {
  const response = await fetch(`${baseEndpointLoans}/history`);
  if (!response.ok) {
    throw new Error('Failed to fetch loan history');
  }
  return response.json();
};

export const approveLoan = async (loanId: string, adminId: string): Promise<void> => {
  const response = await fetch(`${baseEndpointLoans}/${loanId}/approve?adminId=${adminId}`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to approve loan');
  }
};

export const rejectLoan = async (loanId: string, adminId: string): Promise<void> => {
  const response = await fetch(`${baseEndpointLoans}/${loanId}/reject?adminId=${adminId}`, {
    method: 'POST',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to reject loan');
  }
};
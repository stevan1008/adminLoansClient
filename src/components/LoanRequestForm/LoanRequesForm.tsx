import React, { useState, useEffect } from 'react';
import './LoanRequestForm.css';
import { requestLoan, LoanRequest, getActiveLoan, makePayment } from '../../services/loanService';

const LoanRequestForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [termInMonths, setTermInMonths] = useState<number>(12);
  const [clientId, setClientId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [activeLoan, setActiveLoan] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  useEffect(() => {
    const storedClientId = localStorage.getItem('clientId');
    setClientId(storedClientId);

    if (storedClientId) {
      getActiveLoan(storedClientId)
        .then((loan: any) => {
          if (loan) {
            setActiveLoan(loan);
          }
        })
        .catch((err: any) => {
          setError('Error fetching active loan');
        });
    }
  }, []);

  const handleLoanRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    if (!clientId) {
      setError('No client ID found. Please login again.');
      return;
    }

    const loanData: LoanRequest = { clientId, amount, termInMonths };

    try {
      const response = await requestLoan(loanData);
      setMessage(`Loan request successful. Loan ID: ${response.ID}`);
      setActiveLoan(response);
    } catch (err: any) {
      setError(err.message || 'Failed to request loan');
    }
  };

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    if (!activeLoan) {
      setError('No active loan found.');
      return;
    }

    try {
      const paymentData = {
        loan_id: activeLoan.ID,
        amount: paymentAmount,
      };
      const response = await makePayment(paymentData);
      setMessage(`Payment of ${paymentAmount} made successfully. Remaining balance: ${activeLoan.RemainingAmount - paymentAmount}`);
      setActiveLoan((prevLoan: any) => ({
        ...prevLoan,
        RemainingAmount: prevLoan.RemainingAmount - paymentAmount,
        IsPaid: prevLoan.RemainingAmount - paymentAmount === 0,
      }));
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    }
  };

  return (
    <div className="loan-form-container">
      {activeLoan ? (
        <div className="active-loan-container">
          <h2>Your Active Loan</h2>
          <p>Loan ID: {activeLoan.ID}</p>
          <p>Amount: ${activeLoan.Amount}</p>
          <p>Remaining Balance: ${activeLoan.RemainingAmount}</p>
          <p>Status: {activeLoan.Status}</p>

          {activeLoan.IsPaid ? (
            <p>Your loan is fully paid!</p>
          ) : (
            <form onSubmit={handlePayment}>
              <div className="form-group">
                <label>Payment Amount:</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  required
                  min="1"
                  max={activeLoan.RemainingAmount}
                />
              </div>
              <button type="submit">Make Payment</button>
            </form>
          )}
        </div>
      ) : (
        <div>
          <h2>Request a Loan</h2>
          <form onSubmit={handleLoanRequest}>
            <div className="form-group">
              <label>Loan Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
                min="100"
              />
            </div>
            <div className="form-group">
              <label>Term in Months:</label>
              <input
                type="number"
                value={termInMonths}
                onChange={(e) => setTermInMonths(Number(e.target.value))}
                required
                min="6"
                max="60"
              />
            </div>
            <button type="submit">Submit Loan Request</button>
          </form>
        </div>
      )}

      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoanRequestForm;
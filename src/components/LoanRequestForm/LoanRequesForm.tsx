import React, { useState, useEffect } from 'react';
import './LoanRequestForm.css';
import { requestLoan, LoanRequest } from '../../services/loanService';

const LoanRequestForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [termInMonths, setTermInMonths] = useState<number>(12);
  const [clientId, setClientId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedClientId = localStorage.getItem('clientId');
    setClientId(storedClientId);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (err: any) {
      setError(err.message || 'Failed to request loan');
    }
  };

  return (
    <div className="loan-form-container">
      <h2>Request a Loan</h2>
      <form onSubmit={handleSubmit}>
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
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoanRequestForm;
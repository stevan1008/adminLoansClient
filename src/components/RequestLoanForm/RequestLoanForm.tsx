import React, { useState } from 'react';
import './RequestLoanForm.css';
import { requestLoan, LoanRequest } from '../../services/loanService';

const RequestLoanForm: React.FC = () => {
  const [clientId, setClientId] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [termInMonths, setTermInMonths] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    const loanData: LoanRequest = {
      clientId,
      amount,
      termInMonths,
    };

    try {
      const response = await requestLoan(loanData);
      setMessage(`Loan request submitted: ${response.ID}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="loan-form-container">
      <h2>Request a Loan</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Client ID:</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Loan Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label>Term (Months):</label>
          <input
            type="number"
            value={termInMonths}
            onChange={(e) => setTermInMonths(parseInt(e.target.value, 10))}
            required
          />
        </div>
        <button type="submit">Submit Request</button>
      </form>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RequestLoanForm;
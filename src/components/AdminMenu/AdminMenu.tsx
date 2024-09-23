import React, { useState, useEffect } from 'react';
import './AdminMenu.css';
import { getClients, updateCreditScore } from '../../services/clientService';
import { getLoanHistory, approveLoan, rejectLoan } from '../../services/loanService';

const AdminMenu: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loans, setLoans] = useState<any[]>([]);
  const [creditScore, setCreditScore] = useState<number>(0);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedAdminId = localStorage.getItem('adminId');
    setAdminId(storedAdminId);

    getClients()
      .then((response) => setClients(response))
      .catch((err) => setError('Error fetching clients'));

    getLoanHistory()
      .then((response) => setLoans(response))
      .catch((err) => setError('Error fetching loans'));
  }, []);

  const handleUpdateCreditScore = async (clientId: string) => {
    if (!adminId) {
      setError('No admin ID found. Please login again.');
      return;
    }

    try {
      await updateCreditScore(clientId, creditScore);
      setMessage('Credit score updated successfully');
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error updating credit score');
    }
  };

  const handleApproveLoan = async (loanId: string) => {
    if (!adminId) {
      setError('No admin ID found. Please login again.');
      return;
    }

    try {
      await approveLoan(loanId, adminId);
      setMessage('Loan approved successfully');
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error approving loan');
    }
  };

  const handleRejectLoan = async (loanId: string) => {
    if (!adminId) {
      setError('No admin ID found. Please login again.');
      return;
    }

    try {
      await rejectLoan(loanId, adminId);
      setMessage('Loan rejected successfully');
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error rejecting loan');
    }
  };

  return (
    <div className="admin-menu-container">
      <h2>Admin Dashboard</h2>

      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}

      <h3>Clients</h3>
      <div className="clients-section">
        {clients.map((client) => (
          <div key={client.ID} className="client-item">
            <p>Client ID: {client.ID}</p>
            <p>Full Name: {client.FullName}</p>
            <p>Email: {client.Email}</p>
            <p>Credit Score: {client.CreditScore}</p>
            <input
              type="number"
              value={creditScore}
              onChange={(e) => setCreditScore(Number(e.target.value))}
              placeholder="New Credit Score"
            />
            <button onClick={() => handleUpdateCreditScore(client.ID)}>
              Update Credit Score
            </button>
          </div>
        ))}
      </div>

      <h3>Loans</h3>
      <div className="loans-section">
        {loans.map((loan) => (
          <div key={loan.ID} className="loan-item">
            <p>Loan ID: {loan.ID}</p>
            <p>Client ID: {loan.ClientID}</p>
            <p>Amount: ${loan.Amount}</p>
            <p>Status: {loan.Status}</p>
            {loan.Status === 'Pending' && (
              <div className="loan-actions">
                <button onClick={() => handleApproveLoan(loan.ID)}>
                  Approve
                </button>
                <button onClick={() => handleRejectLoan(loan.ID)}>
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
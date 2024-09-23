import React, { useState } from 'react';
import './RegisterAdminForm.css';
import { registerAdmin, AdminRequest } from '../../services/adminService';

const RegisterAdminForm: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [role, setRole] = useState<string>('General');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    const adminData: AdminRequest = { fullName, role, password };

    try {
      const adminResponse = await registerAdmin(adminData);
      setMessage(`Admin registered successfully: ${adminResponse.ID}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Register as Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <div className="select-wrapper">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="General">General</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RegisterAdminForm;
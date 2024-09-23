import React, { useState } from 'react';
import './LoginAdminForm.css';
import { loginAdmin } from '../../services/adminService';

interface LoginAdminFormProps {
  onLoginSuccess: () => void;
}

const LoginAdminForm: React.FC<LoginAdminFormProps> = ({ onLoginSuccess }) => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    try {
      const response = await loginAdmin(id, password);

      localStorage.setItem('adminId', response.id);

      setMessage(`Login successful: Welcome ${response.id}`);

      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="login-form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
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
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginAdminForm;
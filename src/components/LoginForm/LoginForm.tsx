import React, { useState } from 'react';
import './LoginForm.css';
import { login } from '../../services/loginService';

interface Props {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<Props> = ({ onLoginSuccess }) => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    try {
      const response = await login(id, password);
      setMessage(`Login successful: Welcome ${response.id}`);
      
      localStorage.setItem('clientId', response.id);
      
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
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

export default LoginForm;
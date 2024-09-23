import React, { useState } from 'react';
import './HomeScreen.css';
import RegisterClientForm from '../RegisterClient/RegisterClientForm';
import LoginClientForm from '../LoginForm/LoginForm';
import LoanRequestForm from '../LoanRequestForm/LoanRequesForm';
import RegisterAdminForm from '../RegisterAdmin/RegisterAdminForm';
import LoginAdminForm from '../LoginAdminForm/LoginAdminForm';

const HomeScreen: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(true);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const toggleClientAdmin = (isClientMode: boolean) => {
    setIsClient(isClientMode);
    setIsSignUp(true); // Por defecto, vuelve a Sign Up
  };

  const toggleSignUpLogin = (isSignUpMode: boolean) => {
    setIsSignUp(isSignUpMode);
  };

  const buttonClass = isClient ? 'client' : 'admin';

  return (
    <div className="home-container">
      <h1>Loan Management System</h1>

      {/* Si el cliente está autenticado, muestra el formulario de solicitud de préstamo */}
      {isAuthenticated ? (
        <LoanRequestForm />
      ) : (
        <>
          <div className="toggle-section top">
            <button
              onClick={() => toggleClientAdmin(true)}
              className={`btn ${isClient ? 'active-client' : 'client'}`}
            >
              Client
            </button>
            <button
              onClick={() => toggleClientAdmin(false)}
              className={`btn ${!isClient ? 'active-admin' : 'admin'}`}
            >
              Admin
            </button>
          </div>

          <div className="form-container">
            {isClient ? (
              isSignUp ? (
                <RegisterClientForm />
              ) : (
                <LoginClientForm onLoginSuccess={handleLoginSuccess} />
              )
            ) : isSignUp ? (
              <RegisterAdminForm />
            ) : (
              <LoginAdminForm />
            )}
          </div>

          <div className="toggle-section bottom">
            <button
              onClick={() => toggleSignUpLogin(true)}
              className={`btn ${buttonClass} ${isSignUp ? 'active' : ''}`}
            >
              Sign Up
            </button>
            <button
              onClick={() => toggleSignUpLogin(false)}
              className={`btn ${buttonClass} ${!isSignUp ? 'active' : ''}`}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
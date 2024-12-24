import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === '123') {
      navigate('/admin'); 
    } else {
      setErrorMessage('Invalid password'); 
    }
  };

  return (
    <div className="admin-password-container">
      <h1 className="admin-password-title">Enter Admin Password</h1>
      <form className="admin-password-form" onSubmit={handleSubmit}>
        <input
          className="admin-password-input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button className="admin-password-button" type="submit">
          Submit
        </button>
      </form>
      {errorMessage && <p className="admin-password-error">{errorMessage}</p>}
    </div>
  );
};

export default AdminPasswordPage;

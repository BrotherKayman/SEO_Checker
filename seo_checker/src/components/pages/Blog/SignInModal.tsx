import React, { useState } from 'react';
import './SignInModal.css'; // Import the CSS file for modal

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (username: string, password: string) => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Both fields are required');
      return;
    }

    setError(null);
    onSignIn(username, password);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign In To Like</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SignInModal;

import React, { useState } from 'react';
import '../../../App.css';
import './SignUp.css';

const SignUp: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className='signup-container'>
      <h1>Sign Up</h1>
      <form className='signup-form' onSubmit={handleFormSubmit}>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' name='name' placeholder='John' required />

        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' name='email' placeholder='your@email.com' required />

        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' required />

        <button type='submit' className='btn-submit'>Sign Up</button>
      </form>
      <div className='google-signin'>
        <button onClick={() => window.open('https://accounts.google.com/signin', '_blank')} className='btn-google'>
          Sign in with Google
        </button>
      </div>

      {/* Popup Component */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>Check your email</h2>
            <p>Please check your email and click on the verification link to complete your signup.</p>
            <button className="popup-close-btn" onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;

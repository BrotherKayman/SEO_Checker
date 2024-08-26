//import React, { useState } from 'react';
import '../../../App.css';
import './SignUp.css';


const SignUp: React.FC = () => {
  const handleGoogleSignIn = () => {
    window.open('https://accounts.google.com/signin', '_blank');
  };

  return (
    <div className='signup-container'>
      <h1>Sign Up</h1>
      <form className='signup-form'>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' name='name' placeholder='John' required />

        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' name='email' placeholder='your@email.com' required />

        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' required />

        <button type='submit' className='btn-submit'>Sign Up</button>
      </form>
      <div className='google-signin'>
        <button onClick={handleGoogleSignIn} className='btn-google'>
          Sign in with Google
        </button>
      </div>
      
    </div>
  );
};

export default SignUp;

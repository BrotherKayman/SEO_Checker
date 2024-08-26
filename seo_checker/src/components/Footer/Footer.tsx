import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <p className='footer-text'>© Kagiso Motlhaoleng. All rights reserved.</p>
        <Link to='/sign-up' className='footer-button'>
          Sign Up
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

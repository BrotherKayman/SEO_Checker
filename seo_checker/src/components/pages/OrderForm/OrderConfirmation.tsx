import React from 'react';

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Order Successful!</h2>
        <p>Your order has been placed successfully. Check your email for the confirmation.</p>
        <button className="close-modal-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;

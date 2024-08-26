import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    paymentMethod: '',
    cardNumber: '',        
    expiryDate: '',        
    cvv: '',               
    paypalEmail: ''
  });

  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsOrderSuccessful(true);
  };

  const closeModal = () => {
    setIsOrderSuccessful(false);
  };

  return (
    <div className="order-form-container">
      <h1>Order Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="order-form-grid">
          
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Address</h2>
            <div className="form-group">
              <label htmlFor="address">Street Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">ZIP Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Payment Method</h2>
            <div className="form-group">
              <label htmlFor="paymentMethod">Select Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bankTransfer">Bank Transfer</option>
              </select>
            </div>
          </div>

          {formData.paymentMethod === 'creditCard' && (
            <div className="form-section">
              <h2>Credit Card Details</h2>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {formData.paymentMethod === 'paypal' && (
            <div className="form-section">
              <h2>PayPal Details</h2>
              <div className="form-group">
                <label htmlFor="paypalEmail">PayPal Email</label>
                <input
                  type="email"
                  id="paypalEmail"
                  name="paypalEmail"
                  value={formData.paypalEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {formData.paymentMethod === 'bankTransfer' && (
            <div className="form-section">
              <h2>Bank Transfer Details</h2>
              <div className="form-group">
                <label htmlFor="bankName">Bank Name</label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountNumber">Account Number</label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="routingNumber">Routing Number</label>
                <input
                  type="text"
                  id="routingNumber"
                  name="routingNumber"
                  value={formData.routingNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">Submit Order</button>
      </form>

      {/* Confirmation Modal */}
      {isOrderSuccessful && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Order Successful!</h2>
            <p>Your order has been successful, check your email for confirmation.</p>
            <button className="close-modal-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;

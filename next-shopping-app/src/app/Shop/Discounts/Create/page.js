'use client'

import { useState } from "react";

export default function AddDiscountCode() {
  const [formData, setFormData] = useState({
    code: '',
    discount_percentage: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/Api/discounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMessage('Discount code added successfully!');
      setFormData({ code: '', discount_percentage: '' });
    } else {
      setMessage('Failed to add discount code.');
    }
  };

  return (
    <div>
      <h1>Add a Discount Code</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="code"
          placeholder="Discount Code"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount Percentage"
          value={formData.discount_percentage}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Discount Code</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

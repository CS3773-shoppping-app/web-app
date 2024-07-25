'use client'

import { useState } from "react";
import { FaPercentage } from 'react-icons/fa';

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
    <div className="max-w-2xl mx-auto mt-12 p-10 bg-gradient-to-r from-violet-100 via-white to-violet-100 shadow-2xl rounded-xl">
      <h1 className="text-5xl font-extrabold mb-10 text-violet-900 flex items-center">
        <FaPercentage className="w-10 h-10 mr-4" /> Add a Discount Code
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-lg text-gray-700 font-semibold mb-2">Discount Code</label>
          <input
            type="text"
            name="code"
            placeholder="Enter discount code"
            value={formData.code}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-gray-700 font-semibold mb-2">Discount Percentage</label>
          <input
            type="number"
            name="discount_percentage"
            placeholder="Enter discount percentage"
            value={formData.discount_percentage}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition duration-300"
            required
          />
        </div>
        <button type="submit" className="w-full bg-violet-600 text-white py-3 rounded-lg shadow-lg hover:bg-violet-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          Add Discount Code
        </button>
      </form>
      {message && <p className="mt-6 text-center text-lg font-medium text-gray-700">{message}</p>}
    </div>
  );
}

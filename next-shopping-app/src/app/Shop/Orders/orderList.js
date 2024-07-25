'use client';
import React from 'react';

export default function OrderList({ orders }) {
  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-violet-100 via-white to-violet-100 shadow-2xl rounded-xl">
      <h1 className="text-4xl font-extrabold mb-10 text-violet-900">All Orders</h1>
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order.order_id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <div className="flex justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-700">Order ID: {order.order_id}</p>
                <p className="text-gray-600">Customer ID: {order.customer_id}</p>
                <p className="text-gray-600">Date: {order.order_date}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-700">Total Cost: ${order.total_amount}</p>
                <p className={`text-sm ${order.fulfilled ? 'text-green-600' : 'text-red-600'}`}>
                  {order.fulfilled ? 'Fulfilled' : 'Unfulfilled'}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


'use client';
import React from 'react';

export default function OrderList({ orders }) {
  return (
    <div>
      <h1>All Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.order_id}>
            Order ID: {order.order_id}, Customer: {order.customer_id}, Total Cost: {order.total_amount}, Date: {order.order_date}, Fulfilled: {order.fulfilled}
          </li>
        ))}
      </ul>
    </div>
  );
}

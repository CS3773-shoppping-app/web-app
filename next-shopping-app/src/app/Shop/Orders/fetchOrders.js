'use client';
import { useEffect, useState } from 'react';

export function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/Api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>All Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.order_id}>
            Order ID: {order.order_id}, Customer: {order.customer_id}, Total Cost: {order.total_amount}, Date: {order.order_date}, Fulfilled: {order.fulfilled}
          </li>
        ))}
      </ul>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function SortableOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState('date');
  const [ascending, setAscending] = useState(true);

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

  useEffect(() => {
    let sortedOrders = [...orders];
    switch (sortMethod) {
      case 'date':
        sortedOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'customer':
        sortedOrders.sort((a, b) => a.customer_id.localeCompare(b.customer_id));
        break;
      case 'total_amount':
        sortedOrders.sort((a, b) => a.total_amount - b.total_amount);
        break;
      default:
        break;
    }
    if (!ascending) sortedOrders.reverse();
    setOrders(sortedOrders);
  }, [sortMethod, ascending]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Sortable Orders</h1>
      <div>
        <label htmlFor="sortMethod">Sort By: </label>
        <select id="sortMethod" value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
          <option value="date">Date</option>
          <option value="customer">Customer</option>
          <option value="total_amount">Total Cost</option>
        </select>
        <button onClick={() => setAscending(!ascending)}>
          {ascending ? 'Ascending' : 'Descending'}
        </button>
      </div>
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

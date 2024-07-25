'use client';
import { useState, useEffect } from 'react';

export default function SortableOrderList({ orders }) {
    const [sortedOrders, setSortedOrders] = useState([]);

    useEffect(() => {
        const sorted = [...orders].sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
        setSortedOrders(sorted);
    }, [orders]);

    if (sortedOrders.length === 0) return <p>No orders available.</p>;

    return (
        <div>
            <h1>Sortable Orders</h1>
            <ul>
                {sortedOrders.map((order) => (
                    <li key={order.order_id}>
                        Order ID: {order.order_id}, Customer: {order.customer_id}, Total Cost: {order.total_amount}, Date: {order.order_date}, Fulfilled: {order.fulfilled}
                    </li>
                ))}
            </ul>
        </div>
    );
}

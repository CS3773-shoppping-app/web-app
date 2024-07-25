'use client';
import { useState, useEffect } from 'react';

export default function UnfulfilledOrderList({ orders }) {
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const unfulfilledOrders = orders.filter(order => order.fulfilled === 'FALSE');
        setFilteredOrders(unfulfilledOrders);
    }, [orders]);

    if (filteredOrders.length === 0) return <p>No unfulfilled orders available.</p>;

    return (
        <div>
            <h1>Unfulfilled Orders</h1>
            <ul>
                {filteredOrders.map((order) => (
                    <li key={order.order_id}>
                        Order ID: {order.order_id}, Customer: {order.customer_id}, Total Cost: {order.total_amount}, Date: {order.order_date}, Fulfilled: {order.fulfilled}
                    </li>
                ))}
            </ul>
        </div>
    );
}

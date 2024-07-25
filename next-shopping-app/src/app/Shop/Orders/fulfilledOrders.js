'use client';
import { useState, useEffect } from 'react';

export default function FulfilledOrderList({ orders }) {
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const fulfilledOrders = orders.filter(order => order.fulfilled === 'TRUE');
        setFilteredOrders(fulfilledOrders);
    }, [orders]);

    if (filteredOrders.length === 0) return <p>No fulfilled orders available.</p>;

    return (
        <div>
            <h1>Fulfilled Orders</h1>
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

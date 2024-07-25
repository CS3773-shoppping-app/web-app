'use client';
import { useState, useEffect } from 'react';

export default function UnfulfilledOrderList({ orders }) {
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const unfulfilledOrders = orders.filter(order => order.fulfilled === 'FALSE');
        setFilteredOrders(unfulfilledOrders);
    }, [orders]);

    if (filteredOrders.length === 0) return <p className="text-center mt-8 text-gray-700">No unfulfilled orders available.</p>;

    return (
        <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-violet-100 via-white to-violet-100 shadow-2xl rounded-xl">
            <h1 className="text-4xl font-extrabold mb-10 text-violet-900">Unfulfilled Orders</h1>
            <ul className="space-y-4">
                {filteredOrders.map((order) => (
                    <li key={order.order_id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-lg font-semibold text-gray-700">Order ID: {order.order_id}</p>
                                <p className="text-gray-600">Customer ID: {order.customer_id}</p>
                                <p className="text-gray-600">Date: {order.order_date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-gray-700">Total Cost: ${order.total_amount}</p>
                                <p className="text-sm text-red-600">Unfulfilled</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}


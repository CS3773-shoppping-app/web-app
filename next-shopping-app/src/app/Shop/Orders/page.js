'use client';
import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import OrderList from './orderList';
import UnfulfilledOrderList from './unfulfilledOrders';
import FulfilledOrderList from './fulfilledOrders';
import SortableOrderList from './sortableOrderList';
import { useSearchParams } from 'next/navigation';


async function fetchAllOrders() {
    try {
        const response = await fetch('/Api/orders');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

function OrdersComponent({ orders }) {
    const searchParams = useSearchParams();
    const view = searchParams.get('view');

    const [currentView, setCurrentView] = useState('all');

    useEffect(() => {
        if (view) {
            setCurrentView(view);
        }
    }, [view]);

    return (
        <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-violet-100 via-white to-violet-100 shadow-2xl rounded-xl">
            <h1 className="text-4xl font-extrabold mb-10 text-violet-900">Orders</h1>
            <div className="flex space-x-4 mb-8">
                <button
                    onClick={() => setCurrentView('all')}
                    className={`px-4 py-2 rounded-lg shadow-md focus:outline-none transition duration-300 ${
                        currentView === 'all' ? 'bg-violet-600 text-white' : 'bg-white text-violet-600 border border-violet-600'
                    }`}
                >
                    All Orders
                </button>
                <button
                    onClick={() => setCurrentView('unfulfilled')}
                    className={`px-4 py-2 rounded-lg shadow-md focus:outline-none transition duration-300 ${
                        currentView === 'unfulfilled' ? 'bg-violet-600 text-white' : 'bg-white text-violet-600 border border-violet-600'
                    }`}
                >
                    Unfulfilled Orders
                </button>
                <button
                    onClick={() => setCurrentView('fulfilled')}
                    className={`px-4 py-2 rounded-lg shadow-md focus:outline-none transition duration-300 ${
                        currentView === 'fulfilled' ? 'bg-violet-600 text-white' : 'bg-white text-violet-600 border border-violet-600'
                    }`}
                >
                    Fulfilled Orders
                </button>
                <button
                    onClick={() => setCurrentView('sortable')}
                    className={`px-4 py-2 rounded-lg shadow-md focus:outline-none transition duration-300 ${
                        currentView === 'sortable' ? 'bg-violet-600 text-white' : 'bg-white text-violet-600 border border-violet-600'
                    }`}
                >
                    Sortable Orders
                </button>
            </div>
            {currentView === 'all' && <OrderList orders={orders} />}
            {currentView === 'unfulfilled' && <UnfulfilledOrderList orders={orders} />}
            {currentView === 'fulfilled' && <FulfilledOrderList orders={orders} />}
            {currentView === 'sortable' && <SortableOrderList orders={orders} />}
        </div>
    );
}

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function loadOrders() {
            const allOrders = await fetchAllOrders();
            setOrders(allOrders);
        }
        loadOrders();
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrdersComponent orders={orders} />
        </Suspense>
    );
}


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
        <div>
            <h1>Orders</h1>
            <div>
                <button onClick={() => setCurrentView('all')}>All Orders</button>
                <button onClick={() => setCurrentView('unfulfilled')}>Unfulfilled Orders</button>
                <button onClick={() => setCurrentView('fulfilled')}>Fulfilled Orders</button>
                <button onClick={() => setCurrentView('sortable')}>Sortable Orders</button>
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

'use client'
import { useState } from 'react';
import { Suspense } from 'react';
import OrderList from './fetchOrders';
import UnfulfilledOrderList from './unfulfilledOrders';
import FulfilledOrderList from './fulfilledOrders';
import SortableOrderList from './sortableOrderList';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function OrdersComponent() {
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
      {currentView === 'all' && <OrderList />}
      {currentView === 'unfulfilled' && <UnfulfilledOrderList />}
      {currentView === 'fulfilled' && <FulfilledOrderList />}
      {currentView === 'sortable' && <SortableOrderList />}
    </div>
  );
}

export default function OrdersPage(){
    <Suspense fallback={<div>Loading...</div>}>
        <OrdersComponent />;
    </Suspense>
    
}

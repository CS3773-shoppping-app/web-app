//Shop/Discounts/page.js
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DiscountList() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAllDiscounts() {
    try {
        const response = await fetch('/Api/discounts');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching discounts:', error);
        return [];
    }
}

  useEffect(() => {
    async function loadDiscounts() {
      try {
        const alldiscounts = await fetchAllDiscounts();
        setDiscounts(alldiscounts);
      } catch (error) {
        console.error('Error fetching discount codes:', error);
      } finally {
        setLoading(false);
      }
    }loadDiscounts();
  }, []);

  if (loading) return <p className="text-center mt-8 text-gray-700">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-violet-100 via-white to-violet-100 shadow-2xl rounded-xl">
      <h1 className="text-4xl font-extrabold mb-10 text-violet-900">Discount Codes</h1>
      <Link href="/Shop/Discounts/Create" className="mb-8 px-4 py-2 bg-violet-600 text-white rounded-lg shadow-lg hover:bg-violet-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-block">
        Create
      </Link>
      <ul className="space-y-4">
        {discounts.map((discount) => (
          <li key={discount.discount_code_id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-gray-700">Code: {discount.code}</p>
                <p className="text-gray-600">Percent off: {discount.discount_percentage}%</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}



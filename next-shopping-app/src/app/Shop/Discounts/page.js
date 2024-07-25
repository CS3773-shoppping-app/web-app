'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DiscountList() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscounts() {
      try {
        const response = await fetch('/Api/discounts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDiscounts(data);
      } catch (error) {
        console.error('Error fetching discount codes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDiscounts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Discount Codes</h1>
      <button><Link href="/Shop/Discounts/Create">Create</Link></button>
      <ul>
        {discounts.map((discount) => (
          <li key={discount.discount_code_id}>
            Code: {discount.code} - Percent off: {discount.discount_percentage}
          </li>
        ))}
      </ul>
    </div>
  );
}

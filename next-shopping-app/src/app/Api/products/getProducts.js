'use client';

export async function fetchProducts() {
  const res = await fetch('/api/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  console.log(data);
  return data;
}

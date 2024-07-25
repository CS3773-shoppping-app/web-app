'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../Api/products/getProducts.js';
import { FaSort, FaSearch } from 'react-icons/fa';

function ItemCard({ item }) {
    const imageUrl = item?.image_url || "/defaultImage.png"; 
    const itemName = item?.name || "No name provided";
    const itemPrice = item?.price ||  "Price not available";
    const itemQuantity = item?.quantity_available || "Quantity not available";
    const itemId = item.item_id;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <Image src={imageUrl} alt={itemName} width={300} height={300} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{itemName}</h2>
                <p className="text-gray-600 mb-2">{itemPrice}</p>
                <p className="text-sm text-gray-500 mb-4">In stock: {itemQuantity}</p>
                <Link href={`/Shop/Items/Edit/${item.item_id}`} className="text-blue-500 hover:underline">
                    Edit
                </Link>
            </div>
        </div>
    );
}

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('Fetched data is not an array', data);
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            }
        };
        getProducts();
    }, []);

    const sortedAndFilteredProducts = products
        .filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
            if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Product List</h1>
            <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
                <div className="relative w-full md:w-64 mb-4 md:mb-0">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex space-x-4">
                    <button onClick={() => handleSort('name')} className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                        Name <FaSort className="ml-2" />
                    </button>
                    <button onClick={() => handleSort('price')} className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                        Price <FaSort className="ml-2" />
                    </button>
                    <button onClick={() => handleSort('quantity_available')} className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                        Stock <FaSort className="ml-2" />
                    </button>
                </div>
            </div>
            {sortedAndFilteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedAndFilteredProducts.map((product) => (
                        <ItemCard key={product?.item_id || product?.name || Math.random()} item={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-8">No products available</p>
            )}
        </div>
    );
}

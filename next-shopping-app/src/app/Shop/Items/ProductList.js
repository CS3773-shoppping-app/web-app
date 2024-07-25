'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../Api/products/getProducts.js';

function ItemRow({ item }) {
    const imageUrl = item?.image_url || "/public/defaultImage.png";
    const itemName = item?.name || "No name provided";
    const itemPrice = item?.price ||  "Price not available";
    const itemQuantity = item?.quantity_available || "Quantity not available";

    return (
        <div className="flex flex-row items-center mb-4 p-4 border-b">
            <input type="radio" className="mr-4" />
            <Image src={imageUrl} alt={itemName} className="object-cover h-32 w-32 mr-4" />
            <p className="grow">{itemName}</p>
            <p className="mr-4">{itemPrice}</p>
            <p className="mr-4">{itemQuantity}</p>
            <Link href={`/Shop/Items/Edit/${item.item_id}`}>
                <a className="text-blue-500 hover:underline">Edit</a>
            </Link>
        </div>
    );
}

export default function ProductsList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                if (data) {
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

    return (
        <div className="container mx-auto mt-8">
            {products.length > 0 ? (
                products.map((product) => (
                    <ItemRow key={product?.item_id || product?.name} item={product} />
                ))
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
}

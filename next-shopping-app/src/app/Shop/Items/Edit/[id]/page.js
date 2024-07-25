'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const EditItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/Api/products/${id}`);
      const data = await res.json();
      setItem(data.item);
      setName(data.item.name);
      setDescription(data.item.description);
      setPrice(data.item.price);
      setStock(data.item.quantity_available);
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image) {
      formData.append('image', image);
    }

    const res = await fetch(`/Api/products/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (res.ok) {
      router.push('/Shop/Items');
    }
  };

  return (
    <div>
      <h1>Edit Item</h1>
      {item && (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            Stock:
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </label>
          <label>
            Image:
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <button type="submit">Update Item</button>
        </form>
      )}
    </div>
  );
};

export default EditItemPage;

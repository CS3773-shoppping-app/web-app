import { useState } from 'react';

export default function ProductUpload() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockAmount, setStockAmount] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stockAmount', stockAmount);
    formData.append('image', image);
    
    try {
      const response = await fetch('/Api/products/upload', formData, {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
      });
      
      if (response.status === 200) {
        alert('Product uploaded successfully');
        setName('');
        setDescription('');
        setPrice('');
        setStockAmount('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Failed to upload product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Product Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>
      <div>
        <label>Price</label>
        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Stock Amount</label>
        <input type="number" value={stockAmount} onChange={(e) => setStockAmount(e.target.value)} required />
      </div>
      <div>
        <label>Product Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      </div>
      <button type="submit">Upload Product</button>
    </form>
  );
}

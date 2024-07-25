import { useState, useRef } from 'react';
import { FaUpload } from 'react-icons/fa';

export default function ProductUpload() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockAmount, setStockAmount] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stockAmount', stockAmount);
    formData.append('image', image);
    
    try {
      const response = await fetch('/Api/products/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Product uploaded successfully');
        setName('');
        setDescription('');
        setPrice('');
        setStockAmount('');
        setImage(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setMessage(`Failed to upload product: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading product:', error);
      setMessage('Failed to upload product: Network error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-10 bg-gradient-to-r from-violet-100 via-white to-violet-100 shadow-2xl rounded-xl">
      <h1 className="text-5xl font-extrabold mb-10 text-violet-900 flex items-center">
        <FaUpload className="w-10 h-10 mr-4" /> Upload New Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-lg text-gray-700 font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-gray-700 font-semibold mb-2">Product Description</label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition duration-300"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-lg text-gray-700 font-semibold mb-2">Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-gray-700 font-semibold mb-2">Stock Amount</label>
          <input
            type="number"
            name="stockAmount"
            placeholder="Enter stock amount"
            value={stockAmount}
            onChange={(e) => setStockAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-gray-700 font-semibold mb-2">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition duration-300"
            required
            ref={fileInputRef}
          />
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="mt-4 max-w-full h-auto rounded-lg shadow-md" />
          )}
        </div>
        <button 
          type="submit" 
          className="w-full bg-violet-600 text-white py-3 rounded-lg shadow-lg hover:bg-violet-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:bg-violet-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload Product'}
        </button>
      </form>
      {message && <p className={`mt-6 text-center text-lg font-medium ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </div>
  );
}
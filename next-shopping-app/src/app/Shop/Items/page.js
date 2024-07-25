import ProductList from "./ProductList.js";

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto mt-12 p-8 bg-gradient-to-r from-violet-100 via-white to-violet-100 shadow-2xl rounded-xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-violet-900">Shop Items</h1>
      </div>
      <div className="flex justify-between text-gray-700 font-semibold mb-6">
        <span className="w-1/5 text-center">Image</span>
        <span className="w-1/5 text-center">Product Name</span>
        <span className="w-1/5 text-center">Price</span>
        <span className="w-1/5 text-center">Stock</span>
        <span className="w-1/5 text-center">Actions</span>
      </div>
      <hr className="mb-6"/>
      <ProductList />
    </div>
  );
}

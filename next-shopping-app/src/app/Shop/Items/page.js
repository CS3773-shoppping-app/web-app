import ProductList from "./ProductList.js";

export default function Page() {
  return (
    <div className="flex flex-col justify-center text-slate-950">
      <div className="grow mx-auto">
        <h1>Shop Items</h1>
      </div>
      <div className="grow mx-auto">
        <span>Image</span>
        <span>Product name</span>
        <span>Price</span>
        <span>Stock</span>
      </div>
      <hr></hr>
      <ProductList />
    </div>
  );
}

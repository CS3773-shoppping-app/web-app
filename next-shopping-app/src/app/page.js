export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <div>
      <h1>Welcome</h1>
    </div>
      <div className="grow mx-auto">
        <h1>Shop Items</h1>
      </div>
      <div className="grow mx-auto">
        <span>Image</span>
        <span>Product name</span>
        <span>Price</span>
        <span>Stock</span>
      </div>
    </div>
  );
  };
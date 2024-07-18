import Image from "next/image";
import Link from "next/link";
import { Input } from "postcss";
import ProductList from "./ProductList.js";

function ItemRow(){
  return (
    <div className="flex flex-row ">
      <Input type="radio"></Input>
      <Image className="h-32 w-32"></Image>
      <p className="grow"></p>
      <p className=""></p>
      <p className=""></p>
      <Link href="">Edit</Link>
    </div>
  )
}

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

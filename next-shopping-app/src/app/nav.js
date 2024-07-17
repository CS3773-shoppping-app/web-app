import "./globals.css";
import Link from "next/link";

export default function Navigation(){
    return(
        <div className="absolute text-slate-950 bg-violet-100 inset-y-0 left-0 px-8 mr-2 min-w-64">
            <nav className="mt-8 mx-auto relative h-100">
                <ul className="mb-16 top-0">
                    <li className="mb-16">
                        <h3 className="text-lg font-bold">Shop</h3>
                        <ul className="pl-4">
                            <li>
                                <Link href="/Shop/Items" className="text-sm">Add Item</Link>
                            </li>
                            <li>
                                <a className="text-sm">All Item</a>
                            </li>
                            <li>
                                <a className="text-sm">Add Discount</a>
                            </li>
                            <li>
                                <a className="text-sm">All Discounts</a>
                            </li>
                        </ul>
                    </li>
                    <li className="mb-4">
                        <h3 className="text-lg font-bold">Orders</h3>
                        <ul className="pl-4">
                            <li>
                                <a className="text-sm">All Orders</a>
                            </li>
                            <li>
                                <a className="text-sm">Open Orders</a>
                            </li>
                            <li>
                                <a className="text-sm">Past Orders</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul className="bottom-0">
                    <li>
                        <h3 className="text-lg font-bold">Management</h3>
                        <ul className="pl-4">
                            <li>
                                <a className="text-sm">Users</a>
                            </li>
                        </ul>
                    </li>
                </ul>
        </nav>
        </div>
    );
}
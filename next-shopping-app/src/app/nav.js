import "./globals.css";
import Link from "next/link";

export default function Navigation(){
    return(
        <div className="fixed text-slate-950 bg-violet-100 inset-y-0 left-0 px-8 mr-2 min-w-64">
            <nav className="mt-8 mx-auto relative h-100">
                <ul className="mb-16 top-0">
                    <li className="mb-16">
                        <h3 className="text-lg font-bold">Shop</h3>
                        <ul className="pl-4">
                            <li>
                                <Link href="/Shop/Items/Upload" className="text-sm">Add Item</Link>
                            </li>
                            <li>
                                <Link href="/Shop/Items" className="text-sm">All Item</Link>
                            </li>
                            <li>
                                <Link href="/Shop/Discounts/Create" className="text-sm">Add Discount</Link>
                            </li>
                            <li>
                                <Link href="/Shop/Discounts" className="text-sm">All Discounts</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="mb-4">
                        <h3 className="text-lg font-bold">Orders</h3>
                        <ul className="pl-4">
                            <li>
                                <Link href="/Shop/Orders?view=all">All Orders</Link>
                            </li>
                            <li>
                                <Link href="/Shop/Orders?view=unfufilled">Open Orders</Link>
                            </li>
                            <li>
                                <Link href="/Shop/Orders?view=fufilled">Past Orders</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul className="bottom-0">
                    <li>
                        <h3 className="text-lg font-bold">Management</h3>
                        <ul className="pl-4">
                            <li>
                                <Link href="/Shop/Users">Users</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
        </nav>
        </div>
    );
}
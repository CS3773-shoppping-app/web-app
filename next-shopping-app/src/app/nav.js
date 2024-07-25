'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { FaShoppingBag, FaTag, FaClipboardList, FaUsers } from 'react-icons/fa';

const navStyles = `
  .nav-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
`;

const NavItem = ({ href, icon: Icon, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
  
    return (
      <li className="transform transition-transform duration-200 hover:translate-x-2">
        <Link href={href} className={`flex items-center py-2 px-4 rounded transition-all duration-200 ${
          isActive 
            ? 'bg-violet-600 text-white shadow-md' 
            : 'text-gray-700 hover:bg-violet-100 hover:text-violet-600'
        }`}>
          {Icon && <Icon className="w-5 h-5 mr-3" />}
          <span>{children}</span>
        </Link>
      </li>
    );
  };
  
  const NavSection = ({ title, icon: Icon, children }) => {
    const [isOpen, setIsOpen] = useState(true);
  
    return (
      <div className="mb-6">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="flex items-center w-full text-left text-lg font-semibold text-gray-800 hover:text-violet-600 transition-colors duration-200"
        >
          {Icon && <Icon className="w-6 h-6 mr-2" />}
          {title}
          <svg className={`w-4 h-4 ml-auto transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className={`mt-2 ml-6 space-y-2 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <ul className="nav-list">
            {children}
          </ul>
        </div>
      </div>
    );
  };

  export default function Navigation() {
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      setMounted(true);
    }, []);
  
    return (
      <>
        <style jsx global>{navStyles}</style>
        <div className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-800 shadow-lg overflow-y-auto transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <nav className="p-6">
            <div className="mb-10">
              <h1 className="text-2xl font-bold text-violet-800">admin </h1>
            </div>
            <div className="space-y-8">
              <NavSection title="Shop" icon={FaShoppingBag}>
                <NavItem href="/Shop/Items/Upload" icon={FaShoppingBag}>Add Item</NavItem>
                <NavItem href="/Shop/Items" icon={FaShoppingBag}>All Items</NavItem>
                <NavItem href="/Shop/Discounts/Create" icon={FaTag}>Add Discount</NavItem>
                <NavItem href="/Shop/Discounts" icon={FaTag}>All Discounts</NavItem>
              </NavSection>
              <NavSection title="Orders" icon={FaClipboardList}>
                <NavItem href="/Shop/Orders?view=all" icon={FaClipboardList}>All Orders</NavItem>
                <NavItem href="/Shop/Orders?view=unfufilled" icon={FaClipboardList}>Open Orders</NavItem>
                <NavItem href="/Shop/Orders?view=fufilled" icon={FaClipboardList}>Past Orders</NavItem>
              </NavSection>
              <NavSection title="Management" icon={FaUsers}>
                <NavItem href="/Shop/Users" icon={FaUsers}>Users</NavItem>
              </NavSection>
            </div>
          </nav>
        </div>
      </>
    );
  }
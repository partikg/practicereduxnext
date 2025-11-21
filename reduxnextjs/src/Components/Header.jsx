"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);

    // cart count
    const cartCount = useSelector((state) =>
        state.cart.cartItems.reduce((t, i) => t + i.qty, 0)
    );

    useEffect(() => {
        axios.get("http://localhost:1000/api/categories")
            .then(res => setCategories(res.data.categories))
            .catch((err) => console.log(err));
    }, []);

    return (
        <header className="p-4 bg-gray-900 text-white flex items-center justify-between">

            <div className="flex items-center gap-6">
                <Link href="/" className="hover:text-yellow-300">Home</Link>

                {/* Dropdown */}
                <div className="relative">
                    <button
                        className="hover:text-yellow-300"
                        onClick={() => setOpen(!open)}
                    >
                        Products ▼
                    </button>

                    {open && (
                        <div className="absolute left-0 mt-2 bg-gray-800 shadow-lg rounded-lg p-3 w-56 z-50">

                            {categories.map((cat, index) => {
                                const slug = cat.slug || cat.name || cat; // safe
                                const title = cat.name || cat.slug || cat; // safe

                                return (
                                    <Link
                                        key={index}
                                        href={`/products/${slug}`}
                                        className="block px-3 py-2 hover:bg-gray-700 rounded capitalize"
                                        onClick={() => setOpen(false)}
                                    >
                                        {title}
                                    </Link>
                                );
                            })}

                        </div>
                    )}
                </div>
            </div>

            {/* CART */}
            <Link href="/cart" className="relative bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">
                Cart
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-1 rounded-full">
                        {cartCount}
                    </span>
                )}
            </Link>
        </header>
    );
}

"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";

export default function AddBtn({ product }) {
    const dispatch = useDispatch();

    function handleAdd() {
        dispatch(
            addToCart({
                ...product,
                id: product.id || product._id,   // ⭐ FIX: normalize ID for Redux
            })
        );
    }

    return (
        <button
            onClick={handleAdd}
            className="mt-2 bg-black text-white px-3 py-1 rounded"
        >
            Add to Cart
        </button>
    );
}

"use client";

import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "@/redux/slice/cartSlice";

export default function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );


    async function handleCheckout() {
        // Prepare data
        const bodyData = {
            user_id: "64f123abcde4567890abcd12", // sample user_id
            products: cartItems,
            total: cartTotal,
            currency: "INR"
        };

        // Call placeorder API
        const res = await fetch("http://localhost:1000/api/orders/placeorder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyData)
        });

        const data = await res.json();

        if (data.success) {
            openRazorpayPopup(data);
        } else {
            alert("Order failed!");
        }
    }

    function openRazorpayPopup(orderData) {
        const options = {
            key: "rzp_test_RghXFo7rcpVb1U", // YOUR KEY ID
            amount: orderData.amount, // already in paise
            currency: orderData.currency,
            name: "Redux Shop",
            description: "Order Payment",
            order_id: orderData.razorpay_order_id,

            handler: async function (response) {
                // Payment success
                await fetch("http://localhost:1000/api/orders/confirmorder", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        razorpay_order_id: orderData.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        success: true
                    })
                });

                alert("Payment Successful!");
            },

            modal: {
                ondismiss: async function () {
                    // Payment closed or failed
                    await fetch("http://localhost:1000/api/orders/confirmorder", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: orderData.razorpay_order_id,
                            razorpay_payment_id: null,
                            success: false
                        })
                    });

                    alert("Payment cancelled or failed!");
                }
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-center gap-4 border p-3 mb-3 rounded"
                    >
                        {/* Product Name */}
                        <h2 className="capitalize w-40">{item.title} ₹{item.price}</h2>

                        {/* Price */}
                        <p className="font-bold">₹{item.price * item.qty}</p>


                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => dispatch(decreaseQty(item.id))}
                                className="px-3 py-1 bg-gray-300 rounded"
                            >
                                -
                            </button>

                            <span className="font-bold">{item.qty}</span>

                            <button
                                onClick={() => dispatch(increaseQty(item.id))}
                                className="px-3 py-1 bg-gray-300 rounded"
                            >
                                +
                            </button>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="ml-auto text-red-600 font-semibold"
                        >
                            Remove
                        </button>

                    </div>
                ))
            )}

            <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Checkout
            </button>

        </div>
    );
}

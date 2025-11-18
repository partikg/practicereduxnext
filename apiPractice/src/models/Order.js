const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    products: [{
        product_id: String,
        title: String,
        price: Number,
        qty: Number,
    }],
    total: { type: Number, required: true },      // in rupees e.g. 599
    currency: { type: String, default: "INR" },
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    status: { type: Number, default: 1 }, // 1=pending,2=success,3=failed
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);

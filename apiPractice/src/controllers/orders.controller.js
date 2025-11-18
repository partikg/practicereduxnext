const Order = require("../models/Order");
const razorpay = require("../utils/razorpay");

exports.placeorder = async (req, res) => {
    try {
        const { user_id, products, total, currency } = req.body;

        if (!products || !total) {
            return res.status(400).json({ success: false, message: "products and total required" });
        }

        // 1) Save order in DB (pending)
        const order = new Order({
            user_id,
            products,
            total,
            currency: currency || "INR",
            status: 1,
        });

        await order.save();

        // 2) Create Razorpay order (amount in paise)
        const options = {
            amount: Math.round(total * 100), // rupees -> paise
            currency: order.currency,
            receipt: `receipt_${order._id}`,
            notes: {
                orderId: String(order._id),
            },
        };

        const rzpOrder = await razorpay.orders.create(options);

        // 3) Save razorpay_order_id
        order.razorpay_order_id = rzpOrder.id;
        await order.save();

        // 4) Send minimal required data to frontend
        res.json({
            success: true,
            orderId: order._id,
            razorpay_order_id: rzpOrder.id,
            amount: rzpOrder.amount,
            currency: rzpOrder.currency,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.confirmorder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, success } = req.body;

        if (!razorpay_order_id) {
            return res.status(400).json({ success: false, message: "razorpay_order_id missing" });
        }

        const order = await Order.findOne({ razorpay_order_id });
        if (!order) return res.status(404).json({ success: false, message: "order not found" });

        order.razorpay_payment_id = razorpay_payment_id || null;
        order.status = success ? 2 : 3;
        await order.save();

        res.json({ success: true, message: "order updated", status: order.status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

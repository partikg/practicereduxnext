require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static uploads (if you need)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const ordersRoutes = require("./src/routes/orders.routes");
const productRoutes = require("./src/routes/products.routes");
app.use("/api/orders", ordersRoutes);
app.use("/api/categories", require("./src/routes/categories.routes"));
app.use("/api/products", productRoutes);

// health
app.get("/", (req, res) => res.send("API server running"));

// connect mongo + start
const PORT = process.env.PORT || 1000;
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
        app.listen(PORT, () => console.log("Server running on port", PORT));
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });

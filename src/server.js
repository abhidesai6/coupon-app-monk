require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const couponRoutes = require('./routes/coupon.routes');
const cartRoutes = require('./routes/cart.routes');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use('/api/coupons', couponRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

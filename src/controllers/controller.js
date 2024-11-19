"use strict";
const Coupon = require('../schema/schema');

var controller = {};

controller.createCoupon = createCoupon;
controller.getAllCoupons = getAllCoupons;
controller.getCouponById = getCouponById;
controller.deleteCoupon = deleteCoupon;
controller.updateCoupon = updateCoupon;
controller.getApplicableCoupons = getApplicableCoupons;
controller.applyCoupon = applyCoupon;

module.exports = controller;

// Create a new coupon
async function createCoupon  (req, res)  {
    try {
        console.log(req.body);
        const coupon = new Coupon(req.body);
        console.log(coupon);
        await coupon.save();
        res.status(201).json({ message: 'Coupon created successfully.', coupon });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Retrieve all coupons
async function getAllCoupons  (req, res)  {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Retrieve a coupon by ID
async function getCouponById  (req, res)  {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) return res.status(404).json({ message: 'Coupon not found.' });
        res.status(200).json(coupon);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a coupon
async function updateCoupon  (req, res)  {
    try {
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!coupon) return res.status(404).json({ message: 'Coupon not found.' });
        res.status(200).json({ message: 'Coupon updated successfully.', coupon });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a coupon
async function deleteCoupon  (req, res)  {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!coupon) return res.status(404).json({ message: 'Coupon not found.' });
        res.status(200).json({ message: 'Coupon deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get applicable coupons for a cart
async function getApplicableCoupons  (req, res)  {
    try {
        const { cart } = req.body;
        const coupons = await Coupon.find({ isActive: true });
        const applicableCoupons = [];

        // Check conditions for each coupon
        for (const coupon of coupons) {
            if (coupon.type === 'cart-wise') {
                const cartTotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                if (cartTotal >= coupon.details.threshold) {
                    applicableCoupons.push({
                        coupon_id: coupon._id,
                        type: coupon.type,
                        discount: (coupon.details.discount / 100) * cartTotal,
                    });
                }
            }
            // Additional logic for product-wise and bxgy
        }

        res.status(200).json({ applicable_coupons: applicableCoupons });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Apply a coupon
async function applyCoupon  (req, res)  {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) return res.status(404).json({ message: 'Coupon not found.' });

        const { cart } = req.body;
        const updatedCart = { ...cart };

        if (coupon.type === 'cart-wise') {
            const cartTotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            if (cartTotal >= coupon.details.threshold) {
                const discount = (coupon.details.discount / 100) * cartTotal;
                updatedCart.total_price = cartTotal;
                updatedCart.total_discount = discount;
                updatedCart.final_price = cartTotal - discount;
            }
        }

        // Additional logic for product-wise and bxgy

        res.status(200).json({ updated_cart: updatedCart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

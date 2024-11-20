"use strict";
const Coupon = require('../schema/coupon.schema');

var controller = {};

controller.createCoupon = createCoupon;
controller.getAllCoupons = getAllCoupons;
controller.getCouponById = getCouponById;
controller.deleteCoupon = deleteCoupon;
controller.updateCoupon = updateCoupon;

module.exports = controller;


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


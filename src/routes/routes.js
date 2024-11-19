const express = require('express');
const router = express.Router();
const couponController = require('../controllers/controller');

// CRUD Operations
router.post('/', couponController.createCoupon); // Create a new coupon
router.get('/', couponController.getAllCoupons); // Retrieve all coupons
router.get('/:id', couponController.getCouponById); // Retrieve a specific coupon by ID
router.put('/:id', couponController.updateCoupon); // Update a coupon by ID
router.delete('/:id', couponController.deleteCoupon); // Delete a coupon by ID

// Business Logic
router.post('/applicable-coupons', couponController.getApplicableCoupons); // Get applicable coupons
router.post('/apply-coupon/:id', couponController.applyCoupon); // Apply a coupon to the cart

module.exports = router;

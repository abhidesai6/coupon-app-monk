const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');


router.post('/applicable-coupons', cartController.getApplicableCoupons); 
router.post('/apply-coupon/:id', cartController.applyCoupon);

module.exports = router;
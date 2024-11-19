const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['cart-wise', 'product-wise', 'bxgy'],
    },
    details: {
        type: mongoose.Schema.Types.Mixed, 
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets creation time
    },
});

couponSchema.pre('validate', function (next) {
    const { type, details } = this;

    if (type === 'cart-wise') { 
        // Cart-wise 
        if (!details.threshold || typeof details.threshold !== 'number') {
            return next(new Error('Cart-wise coupon must have a numeric threshold.'));
        }
        if (!details.discount || typeof details.discount !== 'number') {
            return next(new Error('Cart-wise coupon must have a numeric discount.'));
        }
    }

    if (type === 'product-wise') {
         // Product-wise 
        if (!details.product_id || typeof details.product_id !== 'string') {
            return next(new Error('Product-wise coupon must have a product_id (string).'));
        }
        if (!details.discount || typeof details.discount !== 'number') {
            return next(new Error('Product-wise coupon must have a numeric discount.'));
        }
    }

    if (type === 'bxgy') {
        // BxGy coupon details
        if (!Array.isArray(details.buy_products) || details.buy_products.length === 0) {
            return next(new Error('BxGy coupon must have a non-empty buy_products array.'));
        }
        if (!Array.isArray(details.get_products) || details.get_products.length === 0) {
            return next(new Error('BxGy coupon must have a non-empty get_products array.'));
        }
        if (typeof details.repetition_limit !== 'number' || details.repetition_limit < 1) {
            return next(new Error('BxGy coupon must have a repetition_limit greater than or equal to 1.'));
        }
    }

    next();
});

module.exports = mongoose.model('Coupon', couponSchema);

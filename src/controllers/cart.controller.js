const Cart = require("../schema/cart.schema");
const Coupon = require("../schema/coupon.schema");
var controller = {};

controller.getApplicableCoupons = getApplicableCoupons;
controller.applyCoupon = applyCoupon;

module.exports = controller;

async function getApplicableCoupons(req, res) {
    try {
        const { cart } = req.body;

        if (!cart || !cart.items || cart.items.length === 0) {
            return res.status(400).json({ error: "Cart is empty or invalid." });
        }

        const coupons = await Coupon.find({ isActive: true });
        console.log("coupons");
        console.log(coupons);

        const applicableCoupons = coupons.map((coupon) => {
            console.log("coupon");
            console.log(coupon);
            const { type, details } = coupon;
            let discount = 0;
            
            if (type === "cart-wise" && cart.total_price >= details.threshold) {
                discount = (details.discount / 100) * cart.total_price;
            } else if (type === "product-wise") {
                cart.items.forEach((item) => {
                    if (item.product_id.toString() === details.product_id.toString()) {
                        discount += (details.discount / 100) * item.price * item.quantity;
                    }
                });
            } else if (type === "bxgy") {
                const buyItems = details.buy_products;
                const getItems = details.get_products;
                const repetitionLimit = details.repition_limit || 1;

                let eligibleBuyCount = 0;

                // Calculate eligible buy items
                buyItems.forEach((buyItem) => {
                    const cartItem = cart.items.find(
                        (item) => item.product_id.toString() === buyItem.product_id.toString()
                    );
                    if (cartItem) {
                        eligibleBuyCount += Math.floor(cartItem.quantity / buyItem.quantity);
                    }
                });

                const applicableRepetitions = Math.min(eligibleBuyCount, repetitionLimit);

                // Calculate discount for eligible free items
                getItems.forEach((getItem) => {
                    const cartItem = cart.items.find(
                        (item) => item.product_id.toString() === getItem.product_id.toString()
                    );
                    if (cartItem) {
                        discount += Math.min(
                            getItem.quantity * applicableRepetitions,
                            cartItem.quantity
                        ) * cartItem.price;
                    }
                });
            }

            return discount > 0
                ? {
                    coupon_id: coupon._id,
                    type: coupon.type,
                    discount,
                }
                : null;
        });
        res.status(200).json({
            applicable_coupons: applicableCoupons.filter((c) => c !== null),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Apply coupon logic
async function applyCoupon(req, res) {
    try {
        const { id } = req.params;
        const { cart } = req.body;
    
        if (!cart || !cart.items || cart.items.length === 0) {
          return res.status(400).json({ error: "Cart is empty or invalid." });
        }
    
        const coupon = await Coupon.findById(id);
        if (!coupon) {
          return res.status(404).json({ error: "Coupon not found." });
        }
    
        const now = new Date();
        if (now > coupon.expiration) {
          return res.status(400).json({ error: "Coupon has expired." });
        }
    
        const { type, details } = coupon;
        let discount = 0;
    
        if (type === "cart-wise" && cart.total_price >= details.threshold) {
          discount = (details.discount / 100) * cart.total_price;
        } else if (type === "product-wise") {
          cart.items.forEach((item) => {
            if (item.product_id.toString() === details.product_id.toString()) {
              discount += (details.discount / 100) * item.price * item.quantity;
            }
          });
        } else if (type === "bxgy") {
          const buyItems = details.buy_products;
          const getItems = details.get_products;
          const repetitionLimit = details.repition_limit || 1;
    
          let eligibleBuyCount = 0;
    
          // Calculate eligible buy items
          buyItems.forEach((buyItem) => {
            const cartItem = cart.items.find(
              (item) => item.product_id.toString() === buyItem.product_id.toString()
            );
            if (cartItem) {
              eligibleBuyCount += Math.floor(cartItem.quantity / buyItem.quantity);
            }
          });
    
          const applicableRepetitions = Math.min(eligibleBuyCount, repetitionLimit);
    
          // Calculate discount for eligible free items
          getItems.forEach((getItem) => {
            const cartItem = cart.items.find(
              (item) => item.product_id.toString() === getItem.product_id.toString()
            );
            if (cartItem) {
              discount += Math.min(
                getItem.quantity * applicableRepetitions,
                cartItem.quantity
              ) * cartItem.price;
            }
          });
        }
    
        // Update cart with discounts
        const updatedCart = {
          ...cart,
          total_discount: discount,
          final_price: cart.total_price - discount,
        };
    
        res.status(200).json({ updated_cart: updatedCart });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

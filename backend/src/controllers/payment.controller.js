import asyncHandler from '../service/asyncHandler.js';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: 'rzp_test_ZCipP0FcX2NyGC',
    key_secret: 'zGoDqd790FsG1ZonQeL6K12H'
});

export const createOrder = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    try {
        const order = await razorpay.orders.create({
          amount: amount,
            currency: 'INR',
            receipt: 'order_rcptid_11', 
            payment_capture: 1
        });

        res.json({ orderId: order.id });
    } catch (error) {
        console.error('Error creating Razorpay order:', error); 
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
});

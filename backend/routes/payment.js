import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import Payment from '../models/Payment.js'; // Ensure this path is correct

dotenv.config();

const router = express.Router();

const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_SECRET;

if (!key_id || !key_secret) {
    throw new Error('`key_id` and `key_secret` are mandatory');
}

const razorpayInstance = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
});

// ROUTE 1: Create Order API Using POST Method http://localhost:4000/api/payment/order
router.post('/order', (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100), // Amount in smallest currency unit (e.g., paise for INR)
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order);
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", key_secret)
            .update(sign.toString())
            .digest("hex");

        // Create isAuthentic
        const isAuthentic = expectedSign === razorpay_signature;

        // Condition 
        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            // Save Payment 
            await payment.save();

            // Send Message 
            res.json({
                message: "Payment Successfully"
            });
        } else {
            res.status(400).json({ message: "Invalid Signature" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

export default router;

const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/create-payment-intent", async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send(paymentIntent.client_secret);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

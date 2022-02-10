const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const stripe = require("stripe")(
    "sk_test_51KCL3uD7QIM7Pt3fPOmwk4r7Lv807DqA4nqCSIMMhjHAaifFeFLhsJ867LDj12IyQNEPKBNZwuZcUaTj3yALbBW500IJRSzTbK"
);

router.post("/payment", (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.json(stripeRes);
            }
        }
    );
});

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

const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// pk_test_51KCL3uD7QIM7Pt3fDuSzusNuy4dl4oNXEkPM6KzS1rpHTE4S16mz1zNgFb96kPnFAA13uSofYqhnXGIJFLhxMQcA00HrG0u4LC

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

module.exports = router;

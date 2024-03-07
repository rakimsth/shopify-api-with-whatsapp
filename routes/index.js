const router = require("express").Router();
const { generateDiscountCode } = require("../services/shopify");

//Step 1
router.post("/create-discount-codes", async (req, res, next) => {
  try {
    const result = await generateDiscountCode();
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

// GENERATE ACCESS TOKEN USING THE FOLLOWING URL
// https://admin.shopify.com/store/{Add your store name}/settings/apps/development
// CREATE AN APP
// Configure admin API Scopes (enable discount and price list read and write scope)
// copy the API (start with sh...)

const axios = require("axios");
const { client } = require("../services/whatsapp");

const createPriceList = async () => {
  try {
    // USE DOC https://shopify.dev/docs/api/admin-rest/2024-01/resources/pricerule#post-price-rules
    const url = `https://${process.env.STORENAME}.myshopify.com/admin/api/2024-01/price_rules.json`;
    let payload = JSON.stringify({
      price_rule: {
        title: "RAHAT_DISCOUNTS",
        value_type: "fixed_amount",
        value: "-10.0",
        customer_selection: "all",
        target_type: "line_item",
        target_selection: "all",
        allocation_method: "across",
        starts_at: "2023-03-05T00:00:00-00:00",
        usage_limit: 1,
      },
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url,
      headers: {
        "X-Shopify-Access-Token": process.env.ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      data: payload,
    };

    const { data } = await axios.request(config);
    return data;
  } catch (e) {
    console.log({ e });
  }
};

const generateDiscountCode = async () => {
  try {
    // USE DOC https://shopify.dev/docs/api/admin-rest/2024-01/resources/discountcode#post-price-rules-price-rule-id-batch

    const { price_rule } = await createPriceList();
    const { id } = price_rule;
    const url = `https://${process.env.STORENAME}.myshopify.com/admin/api/2024-01/price_rules/${id}/discount_codes.json`;

    let payload = JSON.stringify({
      discount_code: {
        code: "RAHAT100OFF",
      },
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url,
      headers: {
        "X-Shopify-Access-Token": process.env.ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      data: payload,
    };
    const { data } = await axios.request(config);

    if (data) {
      const { discount_code } = data;
      const { code } = discount_code;
      client.sendMessage(
        // Customer number is in the format internationalcode+mobile@c.us (15853161952)
        process.env.CUSTOMER_NUMBER,
        `Your Shopify code is ${code}. Thank you for using Rahat.`
      );
    }
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = { createPriceList, generateDiscountCode };

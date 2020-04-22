// SECRET_KEY should be moved to process.env
const stripe = require('stripe')('sk_test_mN8QuaIlLA0ciytZPs8Ct0sT00Uwyp6kMp');
const uuid = require('uuid/v4');

exports.makePayment = (req, res) => {
  const { cartItems, token } = req.body;
  console.log('Products', cartItems);

  let amount = 0;
  cartItems.map((item) => {
    amount = amount + item.price;
  });

  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: 'A Test Account',
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err));
    });
};

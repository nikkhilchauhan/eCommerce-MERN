const { Order, productCart } = require('../models/Order');

exports.pushOrderInPurchaseList = (req, res) => {
  let purchases = [];
  req,
    body.oder.products.foEach((product) => {
      purchases.unshift({
        _id: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        amount: req.body.order.amount,
        transaction_id: req.body.order.transaction_id,
      });
    });
  // save to database
  User.findByIdAndUpdate(
    {
      _id: req.profile._id,
    },
    { $push: { purchases: purchases } },
    // @Note: 'new' gives new updated data back
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: 'unable to save purchase list!',
        });
      }
      next();
    }
  );
};

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate('Products.product', 'name price')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'No order found!',
        });
      }
      req.order = order;
      next();
    });
};

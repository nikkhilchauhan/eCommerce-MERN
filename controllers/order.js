const { Order, productCart } = require('../models/Order');

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        err: 'Failed to save order in databse!',
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate('User', '_id name')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          err: 'No order found!',
        });
      }
      res.json(orders);
    });
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          err: 'Failed to update order status!',
        });
      }
      res.json(order);
    }
  );
};

exports.getOrderStatus = (req, res) => {
  return res.json(Order.schema.path('status').enumValues);
};

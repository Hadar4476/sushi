const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Order } = require('../models/order');
const moment = require('moment');

router.get('/', auth, async (req, res) => {
  const { _id } = req.user;
  const orders = await Order.find({ userId: _id });
  res.send(orders);
});

router.post('/', auth, async (req, res) => {
  const { _id } = req.user;
  const order = req.body;
  const { name, address, phone, totalPrice, cart } = order;
  const now = moment().format('MMM Do YY');
  const newOrder = await new Order({
    userId: _id,
    name: name.trim(),
    address: address,
    phone: phone,
    totalPrice: totalPrice,
    cart: cart,
    createdAt: now,
  }).save();
  res.send(newOrder);
});

module.exports = router;

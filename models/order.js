const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      red: 'User',
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    address: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    phone: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 10,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Order = mongoose.model('Orders', orderSchema);

exports.Order = Order;

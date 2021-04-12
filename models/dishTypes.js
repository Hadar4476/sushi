const mongoose = require('mongoose');
const _ = require('lodash');

const dishTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  imagePath: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Sushi_types = mongoose.model('Sushi_types', dishTypeSchema);
const Vegan_types = mongoose.model('Vegan_types', dishTypeSchema);
const Wok_types = mongoose.model('Wok_types', dishTypeSchema);

exports.Sushi_types = Sushi_types;
exports.Vegan_types = Vegan_types;
exports.Wok_types = Wok_types;

const express = require('express');
const { Sushi_types, Vegan_types, Wok_types } = require('../models/dishTypes');
const router = express.Router();

router.get('/sushiTypes', async (req, res) => {
  const sushiTypes = await Sushi_types.find();
  console.log(sushiTypes);
  //   res.send(posts);
});

router.get('/veganTypes', async (req, res) => {
  const veganTypes = await Vegan_types.find();
  console.log(veganTypes);
  //   res.send(posts);
});

router.get('/wokTypes', async (req, res) => {
  const wokTypes = await Wok_types.find();
  console.log(wokTypes);
  //   res.send(posts);
});

module.exports = router;

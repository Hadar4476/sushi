const express = require('express');
const { Sushi_types, Vegan_types, Wok_types } = require('../models/dishType');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/sushiTypes', auth, async (req, res) => {
  const sushiTypes = await Sushi_types.find();
  if (!sushiTypes.length) return res.state(404).send('No dish types available');
  res.send(sushiTypes);
});

router.get('/veganTypes', auth, async (req, res) => {
  const veganTypes = await Vegan_types.find();
  if (!veganTypes.length) return res.state(404).send('No dish types available');
  res.send(veganTypes);
});

router.get('/wokTypes', auth, async (req, res) => {
  const wokTypes = await Wok_types.find();
  if (!wokTypes.length) return res.state(404).send('No dish types available');
  res.send(wokTypes);
});

router.get('/search/:dishType', auth, async (req, res) => {
  const { dishType } = req.params;
  const findingCondition = {
    name: { $regex: new RegExp('^' + dishType.toLowerCase(), 'i') },
  };
  const sushiDishType = await Sushi_types.find(findingCondition);
  if (sushiDishType.length) res.send(sushiDishType);

  const veganDishType = await Vegan_types.find(findingCondition);
  if (veganDishType.length) res.send(veganDishType);

  const wokDishType = await Wok_types.find(findingCondition);
  if (wokDishType.length) res.send(wokDishType);

  if (!sushiDishType.length && !veganDishType.length && !wokDishType.length) {
    return res.status(404).send('No dish types available');
  }
});

module.exports = router;

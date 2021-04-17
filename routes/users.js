const auth = require('../middleware/auth');
const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const _ = require('lodash');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select('-password');
  if (!user) return res.status(404).send('User was not found.');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { email, username } = req.body;
  const isUsernameUnique = await User.findOne({
    username: { $regex: new RegExp('^' + username.toLowerCase(), 'i') },
  });
  if (isUsernameUnique) {
    return res.status(400).send('Username is already in use');
  }
  const isEmailUnique = await User.findOne({
    email: { $regex: new RegExp('^' + email.toLowerCase(), 'i') },
  });
  if (isEmailUnique) {
    return res.status(400).send('Email is already in use');
  }
  const user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['id', 'username', 'email']));
});

module.exports = router;

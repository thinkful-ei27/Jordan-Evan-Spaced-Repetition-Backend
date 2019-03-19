'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')

const { WordList } = require('./models');
const { dummyList } = require('./dummyData')
const router = express.Router();

const jsonParser = bodyParser.json();

router.use('/', passport.authenticate('jwt', { session: false }));

router.post('/words', jsonParser, (req, res) => {
  const { userId } = req.user
  return WordList.create({
    list: dummyList,
    userId: userId
  });
})
  .catch(err => {
    // Forward validation errors on to the client, otherwise give a 500
    // error because something unexpected has happened
    if (err.reason === 'ValidationError') {
      return res.status(err.code).json(err);
    }
    res.status(500).json({ code: 500, message: 'Internal server error' });
  });
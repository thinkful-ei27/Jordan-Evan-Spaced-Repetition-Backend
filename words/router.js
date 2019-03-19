'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')

const { WordList } = require('./models');
const { dummyList } = require('./dummyData')
const router = express.Router();

const jsonParser = bodyParser.json();

router.use('/', passport.authenticate('jwt', { session: false }));

router.post('/', jsonParser, (req, res) => {
  const { userId } = req.user
  console.log(req)
  return WordList.create({
    list: req.body,
    userId: userId
  })
    .then(res => {
      console.log(res)
      return res.status(201).json(res);
    })
    .catch(err => console.log(err))
})


module.exports = router
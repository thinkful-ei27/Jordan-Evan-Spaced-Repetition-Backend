'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const router = express.Router();
const WordList = require('../models/wordList');
const Word = require('../models/word')
const jsonParser = bodyParser.json();

router.use('/', passport.authenticate('jwt', { session: false }));

router.post('/guess', jsonParser, (req, res, next) => {
  const { userId } = req.user;
  const { guess, word } = req.body;
  WordList.find({ userId })
    .populate('words')
    .then(([result]) => {
      const words = result.words
      for (let i = 0; i < words.length; i++) {
        if (words[i].word === word) {
          if (words[i].answer === guess) {
            console.log('correct')
            Word.findOneAndUpdate({ word }, { $inc: { correctCount: 1 } })
              .then(result => {
                console.log(result)
                res.json('correct')
              })
            return;
          } else {
            console.log('incorrect')
            Word.findOneAndUpdate({ word }, { $inc: { incorrectCount: 1 } })
              .then(result => {
                console.log(result)
                res.json(`incorrect, the answer is ${words[i].answer}`)
              })
            return;
          }
        }
      }
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router

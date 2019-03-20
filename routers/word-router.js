'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const router = express.Router();
const User = require('../users/models');
const jsonParser = bodyParser.json();

router.use('/', passport.authenticate('jwt', { session: false }));

router.get('/', (req, res, next) => {
  const { userId } = req.user;
  User.findById(userId).then(result => {
    console.log(result);
    const words = result.wordList.map(word => {
      return { word: word, head: result.head };
    });
    res.json({ word: result.wordList[result.head].word });
  });
});

router.post('/guess', jsonParser, (req, res, next) => {
  const { userId } = req.user;
  const { guess } = req.body;
  User.findById(userId)
    .then(user => {
      let head = user.head;
      let currentWord = user.wordList[head];
      let nextIndex = currentWord.next;
      let nextWord = user.wordList[nextIndex];
      if (user.wordList[head].answer === guess) {
        user.wordList.set(head, {
          memoryStrength: currentWord.memoryStrength * 2,
          correctCount: ++currentWord.correctCount,
          incorrectCount: currentWord.incorrectCount,
          word: currentWord.word,
          answer: currentWord.answer,
          next: currentWord.next + currentWord.memoryStrength * 2
        }),
          user.wordList.set(currentWord.memoryStrength * 2, {
            memoryStrength: nextWord.memoryStrength,
            correctCount: nextWord.correctCount,
            incorrectCount: nextWord.incorrectCount,
            word: nextWord.word,
            answer: nextWord.answer,
            next: head
          });
        (user.head = nextIndex),
          user.save().then(update => {
            console.log(update);
            return res.json('correct');
          });
      } else {
        user.wordList.set(head, {
          memoryStrength: Math.ceil(currentWord.memoryStrength / 2),
          correctCount: currentWord.correctCount,
          incorrectCount: ++currentWord.incorrectCount,
          word: currentWord.word,
          answer: currentWord.answer,
          next: currentWord.next
        }),
          (user.head = nextIndex),
          user.save().then(update => {
            console.log(update);
            return res.json('incorrect');
          });
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

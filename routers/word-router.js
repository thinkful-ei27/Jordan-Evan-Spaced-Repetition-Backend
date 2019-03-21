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

router.get('/data', (req, res, next) => {
  const { userId } = req.user;
  User.findById(userId)
    .then(result => {
      const words = result.wordList.map(item => {
        return {
          word: item.word,
          correctCount: item.correctCount,
          incorrectCount: item.incorrectCount
        };
      });
      return words
    })
    .then(words => {
      return res.json(words);
    })
});

router.post('/guess', jsonParser, (req, res, next) => {
  const { userId } = req.user;
  const { guess } = req.body;
  User.findById(userId)
    .then(user => {
      let head = user.head;
      let currentWord = user.wordList[head];
      let nextIndex = currentWord.next;
      let wordList = user.wordList;
      let m, position, feedback;
      if (wordList[head].answer === guess) {
        currentWord.memoryStrength = m = currentWord.memoryStrength * 2;
        currentWord.correctCount = currentWord.correctCount + 1;
        position = head + m;
        feedback = { rightOrWrong: 'correct' }
        if (position > wordList.length - 1) {
          position = wordList.length - 1;
        }
      } else {
        currentWord.memoryStrength = m = 1;
        currentWord.incorrectCount = currentWord.incorrectCount + 1;
        position = nextIndex
        feedback = {
          rightOrWrong: 'incorrect',
          answer: currentWord.answer
        }
      }
      let swapWord = wordList[position];
      currentWord.next = swapWord.next;
      swapWord.next = head;
      user.wordList.set(position, swapWord);
      user.wordList.set(head, currentWord);
      user.head = nextIndex;
      user.save()
        .then(() => {
          return res.json(feedback);
        })
    })
    .catch(err => {
      next(err);
    });
})

module.exports = router;

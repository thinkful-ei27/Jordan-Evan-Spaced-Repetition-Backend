'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const router = express.Router();
const User = require('../users/models')
const jsonParser = bodyParser.json();

router.use('/', passport.authenticate('jwt', { session: false }));

router.post('/guess', jsonParser, (req, res, next) => {
  const { userId } = req.user;
  const { guess } = req.body;
  User.findById(userId)
    .then(user => {
      let head = user.head;
      let currentWord = user.wordList[head]
      let nextIndex = currentWord.next
      let m;
      if (user.wordList[head].answer === guess) {
        currentWord.memoryStrength = m = currentWord.memoryStrength * 2;
        currentWord.correctCount = currentWord.correctCount + 1;
        let swapWord = user.wordList[head + m];
        currentWord.next = (swapWord.next);
        swapWord.next = head;
        user.wordList.set(head + m, swapWord);
        user.wordList.set(head, currentWord);
        user.head = nextIndex;
        user.save()
          .then(update => {
            console.log(update)
            return res.json('correct')
          })
      } else {
        currentWord.memoryStrength = m = 1
        currentWord.incorrectCount = currentWord.incorrectCount + 1
        let swapWord = user.wordList[nextIndex];
        currentWord.next = (swapWord.next);
        swapWord.next = head;
        user.wordList.set(nextIndex, swapWord);
        user.wordList.set(head, currentWord);
        user.head = nextIndex;
        user.save()
          .then(update => {
            console.log(update)
            return res.json('incorrect')
          })
      }
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router


// user.wordList.set(head, {
//   memoryStrength: currentWord.memoryStrength * 2,
//   correctCount: ++currentWord.correctCount,
//   incorrectCount: currentWord.incorrectCount,
//   word: currentWord.word,
//   answer: currentWord.answer,
//   next: currentWord.next + (currentWord.memoryStrength * 2)
// }),
//   user.wordList.set((currentWord.memoryStrength * 2), {
//     memoryStrength: nextWord.memoryStrength,
//     correctCount: nextWord.correctCount,
//     incorrectCount: nextWord.incorrectCount,
//     word: nextWord.word,
//     answer: nextWord.answer,
//     next: head
//   })
// user.head = nextIndex,
//   user.save()
//     .then(update => {
//       console.log(update)
//       return res.json('correct')
//     })
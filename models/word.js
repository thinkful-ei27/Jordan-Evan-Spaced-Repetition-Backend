'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const word = mongoose.Schema({
  word: { type: String, required: true },
  answer: { type: String, required: true },
  correctCount: { type: Number, required: true },
  incorrectCount: { type: Number, required: true },
  next: { type: Number, required: true }
});

const Word = mongoose.model('Word', word);

module.exports = Word;

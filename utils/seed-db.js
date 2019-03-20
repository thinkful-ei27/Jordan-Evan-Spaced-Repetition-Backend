const mongoose = require('mongoose');
require('dotenv').config();
const { DATABASE_URL } = require('../config');
const WordList = require('../models/wordList');
const Word = require('../models/word');
const User = require('../users/models');

const { wordList, words, users } = require('./dummyData');

console.log(`Connecting to mongodb ad ${DATABASE_URL}`);
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.info('Deleting Data...');
    return Promise.all([
      WordList.deleteMany(),
      Word.deleteMany(),
      User.deleteMany()
    ]);
  })
  .then(() => {
    console.info('Seeding Database...');
    return Promise.all([
      Word.insertMany(words),
      User.insertMany(users),
      WordList.insertMany(wordList)
    ]);
  })
  .then(results => {
    console.log('Inserted', results);
    console.info('Disconnecting.....');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.log(err);
    return mongoose.disconnect();
  });

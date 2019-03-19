const mongoose = require('mongoose');

const wordList = new mongoose.Schema({
  words: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

wordList.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('WordList', wordList);

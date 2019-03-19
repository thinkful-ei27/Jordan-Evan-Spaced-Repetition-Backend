'use strict'

mongoose.Promise = global.Promise;

const WordListSchema = mongoose.Schema({
  list: [{
    word: { type: String, required: true, },
    answer: { type: String, required: true },
    correctCount: { type: Number, required: true },
    incorrectCount: { type: Number, required: true },
    next: { type: Number, required: true },
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const WordList = mongoose.model('User', UserSchema);


module.exports = { WordList };

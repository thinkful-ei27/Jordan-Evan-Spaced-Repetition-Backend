// const dummyList = [
//   {
//     userId: '5c8fc3ffe6c0aba7738096b2',
//     word: 'hola',
//     answer: 'hello',
//     correctCount: 0,
//     incorrectCount: 0,
//     next: 1
//   },
//   {
//     userId: '5c8fc3ffe6c0aba7738096b2',
//     word: 'cerveza',
//     answer: 'beer',
//     correctCount: 0,
//     incorrectCount: 0,
//     next: 2
//   },
//   {
//     userId: '5c8fc3ffe6c0aba7738096b2',
//     word: 'biblioteca',
//     answer: 'library',
//     correctCount: 0,
//     incorrectCount: 0,
//     next: 3
//   },
//   {
//     userId: '5c8fc3ffe6c0aba7738096b2',
//     word: 'baño',
//     answer: 'bathroom',
//     correctCount: 0,
//     incorrectCount: 0,
//     next: 4
//   },
//   {
//     userId: '5c8fc3ffe6c0aba7738096b2',
//     word: '¿por qué?',
//     answer: 'why?',
//     correctCount: 0,
//     incorrectCount: 0,
//     next: 5
//   },
//   {
//     userId: '5c8fc3ffe6c0aba7738096b2',
//     word: 'porque',
//     answer: 'because',
//     correctCount: 0,
//     incorrectCount: 0,
//     next: 6
//   },
//   {
//     userId: '5c8fc3ffe6c0aba7738096b2',
//     word: 'perro',
//     answer: 'dog',
//     correctCount: 0,
//     incorrectCount: 0,
//     next: 7
//   },
//   {
//     userId: '5c8fc3ffe6c0aba7738096b2',
//     word: 'gato',
//     answer: 'cat',
//     correctCount: 0,
//     incorrectCount: 0,
//     next: 8
//   },
//   {
//     userId: '5c8fc3ffe6c0aba7738096b2',
//     word: 'gato',
//     answer: 'cat',
//     correctCount: 0,
//     incorrectCount: 0,
//     next: 9
//   },
//   {
//     userId: '5c8fc3ffe6c0aba7738096b2',
//     word: 'burro',
//     answer: 'donkey',
//     correctCount: 0,
//     incorrectCount: 0,
//     next: 0
//   }
// ];

const wordList = {
  userId: '333333333333333333333301',
  words: [
    '222222222222222222222201',
    '222222222222222222222202',
    '222222222222222222222203',
    '222222222222222222222204',
    '222222222222222222222205',
    '222222222222222222222206',
    '222222222222222222222207',
    '222222222222222222222208',
    '222222222222222222222209'
  ]
};

const words = [
  {
    _id: '222222222222222222222201',
    word: 'hola',
    answer: 'hello',
    correctCount: 0,
    incorrectCount: 0,
    next: 1
  },
  {
    _id: '222222222222222222222202',
    word: 'cerveza',
    answer: 'beer',
    correctCount: 0,
    incorrectCount: 0,
    next: 2
  },
  {
    _id: '222222222222222222222203',
    word: 'biblioteca',
    answer: 'library',
    correctCount: 0,
    incorrectCount: 0,
    next: 3
  },
  {
    _id: '222222222222222222222210',
    word: 'baño',
    answer: 'bathroom',
    correctCount: 0,
    incorrectCount: 0,
    next: 4
  },
  {
    _id: '222222222222222222222204',
    word: '¿por qué?',
    answer: 'why?',
    correctCount: 0,
    incorrectCount: 0,
    next: 5
  },
  {
    _id: '222222222222222222222205',
    word: 'porque',
    answer: 'because',
    correctCount: 0,
    incorrectCount: 0,
    next: 6
  },
  {
    _id: '222222222222222222222209',
    word: 'perro',
    answer: 'dog',
    correctCount: 0,
    incorrectCount: 0,
    next: 7
  },
  {
    _id: '222222222222222222222206',
    word: 'gato',
    answer: 'cat',
    correctCount: 0,
    incorrectCount: 0,
    next: 8
  },
  {
    _id: '222222222222222222222207',
    word: 'gato',
    answer: 'cat',
    correctCount: 0,
    incorrectCount: 0,
    next: 9
  },
  {
    _id: '222222222222222222222208',
    word: 'burro',
    answer: 'donkey',
    correctCount: 0,
    incorrectCount: 0,
    next: 0
  }
];

const users = [
  {
    _id: '333333333333333333333301',
    firstName: 'Bob',
    lastName: 'User',
    username: 'bobuser',
    // hash digest for the string 'password'
    password: 'bobspassword'
  }
];

module.exports = { words, wordList, users };

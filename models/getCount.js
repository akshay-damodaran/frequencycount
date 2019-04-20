const fs = require('fs');
const file = '/home/akshay/TTT/server/models/test.txt';

const getCount = n => new Promise((resolve, reject) => {
  // Read file from given directory
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      console.log('Error : ', err);
      reject(err);
    } else {
      // Split words from spaces and storing into an array
      const wordsArray = getWordsArray(data);

      // Create a words count mapping of eact and every words in the array and storing it in an object
      const wordsCount = wordsArray.reduce((accum, d) => {
        if (accum[d]) {
          accum[d]++;
        } else {
          accum[d] = 1;
        }
        return accum;
      }, {});

      let wordCountMapping = Object.keys(wordsCount).map(word => ({
        word,
        count: wordsCount[word],
      }));

      console.log('wordCountMapping : ', wordCountMapping);

      wordCountMapping = wordCountMapping.sort((a, b) => b.count - a.count);

      resolve(wordCountMapping.splice(0, n));
    }
  });
})

// A function which return all the words in lower case in the given data seperated by spaces
// and stripping all the special characters
const getWordsArray = (text) => {
  // Split string by spaces (including spaces, tabs, and newlines)
  const wordsArray = text.split(/[\s+,?.!]/)
    // Filtering out null values
    .filter(e => e)
    // Converting all text to lowercase
    .map(e => e.toLowerCase())
  return wordsArray;
};

module.exports = getCount;
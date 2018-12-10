const input = require('./input');
// const input = `dabAcCaCBAcCcaDA`;
const alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.split('');

const afterReaction = polymers => {
  let newPolymers = polymers;
  alphabetArray.forEach(letter => {
    const regExpLower = new RegExp(letter + letter.toUpperCase(), 'g');
    const regExpUpper = new RegExp(letter.toUpperCase() + letter, 'g');
    newPolymers = newPolymers.replace(regExpLower, '');
    newPolymers = newPolymers.replace(regExpUpper, '');
  });

  if (polymers !== newPolymers) newPolymers = afterReaction(newPolymers);

  return newPolymers;
}

const solution01 = () => {
  const polymers = afterReaction(input);

  return polymers.length;
}

const solution02 = () => {
  const mapped = {};
  
  alphabetArray.forEach(letter => {
    const regExp = new RegExp(letter, 'gi');
    const polymers = afterReaction(input.replace(regExp, ''));

    mapped[letter] = polymers.length;
  });

  const values = Object.values(mapped);

  return Math.min(...values);
}

module.exports = [
  solution01(),
  solution02(),
];
const input = require('./input');

const solution01 = () => {
  const inputArray = input.split('\n');
  const counter = { two: 0, three: 0 };

  const mapId = id => {
    const mapped = {};

    for (let char of id) {
      if (mapped[char]) mapped[char]++;
      else mapped[char] = 1;
    }

    return mapped;
  }

  inputArray.forEach(id => {
    const mapped = mapId(id);
    const filtered = Object.keys(mapped)
      // return value only when the value is between 2 and 3
      .map(key => mapped[key] >= 2 && mapped[key] <= 3 && mapped[key])
      // remove falsy value
      .filter(value => value)
      // remove duplicates
      .filter((value, index, self) => self.indexOf(value) === index)
      // count
      .forEach(value => {
        if (value === 2) counter.two++;
        else if (value === 3) counter.three++;
      });
  });
  
  return counter.two * counter.three;
}

const solution02 = () => {
  const inputArray = input.split('\n');
  let commonLetters = '';

  inputArray.forEach(id => {
    inputArray.forEach(anotherId => {
      let common = '';
      for (let i = 0; i < id.length; i++) {
        /**
         * add character to common variable
         * when the two charaters are the same
         */
        if (id[i] === anotherId[i]) {
          common += id[i];
        }
      }

      if (common.length === id.length - 1) {
        commonLetters = common;
      }
    });
  });

  return commonLetters;
}

module.exports = [
  solution01(),
  solution02(),
]
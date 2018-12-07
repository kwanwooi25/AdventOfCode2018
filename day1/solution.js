const input = require('./input');

const solution01 = () => {
  const inputArray = input.split('\n');
  const sum = inputArray.reduce((acc, current) => acc + parseInt(current), 0);

  return sum;
};

const solution02 = () => {
  const inputArray = input.split('\n');
  let current = 0;
  let visited = [];
  let twiceVisited = null;

  const changeFrequency = () => {
    // Iterate array adding up values
    inputArray.some(number => {
      current += parseInt(number);

      if (visited.includes(current)) twiceVisited = current;
      else visited.push(current);

      // Exits the loop when the visited frequency found
      return twiceVisited !== null;
    });

    // Run the function again unless visited frequency found
    if (twiceVisited === null) changeFrequency();

    // Return the frequency when visited twice
    return twiceVisited;
  }

  return changeFrequency();
};

module.exports = [
  solution01(),
  solution02(),
]
const input = require('./input');

const examineClaims = () => {
  const inputArray = input.split('\n');

  let fabricArray = new Array(1000).fill('.').map(() => new Array(1000).fill('.'));
  let overlappingArea = 0;
  let overlappingClaims = [];
  let allClaims = [];

  inputArray.forEach(data => {
    const id = data.split('@')[0].trim();
    const offsetLeft = parseInt(data.split('@')[1].split(':')[0].split(',')[0]);
    const offsetTop = parseInt(data.split('@')[1].split(':')[0].split(',')[1]);
    const width = parseInt(data.split(':')[1].split('x')[0]);
    const height = parseInt(data.split(':')[1].split('x')[1]);

    allClaims.push(id);

    for (let top = offsetTop; top < offsetTop + height; top++) {
      for (let left = offsetLeft; left < offsetLeft + width; left++) {
        if (fabricArray[top][left] === '.') {
          fabricArray[top][left] = id;
        } else {
          if (overlappingClaims.indexOf(fabricArray[top][left]) === -1) {
            overlappingClaims.push(fabricArray[top][left]);
          }
          if (overlappingClaims.indexOf(id) === -1) {
            overlappingClaims.push(id);
          }
          fabricArray[top][left] = 'x';
        }
      }
    }
  });

  /**
   * if the spot marked as 'x'
   * that's where overlaps
   */
  fabricArray.forEach(row => {
    row.forEach(spot => {
      if (spot === 'x') overlappingArea++;
    })
  });

  const notOverlappingClaims = allClaims.filter(claimId => overlappingClaims.includes(claimId) === false);

  return [ overlappingArea, notOverlappingClaims[0] ];
}

module.exports = examineClaims();
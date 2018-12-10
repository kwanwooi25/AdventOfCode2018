const input = require('./input');
// const input = `1, 1
// 1, 6
// 8, 3
// 3, 4
// 5, 5
// 8, 9`;

const mapCoordsAndGrid = array => {
  let coordinates = [];
  let grid = [];
  let top, left, right, bottom;

  array.forEach(line => {
    const x = parseInt(line.split(',')[0]);
    const y = parseInt(line.split(',')[1]);

    coordinates.push({ x, y });

    if (!top) top = y;
    if (!bottom) bottom = y;
    if (!left) left = x;
    if (!right) right = x;

    top = top > y ? y : top;
    bottom = bottom < y ? y : bottom;
    left = left > x ? x : left;
    right = right < x ? x : right;
  });

  coordinates = coordinates.map(({ x, y }) => {
    const infinite =
      top === y ||
      bottom === y ||
      left === x ||
      right === x;

    return { x, y, infinite };
  });

  for (let x = left; x <= right; x++) {
    grid[x] = [];
    for (let y = top; y <= bottom; y++) {
      grid[x][y] = '.';
    }
  }

  return { coordinates, grid };
}

const getDistance = (x1, x2, y1, y2) => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

const solution01 = () => {
  const { coordinates, grid } = mapCoordsAndGrid(input.split('\n'));

  grid.forEach((row, x) => {
    row.forEach((column, y) => {
      let minDistance = 999999;
      coordinates.forEach((coord, index) => {
        const distance = getDistance(coord.x, x, coord.y, y);
        
        if (distance < minDistance) {
          if (grid[x][y] === '.') {
            minDistance = distance;
            grid[x][y] = index;
          } else {
            const existing = grid[x][y];
            const existingDistance = getDistance(coordinates[existing].x, x, coordinates[existing].y, y);
            if (distance < existingDistance) {
              minDistance = distance;
              grid[x][y] = index;
            }
          }
        }
      });
    });
  });

  let counter = [];

  grid.forEach(row => {
    row.forEach(column => {
      if (coordinates[column].infinite === false) {
        counter[column] = counter[column] ? counter[column] + 1 : 1;
      }
    });
  });

  counter = counter.filter(value => value);

  return Math.max(...counter);
}

const solution02 = () => {
  const { coordinates, grid } = mapCoordsAndGrid(input.split('\n'));
  let desiredRegion = [];

  grid.forEach((row, x) => {
    grid.forEach((column, y) => {
      let sum = 0;
      coordinates.forEach(coord => {
        sum += getDistance(coord.x, x, coord.y, y);
      });

      if (sum < 10000) desiredRegion.push(`${x}, ${y}`);
    });
  });

  return desiredRegion.length;
}

module.exports = [
  solution01(),
  solution02(),
];
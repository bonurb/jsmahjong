let MAXLEV = 7;
let MAX_Y = 12;
let MAX_X = 26;
let mjCube = new Array(MAX_X);

for (let i = 0; i < MAX_X; i++) {
  mjCube[i] = new Array(MAX_Y);
  for (let j = 0; j < MAX_Y; j++) {
    mjCube[i][j] = new Array(MAXLEV);
  }
}
for (let x = 0; x < 26; x++) {
  for (let y = 0; y < 12; y++) {
    for (let z = 0; z < 7; z++) {
      mjCube[x][y][z] = "-1";
    }
  }
}

console.log(mjCube[12][5][3]);

//----------------
let tiles = new Array(144);
for (let i = 0; i < 144; i++) {
  tiles[i] = i;
}

function pseudoRandom(seed) {
  let value = seed;

  return function () {
    value = value * 16807 % 2147483647;
    return (value - 1) / 2147483647;
  }
}

let generator = pseudoRandom(1);

function getGame(gameNo) {
  for (let i = 0; i < 144; i++) {
    tiles[i] = i;
  }
  let gen = pseudoRandom(gameNo);
  let rnd = "";
  for (let i = tiles.length - 1; i > 0; i--) {
    let j = Math.floor(gen() * (144));
    rnd += "," + j;
    let k = tiles[i];
    tiles[i] = tiles[j];
    tiles[j] = k;
  }
  console.log(rnd);
}

getGame(333);
console.log(tiles.join("\",\""));
getGame(334);
console.log(tiles.join("\",\""));
getGame(335);
console.log(tiles.join("\",\""));

console.log(5 * 25 + 10 + "px");

let max = 5;
let rands = new Array(max);
for (let i = 0; i < max; i++) {
  rands[i] = 0;
}
console.log(rands.join(","));

let rgen = pseudoRandom(111);
for (let i = 0; i < 10000; i++) {
  let j = Math.floor(rgen() * (max));
  rands[j]++;
}
console.log(rands.join(","));

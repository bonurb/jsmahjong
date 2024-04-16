let depth = 7;
let rows = 12;
let cols = 26;
let mjCube = new Array(cols);

for (let i = 0; i < cols; i++) {
  mjCube[i] = new Array(rows);
  for (let j = 0; j < rows; j++) {
    mjCube[i][j] = new Array(depth);
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
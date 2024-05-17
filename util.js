function log(str) {
  console.log(str);
}

function getSolvableGame(layout) {
  generator = pseudoRandom(bnum);

  let pairs = new Array(72);
  for (let i = 0; i < 72; i++) {
    pairs[i] = new Match(tiles[2 * i], tiles[2 * i + 1]);
  }

  let pids = new Array(72);
  for (let i = 0; i < 72; i++) {
    pids[i] = i;
  }

  resetMjCube();
  // resetZIndex();
  undoStack = [];
  for (let i = 0; i < tileIds.length; i++) {
    tileIds[i] = i;
  }

  let ttils = new Array(144);
  for (let i = 0; i < 144; i++) {
    ttils[i] = new Tile(tiles[0].img, tiles[0].img.alt);
  }

  fillMjCube(layout, ttils);

  let tilnum = 144;
  let match;
  while (true) {
    selectables.clear();
    for (let i = 0; i < ttils.length; i++) {
      if (ttils[i].isSelectable()) {
        selectables.add(i);
      }
    }

    calcMatches(ttils);
    if (matches.size == 0 || tilnum == 0) {
      break;
    }
    match = Array.from(matches)[Math.floor(generator() * matches.size)]
    undoStack.push(match);
    tilnum -= 2;

    let til = match.til1;
    til.removed = true;
    mjCube[til.x][til.y][til.z] = -1;
    mjCube[til.x + 1][til.y][til.z] = -1;
    mjCube[til.x][til.y + 1][til.z] = -1;
    mjCube[til.x + 1][til.y + 1][til.z] = -1;

    let til2 = match.til2;
    til2.removed = true;
    mjCube[til2.x][til2.y][til2.z] = -1;
    mjCube[til2.x + 1][til2.y][til2.z] = -1;
    mjCube[til2.x][til2.y + 1][til2.z] = -1;
    mjCube[til2.x + 1][til2.y + 1][til2.z] = -1;

  }

  // mix pair ids
  for (let i = pids.length - 1; i >= 0; i--) {
    let j = Math.floor(generator() * pids.length);
    let k = pids[i];
    pids[i] = pids[j];
    pids[j] = k;
  }

  // set real tiles
  let m;
  for (let i = pids.length - 1; i >= 0; i--) {
    m = undoStack.pop();
    if (m == undefined) {
      break;
    }

    let p = pairs[pids[i]];
    p.til1.x = m.til1.x;
    p.til1.y = m.til1.y;
    p.til1.z = m.til1.z;
    p.til2.x = m.til2.x;
    p.til2.y = m.til2.y;
    p.til2.z = m.til2.z;

    let til = p.til1;
    til.removed = false;
    til.img.style.zIndex = "unset";
    mjCube[til.x][til.y][til.z] = til.img.id;
    mjCube[til.x + 1][til.y][til.z] = til.img.id;
    mjCube[til.x][til.y + 1][til.z] = til.img.id;
    mjCube[til.x + 1][til.y + 1][til.z] = til.img.id;
    til.img.style.left = (til.x * 24) + OFFSET + (til.z * DX) + "px";
    til.img.style.top = (til.y * 35) + OFFSET - (til.z * DY) + "px";

    let til2 = p.til2;
    til2.removed = false;
    til2.img.style.zIndex = "unset";
    mjCube[til2.x][til2.y][til2.z] = til2.img.id;
    mjCube[til2.x + 1][til2.y][til2.z] = til2.img.id;
    mjCube[til2.x][til2.y + 1][til2.z] = til2.img.id;
    mjCube[til2.x + 1][til2.y + 1][til2.z] = til2.img.id;
    til2.img.style.left = (til2.x * 24) + OFFSET + (til2.z * DX) + "px";
    til2.img.style.top = (til2.y * 35) + OFFSET - (til2.z * DY) + "px";
  }

  // set tileIds
  for (let i = 0; i < tileIds.length; i++) {
    tileIds[i] = mjCube[layout[i][1]][layout[i][2]][layout[i][0]];
  }
  resetMjCube();
}
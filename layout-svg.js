const Consts = {
	mY: 18, mX: 38, mZ: 7,
	tileWidth: 75,
	tileHeight: 100
};

class Stone {
	x;
	y;
	z;
	v;
	groupnr;
	hinted;
	selected;
	picked = false;
	state = {
		blocked: false,
		removable: false
	};
	group = [];
	// img = {
	// 	id
	// };
	nodes =  {
		top: [],
		left: [],
		right: [],
		bottom: []
	};

	constructor(z, x, y, v, groupnr) {
		this.z = z;
		this.x = x;
		this.y = y;
		this.v = v;
		this.groupnr = groupnr;
	}

	toPosition() {
		return {z: this.z, x: this.x, y: this.y, v: this.v, groupnr: this.groupnr};
	}

	isBlocked() {
		return Stone.hasStone(this.nodes.top) || (Stone.hasStone(this.nodes.left) && Stone.hasStone(this.nodes.right));
	}

	// isLoose(): boolean {
	// 	return !Stone.hasStone(this.nodes.left) && !Stone.hasStone(this.nodes.right) && !Stone.hasStone(this.nodes.bottom);
	// }

	hasStone(list) {
		for (const stone of list) {
			if (!stone.picked) {
				return true;
			}
		}
		return false;
	}
}

function calcDrawPos(z, x, y) {
	const pos = {
		x: ((Consts.tileWidth + 2) * x / 2 - (z * 8)) + (Consts.tileWidth / 2),
		y: ((Consts.tileHeight + 2) * y / 2 - (z * 8)) + (Consts.tileHeight / 2),
		z: y + Consts.mY * (x + Consts.mX * z),
		translate: ''
	};
	pos.translate = `translate(${pos.x},${pos.y})`;
	return pos;
}

function sortDrawItems(items) {
	const sortToDraw = (draw) => draw.pos.z;
	return items.sort((ad, bd) => {
		const a = sortToDraw(ad);
		const b = sortToDraw(bd);
		if (a < b) {
			return -1;
		}
		if (a > b) {
			return 1;
		}
		return 0;
	});
}

function getDrawViewPort(items, width, height, rotate) {
	const bounds = getDrawBounds(items, width, height);
	return getDrawBoundsViewPort(bounds, width, height, rotate);
}

function getDrawBoundsViewPort(bounds, width, height, rotate) {
	const b = rotate ?
		[
			-bounds[3] - Consts.tileHeight - 10,
			-bounds[0] - 30,
			bounds[3] + Consts.tileHeight - 10,
			bounds[2] + bounds[0] + Consts.tileWidth + 40
		] :
		[
			bounds[0] - 40,
			bounds[1] - 20,
			bounds[2] + Consts.tileHeight + 40,
			bounds[3] + Consts.tileHeight + 20
		];
	return b.join(' ');
}

function getDrawBounds(items, width, height) {
	const m = Math.max(width, height);
	const bounds = [m, m, 0, 0];
	items.forEach(draw => {
		bounds[0] = Math.min(bounds[0], draw.pos.x);
		bounds[1] = Math.min(bounds[1], draw.pos.y);
		bounds[2] = Math.max(bounds[2], draw.pos.x);
		bounds[3] = Math.max(bounds[3], draw.pos.y);
	});
	return bounds;
}

function mappingToDrawItems(mapping) {
	const emptySource = new Stone(0, 0, 0, 0, 0);
	const result = mapping.map((row) =>
		({
			z: row[0],
			x: row[1],
			y: row[2],
			v: 0,
			visible: true,
			pos: calcDrawPos(row[0], row[1], row[2]),
			source: emptySource
		}));
	return sortDrawItems(result);
}

function generateSVG(mapping) {
	const items = mappingToDrawItems(mapping);
	const viewport = getDrawViewPort(items, 1470, 960, false);
	const sl = new Array();
	sl.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewport}" preserveAspectRatio="xMidYMid meet" height="100%" width="100%">`);
	for (const draw of items) {
		sl.push(`<g transform="${draw.pos.translate}"><rect fill="#FFF9E5" stroke-width="2" stroke="black" x="0" y="0" width="75" height="100" rx="10" ry="10"></rect></g>`);
	}
	sl.push('</svg>');
	return sl.join('');
}

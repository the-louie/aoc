fs = require("fs");

const txt = ((fs.readFileSync("./input.txt")).toString()).replace(new RegExp(/\s/g), "").split(",");

const paths = [
	[ "R2", "L3" ],
	[ "R2", "R2", "R2" ],
	[ "R5", "L5", "R5", "R3" ],
	[ "R1", "L1", "L1", "L1" ],
	txt,
	// [
	// 	"R2", "L5", "L4", "L5", "R4", "R1", "L4", "R5", "R3", "R1", "L1", "L1", "R4", "L4", "L1", "R4",
	// 	"L4", "R4", "L3", "R5", "R4", "R1", "R3", "L1", "L1", "R1", "L2", "R5", "L4", "L3", "R1", "L2",
	// 	"L2", "R192", "L3", "R5", "R48", "R5", "L2", "R76", "R4", "R2", "R1", "L1", "L5", "L1", "R185",
	// 	"L5", "L1", "R5", "L4", "R1", "R3", "L4", "L3", "R1", "L5", "R4", "L4", "R4", "R5", "L3", "L1",
	// 	"L2", "L4", "L3", "L4", "R2", "R2", "L3", "L5", "R2", "R5", "L1", "R1", "L3", "L5", "L3", "R4",
	// 	"L4", "R3", "L1", "R5", "L3", "R2", "R4", "R2", "L1", "R3", "L1", "L3", "L5", "R4", "R5", "R2",
	// 	"R2", "L5", "L3", "L1", "L1", "L5", "L2", "L3", "R3", "R3", "L3", "L4", "L5", "R2", "L1", "R1",
	// 	"R3", "R4", "L2", "R1", "L1", "R3", "R3", "L4", "L2", "R5", "R5", "L1", "R4", "L5", "L5", "R1",
	// 	"L5", "R4", "R2", "L1", "L4", "R1", "L1", "L1", "L5", "R3", "R4", "L2", "R1", "R2", "R1", "R1",
	// 	"R3", "L5", "R1", "R4",
	// ],
]

function calcdist(x1,y1,x2,y2) {
	return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

const directionChange = { L: -1, R: 1 }
const startpos = { x: 0, y: 0, d: 0 }
paths.forEach((path) => {
	let pos = Object.assign({}, startpos);

	let x = startpos.x;
	let y = startpos.y;
	let d = startpos.d;

	let walkedPath = [];
	path.forEach((walk) => {
		const direction = walk.substr(0, 1);
		const distance = parseInt(walk.substr(1, walk.length-1));
		const lastpos = Object.assign({}, {x: x}, {y: y}, {d: d});

		// turn
		d = (d + directionChange[direction] + 4) % 4;
		// d = d + directionChange[direction];
		if (d < 0) { d = 3; }
		// walk
		switch(d) {
			case 0: // North
				// y -= distance;
				for (let i = 0; i<distance; i++) {
					y -= 1;
					walkedPath.push(`${x},${y}`);
				}
				break;
			case 1: // East
				// x += distance;
				for (let i = 0; i<distance; i++) {
					x += 1;
					walkedPath.push(`${x},${y}`);
				}
				break;
			case 2: // South
				// y += distance;
				for (let i = 0; i<distance; i++) {
					y += 1;
					walkedPath.push(`${x},${y}`);
				}
				break
				break;
			case 3: // West
				// x -= distance;
				for (let i = 0; i<distance; i++) {
					x -= 1;
					walkedPath.push(`${x},${y}`);
				}
				break
				break;
		}
		// console.log(walk, `${direction}(${directionChange[direction]}) ${distance}\tnew direction,distance: ${d},${distance}\t${lastpos.x}, ${lastpos.y}, ${lastpos.d} => ${x}, ${y}, ${d}`);
	});

	walkedPath.some((xy1, i) => {
		console.log("xy1", i, xy1);
		let dupe = false;
		walkedPath.some((xy2,j) => {
			if (j >= i) { return true; }
			if (xy1 === xy2) { dupe = true; return true;}
		})
		if (dupe) {
			xy = xy1.split(",");
			console.log("xy", calcdist(startpos.x, startpos.y, xy[0], xy[1]));

		}
		return dupe;
	})


	console.log(`distance: ${calcdist(startpos.x, startpos.y, x, y)} position: ${x}, ${y}, ${d}`);
	// console.log(ds.join(", "));
	console.log("--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ")
})
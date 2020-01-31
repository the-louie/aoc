const fs = require("fs");
const fileData = (fs.readFileSync("./input-1.txt")).toString();
const rawData = fileData.split("\n").filter((r) => r.length > 0);
const compsides = [[0,1,2],[0,2,1],[1,2,0]];

let cols = [[],[],[]];
let possible = 0;
rawData.forEach((row) => {
	const sides = row.split(" ").filter((s) => s != "").map((s) => parseInt(s));
	[0,1,2].forEach((n) => { cols[n].push(sides[n]); })
	if (cols[0].length === 3) {
		possible += [0,1,2].reduce((sum, n) => sum + (compsides.reduce((acc, curr) => acc && (cols[n][curr[0]] + cols[n][curr[1]] > cols[n][curr[2]]), true) ? 1 : 0), 0);
		cols = [[],[],[]];
	}
});

console.log(possible); // 1849

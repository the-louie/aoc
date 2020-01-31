const fs = require("fs");
const compsides = [[0,1,2],[0,2,1],[1,2,0]];
const rawData = ((fs.readFileSync("./input-1.txt")).toString()).split("\n").filter((r) => r.length > 0);

const impossible = rawData.filter((row) => {
	const sides = (row.split(" ").filter((s) => s != "").map((s) => parseInt(s)));
	return compsides.reduce((acc, curr) => acc && (sides[curr[0]] + sides[curr[1]] > sides[curr[2]]), true);
});

console.log(impossible.length); // 993

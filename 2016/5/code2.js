const md5 = require("md5");
const fs = require("fs");
const fileData = (fs.readFileSync("./input.txt")).toString().replace("\n","");

console.log(md5(fileData));

let i = 0;
let codes = [];
while (codes.filter((b)=>b!==undefined).length < 8) {
	const hash = md5(fileData + String(i));
	if (hash.substring(0,5) === "00000" && parseInt(hash.substr(5,1)) < 8 && codes[hash.substr(5,1)] === undefined) {
		codes[hash.substr(5,1)] = hash.substr(6,1)
	}
	i++;
	if (i % 500000 === 0) { console.log(i, codes.filter((b)=>b!==undefined).length); }
}

console.log("***", codes.join(""));
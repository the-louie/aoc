const md5 = require("md5");
const fs = require("fs");
const fileData = (fs.readFileSync("./input.txt")).toString().replace("\n","");

console.log(md5(fileData));

let i = 0;
let codes = "";
while (codes.length < 8) {
	const hash = md5(fileData + String(i));
	if (hash.substring(0,5) === "00000") {
		codes += hash.substr(5,1);
	}
	i++;
	if (i % 500000 === 0) { console.log(i, codes); }
}

console.log("***", codes);
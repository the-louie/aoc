const fs = require("fs");
const fileData = (fs.readFileSync("./input.txt")).toString();
const rawData = fileData.split("\n").filter((r) => r.length > 0);

// only lowercase chars and positive amounts
const caesar = (str, amount) => str.split("").map((c) => ((c.charCodeAt(0) >= 97) && (c.charCodeAt(0) <= 122)) ? String.fromCharCode(((c.charCodeAt(0) - 97 + amount) % 26) + 97) : undefined).join("");

rawData.forEach((data) => {
	const room = data.substr(0, data.lastIndexOf("-")).replace(new RegExp(/-/g), "");
	const id = parseInt(data.substring(data.lastIndexOf("-") + 1, data.indexOf("[")));
	const chksum = data.substr(data.indexOf("[")+1, 5);
	const letters = room.split("").reduce((a, l) => { if (a[l] === undefined) { a[l] = 0; } a[l]++; return a; }, {});
	const sorted = Object.keys(letters).reduce((a, k) => a.concat([[k, letters[k]]]), []).sort((a, b) => (a[1] == b[1]) ? a[0].charCodeAt(0) - b[0].charCodeAt(0) : b[1] - a[1]).map((a) => { return a[0]; });
	if (sorted.join("").substring(0,5) === chksum && caesar(room, id).toLowerCase().indexOf("north") !== -1) { console.log(caesar(room, id), id) }
});

// 548
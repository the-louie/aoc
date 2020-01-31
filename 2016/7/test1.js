const md5 = require("md5");
const fs = require("fs");
const fileData = (fs.readFileSync("./input.txt")).toString();

const matches = (addr) => addr.split("").reduce((acc, curr, i, all) => acc || (all[i]+all[i+1] == all[i+3] + all[i+2] && all[i]!==all[i+1]), false)
const ok = fileData.split("\n").reduce((acc, addr) => (matches(addr) &&  addr.match(/\[(.*?)\]/g) ? addr.match(/\[(.*?)\]/g).every((submatch) => !matches(submatch)) : false) ? acc.concat([addr]) : acc, []);

console.log("ok", ok.length); // 118

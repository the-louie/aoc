const md5 = require("md5");
const fs = require("fs");
const fileData = (fs.readFileSync("./input.txt")).toString();

//-- test data
// const fileData = `aba[bab]xyz
// xyx[xyx]xyx
// aaa[kek]eke
// zazbz[bzb]cdb
// `;


const matches = (addr) => addr.split("").reduce((acc, curr, i, all) => (addr[i] === addr[i+2] && addr[i] !== addr[i+1]) ? acc.concat([addr[i+1]+addr[i]+addr[i+1]]) : acc, []);

const hasABA = (addrs) => addrs.reduce((acc, addr) => acc.concat(matches(addr)), []).filter((f) => f.length > 0);
const hasBAB = (addrs, abas) => abas.reduce((aacc, aba) => aacc || addrs.reduce((bacc, addr) => bacc || addr.indexOf(aba) !== -1, false), false);

const getSupernet = (addr) => addr.replace(/\[.*?\]/g, " ").split(" ");
const getHypernets = (addr) => (addr.match(/\[.*?\]/g)) ? (addr.match(/\[.*?\]/g)).map((m) => m.replace("[","").replace("]", "")) : [];

const ok = fileData.split("\n").reduce((acc, addr) => hasBAB(getHypernets(addr), hasABA(getSupernet(addr))) ? acc.concat([addr]) : acc, []);

console.log("ok", ok.length); // 260

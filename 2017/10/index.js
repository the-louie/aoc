// const test = [0, 1, 2, 3, 4];
// let data = test.slice(0);
// const lengths = [3, 4, 1, 5];
let dataarr = (new Array(256)).fill(0).map((v, i) => i);
const lengths1 = [
  199,
  0,
  255,
  136,
  174,
  254,
  227,
  16,
  51,
  85,
  1,
  2,
  22,
  17,
  7,
  192
];
const lengths2 = lengths1.join(',').split('').reduce((acc, curr) => acc.concat([curr.charCodeAt(0)]), []);
// console.log(asciilengths);
// console.log(data.length, JSON.stringify(data));


const cslice = (arr, start, end) => {
  // circular arr.slice
  let res = arr.slice(start, end);
  if (end > arr.length) {
    res = res.concat(arr.slice(0, end - arr.length));
  }
  return res;
};

function flip(arr, start, len) {
    const rslice = cslice(arr, start, (start + len)).reverse();
    for (let i=start; i<start+len; i++) {
      arr[i % arr.length] = rslice[ (i-start) % rslice.length];
    }
    return arr;
}

function run1(data, lengths) {
  let skipsize = 0;
  let pos = 0;
  for (let len of lengths) {
    // console.log(`==== ${pos} ${len} => ${data.slice(0).join(',')}`, `*** ${len + skipsize} % ${data.length} = ${(len+skipsize) % data.length}`);
    data = (flip(data.slice(0), pos, len)).slice(0);
    pos = (pos + len + skipsize) % data.length;
    skipsize++;
    // const odata = data;
    // console.log(pos, len, odata.slice(0), " ==> ", data.slice(0));
  }
  // console.log(`==== ${pos} X => ${data.slice(0).join(',')}`);
  console.log("1 result:", data[0]*data[1]);
  // console.log(flip(test, 0, 3));
}

function run2(datain, lengthsin) {
  let skipsize = 0;
  let pos = 0;
  let data = datain.slice(0);
  let lengths = lengthsin
    .split("")
    .reduce((acc, curr) => acc.concat([curr.charCodeAt(0)]), [])
    .concat([17, 31, 73, 47, 23]);
  for (let i = 0; i<64; i++) {
    // console.log("*", i, data.join(','));
    for (let len of lengths) {
      // console.log(`==== ${pos} ${len} => ${data.slice(0).join(',')}`, `*** ${len + skipsize} % ${data.length} = ${(len+skipsize) % data.length}`);
      data = (flip(data.slice(0), pos, len)).slice(0);
      pos = (pos + len + skipsize) % data.length;
      skipsize++;
      // const odata = data;
      // console.log(pos, len, odata.slice(0), " ==> ", data.slice(0));
    }

  }
  // console.log("data", data.join(","));
  // console.log("-");
  let sparse = [];
  for (let i = 0; i<16; i++) {
    let d = 0;
    for (let j = 0; j<16; j++) {
      d = d ^ data[j+(i*16)];
      // console.log(`\t${d} (${data[j+(i*16)]})`);
    }
    // console.log(i, d);
    sparse.push(d);
  }
  // console.log("sparse.length", sparse.length);
  // console.log("sparse", sparse.map(c => c < 16 ? '0' + c.toString(16) : c.toString(16)).join(""));
  const sparsehex = sparse.map(c => c < 16 ? '0' + c.toString(16) : c.toString(16)).join("");
  return sparsehex;
}

// run1(dataarr.slice(0), lengths1);

const test2 = [
  ["", "a2582a3a0e66e6e86e3812dcb672a272"],
  ["AoC 2017", "33efeb34ea91902bb2f59c9920caa6cd"],
  ["1,2,3", "3efbe78a8d82f29979031a4aa0b16a9d"],
  ["1,2,4", "63960835bcdc130f0b66d7ff4f6a5a8e"],
  ["199,0,255,136,174,254,227,16,51,85,1,2,22,17,7,192", ""],
];
for (const t of test2) {
  const r = run2(dataarr, t[0]);
  console.log(r, t[1], r == t[1]);

}
// run2(dataarr.slice(0), lengths2);
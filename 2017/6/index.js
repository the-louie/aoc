const testdata = [ 0, 2, 7, 0, ];
const data = [4, 1, 15, 12, 0, 9, 9, 5, 5, 8, 7, 3, 14, 5, 12, 3];
let mem = {};

const maxBank = data => (data.reduce((acc, curr, i) => curr > acc.count ? {count: curr, i: i} : acc, {count: -1})).i;

function redistribute(data) {
    const start = maxBank(data);
    const count = data[start];
    data[start] = 0;
    // console.log(`Starting at ${start} with ${count} items`);
    for (let i = 0; i<count; i++) {
        const I = (i + start + 1) % data.length;
        data[I]++;
        // console.log(i, "gave one to", I);
    }
    return data;
}
function run1(data) {
    // console.log(maxBank(testdata));
    let dupe = false;
    let curr = data.slice(0);
    let i = 0;
    while (!dupe) {
        curr = redistribute(curr);
        i++;
        const currs = curr.join('');
        if (mem[currs] !== undefined) { dupe = true; }
        mem[currs] = true;
        // console.log(i, Object.keys(mem).join(' '));
    }
    console.log(i);
}
function run2(data) {
    // console.log(maxBank(testdata));
    let dupe = false;
    let curr = data.slice(0);
    let currs = "";
    let i = 0;
    while (!dupe) {
        curr = redistribute(curr);
        i++;
        currs = curr.join('');
        if (mem[currs] !== undefined) { 
            dupe = true;
        } else {
            mem[currs] = i;
        }
        // console.log(i, Object.keys(mem).join(' '));
    }
    console.log(i, mem[currs], "=>", i - mem[currs]);
}

run1(data.slice(0));
run2(data.slice(0));

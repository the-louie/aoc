const testinput = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`.split("\n");

const realinput = require("./input.js").split("\n");

function parse(str) {
    const a = str.split(' <-> ');
    const id = parseInt(a[0]);
    const children = a[1].split(", ").map(i => parseInt(i));
    return {id: id, children: children};
}

// console.log(testinput);
// create basic list
function run1(data) {
    // let blist = {};
    let zlist = [ 0 ];
    for (let j=0; j<data.length; j++) { // just brute the shit out of this
        for (const r of data) {
            const p = parse(r);
            // blist[p.id] = p.children;
            // console.log(r);
            if (zlist.indexOf(p.id) !== -1) {
                 zlist = zlist.concat(p.children).reduce((acc, curr) => { return acc.indexOf(curr) === -1 ? acc.concat([curr]) : acc; }, []);
                //  console.log(zlist);
            }
        }
        console.log(`${j}/${data.length}: ${zlist.length}`);

    }
    return zlist.length;
}
function run2(data) {
    // let blist = {};
    // console.log(data);
    let lists =  {};

    for (const r of data) {
        const p = parse(r);
        // console.log(`-- start ${p.id} -------------------`);
        if (lists[p.id.toString()] === undefined) { lists[p.id.toString()] = []; }
        // is p.id child of another previous node?
        const childOf = Object.keys(lists).reduce((acc, curr) => lists[curr].indexOf(p.id) !== -1 ? curr : acc, -1);
        const childIn = p.children.reduce((acc, curr) => {
            for (const k in lists) {
                const knownchild = (lists[k].indexOf(curr));
                if (knownchild !== -1) return k;
            }
            return acc;
        }, -1);
        const addto = childOf !== -1 ? childOf.toString() : childIn !== -1 ? childIn.toString() : p.id.toString();
        // console.log(`${p.id}: ${p.children.join(',')} ---> ${childOf} / ${childIn} (addto: ${addto})`);
        lists[addto] = lists[addto]
            .concat(p.children)
            .reduce((acc, curr) => {
            return acc.indexOf(curr) === -1 ?
                acc.concat([curr]) :
                acc;
            }, []);

        // console.log(`${j} / ${data.length} === ${Object.keys(lists).reduce((acc, curr) => lists[curr].length===0 ? acc : acc+1, 0)}`);
/*
[ '0 <-> 2',
  '1 <-> 1',
  '2 <-> 0, 3, 4',
  '3 <-> 2, 4',
  '4 <-> 2, 3, 6',
  '5 <-> 6',
  '6 <-> 4, 5' ]
  */
}
    const  Z = Object.keys(lists).reduce((acc, curr, i) => {
        return lists[curr].length > 0 ? acc.concat([`${curr} <-> ${lists[curr].join(", ")}`]) : acc;
    }, []);
    // console.log("Z", Z);
    return Z;
    // return Object.keys(lists).reduce((acc, curr) => lists[curr].length===0 ? acc : acc+1, 0);
}
// console.log("test", run1(testinput));
// console.log("real", run1(realinput));
console.log("test", run2(testinput));
let oldData = [];
let data = realinput.slice(0);
// for (let i=0; i<10; i++) {
while (oldData.length !== data.length) {
    oldData = data.slice(0);
    data = run2(data);

    console.log(`real ${data.length} (${oldData.length})`);
}



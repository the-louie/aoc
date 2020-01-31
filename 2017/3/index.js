// const maxI =
const maxX = 11;
const maxY = 11;
let world = (new Array(maxX*maxY));
let sumworld = new Array(maxX * maxY);
let sumi = new Array(maxX*maxY);
let distance = new Array(maxX*maxY);

for (let i=0; i<maxX*maxY; i++) { world[i] = 0; }

function draw(world) {
    for (let Y = 0; Y < maxY; Y++) {
    console.log(
        world
        .slice(Y * maxX, Y * maxX + maxX)
        .map(n => zpad(n))
        .toString()
        .replace(/,/g, " ")
    );
    }

}
function zpad(i) {
    if (i<10) {
        return "  "+i;
    } else if (i<100) {
        return " " + i;
    } else {
        return i.toString();
    }
}

function msum(world, x, y) {
    const deltas = [-1, 0, 1];
    let s = 0;
    for(let d1 of deltas) {
        let dy = y + d1;
        for (let d2 of deltas) {
            let dx = x + d2;
            s += world[dy * maxX + dx] === undefined ? 0 : world[dy * maxX + dx];
        }
    }
    console.log(`${x}x${y}=${s}` );
    draw(world);
    return s;
}

let x = Math.floor(maxX/2);
let y = Math.floor(maxY/2);
let lx = 0;
let ly = 0;
let s = 0;

world[y * maxX + x] = 1;
sumworld[y * maxX + x] = 1;
for (let i=1; i<maxX*maxY; i++) {

    sumi[i] = msum(sumworld, x, y);
    sumworld[y * maxX + x] = msum(sumworld, x, y);
    world[y * maxX + x] = i;

    distance[i] = Math.abs(Math.floor(maxX / 2) - x) + Math.abs(Math.floor(maxY / 2) - y);
    // console.log(i, `${x},${y}`, "-", s);

    if (s===0 && world[((y-1)*maxX)+x] ==0) { s = 1;}
    if (s===1 && world[(y*maxX)+(x-1)] ==0) { s = 2;}
    if (s===2 && world[((y+1)*maxX)+x] ==0) { s = 3;}
    if (s===3 && world[(y*maxX)+(x+1)] ==0) { s = 0;}

    if (s === 0) { // right
        lx = 1;
        ly = 0;
    } else if (s === 1) { // up
        lx = 0;
        ly = -1;
    } else if (s === 2) { /// left
        lx = -1;
        ly = 0;
    } else if (s === 3) { // down
        lx = 0;
        ly = 1;
    }

    x += lx;
    y += ly;


}
// world[sy*maxX+sx] = 1;

// Draw
draw(world);

// console.log(distance.toString());
console.log("Distance");
for(let n of [1, 12, 23, 1024, 265149]) {
    console.log(n, distance[n-1]);
}
console.log("");
console.log("Sums");
for(let n of [1, 2, 3, 4, 5]) {
    console.log(n, sumi[n-1]);
}
console.log("");
draw(sumworld);

let ai = 1;
while (sumi[ai] < 265149) { ai++; }
console.log(ai, sumi[ai]);

// for (let Y = 0; Y < maxY; Y++) {
//   console.log(
//     sumworld
//       .slice(Y * maxX, Y * maxX + maxX)
//       .map(n => zpad(n))
//       .toString()
//       .replace(/,/g, " ")
//   );
// }
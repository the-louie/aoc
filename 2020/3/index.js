// Change trees to 1 and everything else to 0
const fixInput = str => str.split('\n').filter(r=>r!='').map(r => r.split('').map(c => c === '#' ? 1 : 0))

// Load data
const inputdata = fixInput(require('fs').readFileSync('./input.txt').toString())
const testData = fixInput(`
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`)

const solve = (slope, movement) => movement.reduce((result, delta) => {
    let pos = {x: 0, y: 0}
    let hits = 0
    // Walk the path and add the value at the position in the slope
    while (pos.y < slope.length) {
        hits += slope[pos.y][pos.x]
        pos.x = (pos.x + delta.x) % slope[pos.y].length
        pos.y += delta.y
    }

    return result * hits
}, 1)

const part1 = [{x: 3, y: 1}]
const part2 = [
    {x: 1, y: 1},
    {x: 3, y: 1},
    {x: 5, y: 1},
    {x: 7, y: 1},
    {x: 1, y: 2},
]

const rt = solve(testData, part1)
console.log(rt, rt === 7)

const r1 = solve(inputdata, part1) 
console.log(r1)

const r2 = solve(inputdata, part2) 
console.log(r2)

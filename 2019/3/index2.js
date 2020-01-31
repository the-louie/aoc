const fs = require('fs')
const maps = []
const start = { x: 10000, y: 10000 }

// const tdata = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
// U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`
const tdata = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`

fs.readFile('./input.txt', 'utf8', function (err, data) {
  part2(data)
})

function makeTrail (line, pos, axis, distance) {
  let x = pos.x
  let y = pos.y
  let steps = pos.steps

  for (let n = 0; n < Math.abs(distance); n++) {
    if (axis === 'x') {
      x += Math.sign(distance)
    } else if (axis === 'y') {
      y += Math.sign(distance)
    }
    steps++
    if (maps[line] === undefined) { maps[line] = {} }
    if (maps[line][x] === undefined) { maps[line][x] = {} }
    if (maps[line][x][y] === undefined) {
      maps[line][x][y] = steps
    } else {
      // steps = maps[line][x][y]
    }
  }

  return { x: x, y: y, steps: steps }
}
function part2 (data) {
  data.split('\n').reduce((acc, curr) => acc.concat([curr.split(',')]), []).filter((a) => a !== '').forEach((line, i) => {
    let pos = {
      x: start.x,
      y: start.y,
      steps: 0
    }
    line.forEach((move) => {
      const direction = move[0]
      const distance = parseInt(move.substring(1))

      switch (direction) {
        case 'L':
          pos = makeTrail(i, pos, 'x', -distance)
          break
        case 'R':
          pos = makeTrail(i, pos, 'x', distance)
          break
        case 'U':
          pos = makeTrail(i, pos, 'y', -distance)
          break
        case 'D':
          pos = makeTrail(i, pos, 'y', distance)
          break

        default:
          break
      }
      // console.log(pos)
    })
  })

  let winner = Number.MAX_SAFE_INTEGER
  Object.keys(maps[0]).forEach((m0x) => {
    Object.keys(maps[0][m0x]).forEach((m0y) => {
      if (maps[1][m0x] !== undefined && maps[1][m0x][m0y] !== undefined) {
        if (maps[0][m0x][m0y] + maps[1][m0x][m0y] < winner) {
          winner = maps[0][m0x][m0y] + maps[1][m0x][m0y]
        }
        console.log(m0x, m0y, maps[0][m0x][m0y], '-', maps[1][m0x][m0y], '==', maps[0][m0x][m0y] + maps[1][m0x][m0y])

      }
    })
  })
  console.log(winner)
}

// console.log(maps[1])
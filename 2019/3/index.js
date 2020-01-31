const fs = require('fs')
const map = []
const crossings = []
const crossings2 = []
const start = { x: 10000, y: 10000 }

function mdist(x0, x1, y0, y1) {
  return (Math.abs(x1 - x0) + Math.abs(y1 - y0))
}

let winner = [0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
let winner2 = [0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]

// fs.readFile('./input.txt', 'utf8', function (err, data) {
//   if (err) {
//     throw err
//   }
//   data.split('\n').reduce((acc, curr) => acc.concat([curr.split(',')]), []).filter((a) => a !== '').forEach((line, i) => {
//     const pos = {x: start.x, y: start.y, steps: 0}
//     line.forEach((move) => {
//       const direction = move[0]
//       const distance = parseInt(move.substring(1))
//       let newx = 0
//       let newy = 0
//       let dist = 0
//       switch (direction) {
//         case 'L':
//           newx = pos.x - distance
//           for (let x = Math.min(pos.x, newx); x <= Math.max(pos.x, newx); x++) {

//             if (map[x] === undefined) { map[x] = [] }
//             if (map[x][pos.y] !== undefined && map[x][pos.y] !== i) {
//               // console.log('X', i, x, pos.y, map[x][pos.y])
//               map[x][pos.y] += i
//               dist = mdist(start.x, x, start.y, pos.y)
//               crossings.push([x, pos.y, dist])
//               if (dist > 0 && dist < winner[2]) {
//                 winner = [x, pos.y, dist]
//               }
//             } else {
//               map[x][pos.y] = i
//             }
//           }
//           pos.x -= distance
//           break

//         case 'R':
//           newx = pos.x + distance
//           for (let x = Math.min(pos.x, newx); x <= Math.max(pos.x, newx); x++) {
//             if (map[x] === undefined) { map[x] = [] }
//             if (map[x][pos.y] !== undefined && map[x][pos.y] !== i) {
//               // console.log('X', i, x, pos.y, map[x][pos.y])
//               map[x][pos.y] += i
//               dist = mdist(start.x, x, start.y, pos.y)
//               crossings.push([x, pos.y, dist])
//               if (dist > 0 && dist < winner[2]) {
//                 winner = [x, pos.y, dist]
//               }

//             } else {
//               map[x][pos.y] = i
//             }
//           }
//           pos.x += distance
//           break

//         case 'U':
//           newy = pos.y - distance
//           for (let y = Math.min(pos.y, newy); y <= Math.max(pos.y, newy); y++) {
//             if (map[pos.x] === undefined) { map[pos.x] = [] }
//             if (map[pos.x][y] !== undefined && map[pos.x][y] !== i) {
//               // console.log('Y', i, pos.x, y, map[pos.x][y])
//               map[pos.x][y] += i
//               dist = mdist(start.x, pos.x, start.y, y)
//               crossings.push([pos.x, y, dist])
//               if (dist > 0 && dist < winner[2]) {
//                 winner = [pos.x, y, dist]
//               }

//             } else {
//               map[pos.x][y] = i
//             }
//           }
//           pos.y -= distance
//           break

//         case 'D':
//           newy = pos.y + distance
//           for (let y = Math.min(pos.y, newy); y <= Math.max(pos.y, newy); y++) {
//             if (map[pos.x] === undefined) { map[pos.x] = [] }
//             if (map[pos.x][y] !== undefined && map[pos.x][y] !== i) {
//               // console.log('Y', i, pos.x, y, map[pos.x][y])
//               map[pos.x][y] += i
//               dist = mdist(start.x, pos.x, start.y, y)
//               crossings.push([pos.x, y, dist])
//               if (dist > 0 && dist < winner[2]) {
//                 winner = [pos.x, y, dist]
//               }
//             } else {
//               map[pos.x][y] = i
//             }
//           }
//           pos.y += distance
//           break

//         default:
//           break
//       }

//       // if (map[pos.x] === undefined) { map[pos.x] = [] }
//       // if (map[pos.x][pos.y] !== undefined) {
//       //   console.log('!', pos)
//       // }
//       // map[pos.x][pos.y] = i
//       // console.log(move, pos, i)
//     })
//   })
//   console.log(crossings)
//   console.log('first', winner)
// })
let crossxy = []
fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    throw err
  }
//   const tdata = `R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83`
  const tdata = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`
  tdata.split('\n').reduce((acc, curr) => acc.concat([curr.split(',')]), []).filter((a) => a !== '').forEach((line, i) => {

    const pos = {x: start.x, y: start.y, steps: 0}
    line.forEach((move) => {
      const direction = move[0]
      const distance = parseInt(move.substring(1))
      // console.log('***', pos, '***', direction, distance)
      let newx = 0
      let newy = 0
      let dist = 0
      let magic = (i*2) - 1
      switch (direction) {
        case 'L':
          newx = pos.x - distance
          for (let x = pos.x; x > newx; x--) {
            // console.log(i, direction, distance, x, pos.y, pos.steps)
            if (map[x] === undefined) { map[x] = [] }
            if (map[x][pos.y] !== undefined && Math.sign(map[x][pos.y]) !== magic) {
              console.log('!X', i, direction, x, pos.y, map[x][pos.y], pos.steps, Math.abs(map[x][pos.y]) + pos.steps)
              map[x][pos.y] = Math.abs(map[x][pos.y]) + pos.steps

              dist = mdist(start.x, x, start.y, pos.y)
              if (crossings[x] === undefined) { crossings[x] = [] }
              if (crossings[x][pos.y] === undefined) { crossings[x][pos.y] = 0 }
              crossings[x][pos.y] = map[x][pos.y]
              crossxy.push([x, pos.y, map[x][pos.y]])
              if (dist > 0 && dist < winner[2]) {
                winner = [x, pos.y, dist]
              }
            } else if (map[x][pos.y] !== undefined && Math.sign(map[x][pos.y]) !== magic) {
              pos.steps = map[x][pos.y]
              console.log('REVISIT', i, x, pos.y, pos.steps, map[x][pos.y])
            } else {
              map[x][pos.y] = magic * pos.steps
            }
            pos.steps++
          }
          pos.x -= distance
          break

        case 'R':
          newx = pos.x + distance
          for (let x = Math.min(pos.x, newx); x <= Math.max(pos.x, newx); x++) {
            // console.log(i, direction, distance, x, pos.y, pos.steps)

            if (map[x] === undefined) { map[x] = [] }
            if (map[x][pos.y] !== undefined && Math.sign(map[x][pos.y]) !== magic) {
              console.log('!x', i, direction, x, pos.y, map[x][pos.y], pos.steps, Math.abs(map[x][pos.y]) + pos.steps)
              map[x][pos.y] = Math.abs(map[x][pos.y]) + pos.steps
              dist = mdist(start.x, x, start.y, pos.y)
              if (crossings[x] === undefined) { crossings[x] = [] }
              if (crossings[x][pos.y] === undefined) { crossings[x][pos.y] = 0 }
              crossings[x][pos.y] = map[x][pos.y]
              crossxy.push([x, pos.y, map[x][pos.y]])

              if (dist > 0 && dist < winner[2]) {
                winner = [x, pos.y, dist]
              }
            } else if (map[x][pos.y] !== undefined && Math.sign(map[x][pos.y]) !== magic) {
              pos.steps = map[x][pos.y]
              console.log('REVISIT', i, x, pos.y, pos.steps, map[x][pos.y])
            } else {
              map[x][pos.y] = magic * pos.steps
            }
            pos.steps++
          }
          pos.x += distance
          break

        case 'U':
          newy = pos.y - distance
          for (let y = pos.y; y < newy; y--) {
            // console.log(i, direction, distance, pos.x, y, pos.steps)

            if (map[pos.x] === undefined) { map[pos.x] = [] }
            if (map[pos.x][y] !== undefined && Math.sign(map[pos.x][y]) !== magic) {
              console.log('!Y', i, direction, pos.x, y, map[pos.x][y], pos.steps, Math.abs(map[pos.x][y]) + pos.steps)
              map[pos.x][y] = Math.abs(map[pos.x][y]) + pos.steps
              dist = mdist(start.x, pos.x, start.y, y)
              if (crossings[pos.x] === undefined) { crossings[pos.x] = [] }
              if (crossings[pos.x][y] === undefined) { crossings[pos.x][y] = 0 }
              crossings[pos.x][y] = map[pos.x][y]
              crossxy.push([pos.x, y, map[pos.x][y]])

              if (dist > 0 && dist < winner[2]) {
                winner = [pos.x, y, dist]
              }
            } else if (map[pos.x][y] !== undefined && Math.sign(map[pos.x][y]) === magic) {
              pos.steps = Math.abs(map[pos.x][y])
              console.log('REVISIT', i, pos.x, y, pos.steps, Math.abs(map[pos.x][y]))

            } else {
              map[pos.x][y] = magic * pos.steps
            }
            pos.steps++
          }
          pos.y -= distance
          break

        case 'D':
          newy = pos.y + distance
          for (let y = Math.min(pos.y, newy); y <= Math.max(pos.y, newy); y++) {
            // console.log(i, direction, distance, pos.x, y, pos.steps)

            if (map[pos.x] === undefined) { map[pos.x] = [] }
            if (map[pos.x][y] !== undefined && Math.sign(map[pos.x][y]) !== magic) {
              console.log('!y', i, direction, pos.x, y, map[pos.x][y], pos.steps, Math.abs(map[pos.x][y]) + pos.steps)
              map[pos.x][y] = Math.abs(map[pos.x][y]) + pos.steps
              dist = mdist(start.x, pos.x, start.y, y)
              if (crossings[pos.x] === undefined) { crossings[pos.x] = [] }
              if (crossings[pos.x][y] === undefined) { crossings[pos.x][y] = 0 }
              crossings[pos.x][y] = map[pos.x][y]
              crossxy.push([pos.x, y, map[pos.x][y]])
              if (dist > 0 && dist < winner[2]) {
                winner = [pos.x, y, dist]
              }
            } else if (map[pos.x][y] !== undefined && Math.sign(map[pos.x][y]) === magic) {
              console.log('REVISIT', i, pos.x, y, pos.steps, Math.abs(map[pos.x][y]))
              pos.steps = Math.abs(map[pos.x][y])

            } else {
              map[pos.x][y] = magic * pos.steps
            }
            pos.steps++
          }
          pos.y += distance
          break

        default:
          break
      }

      // if (map[pos.x] === undefined) { map[pos.x] = [] }
      // if (map[pos.x][pos.y] !== undefined) {
      //   console.log('!', pos)
      // }
      // map[pos.x][pos.y] = i
      // console.log(move, pos, i)
    })
  })

  // crossxy.forEach((xy) => {
  //   console.log(crossings[xy[0]][xy[1]])
  // })

  // console.log(crossxy)
  const sorted = crossxy.sort((a, b) => {
    if (a[2] < b[2]) { return -1 }

    return 1
  })
  console.log(sorted)
})

/*
 *
 * FIRST TRY FAILED
 *
 *

let movements = [
  [], // first line
  [] // second line
]

const between = (x, a, b) => {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return x >= min && x <= max
}

fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    throw err
  }
  const input = data.split('\n')
  input.forEach((m, i) => {
    const moves = m.split(',').filter((a) => a !== '')
    const pos = {
      x: 0,
      y: 0
    }

    moves.forEach((move) => {
      const direction = move[0]
      const distance = parseInt(move.substring(1))
      switch (direction) {
        case 'L':
          if (movements[i]['y' + pos.y] === undefined) { movements[i]['y' + pos.y] = [] }
          movements[i]['y' + pos.y].push([pos.x - distance, pos.x])
          pos.x -= distance
          break

        case 'R':
          if (movements[i]['y' + pos.y] === undefined) { movements[i]['y' + pos.y] = [] }
          movements[i]['y' + pos.y].push([pos.x, pos.x + distance])
          pos.x += distance
          break

        case 'U':
          if (movements[i]['x' + pos.x] === undefined) { movements[i]['x' + pos.x] = [] }
          movements[i]['x' + pos.x].push([pos.y + distance, pos.y])
          pos.y -= distance
          break

        case 'D':
          if (movements[i]['x' + pos.x] === undefined) { movements[i]['x' + pos.x] = [] }
          movements[i]['x' + pos.x].push([pos.y, pos.y + distance])
          pos.y += distance
          break

        default:
          break
      }
      // console.log(i, direction, distance, pos)
    })

    // console.log(movements)
    // console.log(i, moves)
  })

  const crossings = []
  const pos = {x: 0, y: 0}
  input[1].split(',').filter((a) => a !== '').some((move, i) => {
    const direction = move[0]
    const distance = parseInt(move.substring(1))
    // console.log(pos, direction, distance)
    switch (direction) {
      case 'L':
        // check y
        if (movements[0]['y' + pos.y] === undefined) { break }
        movements[0]['y' + pos.y].forEach((xx) => {
          if (between(pos.x, xx[0], xx[1])) {
            console.log('y' + pos.y, pos.x, xx[0], '-', xx[1], between(pos.x, xx[0], xx[1]))
            crossings.push([])
          }
        })
        pos.x -= distance
        break

      case 'R':
        // check y
        if (movements[0]['y' + pos.y] === undefined) { break }
        movements[0]['y' + pos.y].forEach((xx) => {
          if (between(pos.x, xx[0], xx[1])) {
            console.log('y' + pos.y, pos.x, xx[0], '-', xx[1], between(pos.x, xx[0], xx[1]))
          }
        })
        pos.x += distance
        break

      case 'U':
        // check y
        if (movements[0]['x' + pos.x] === undefined) { break }
        movements[0]['x' + pos.x].forEach((yy) => {
          if (between(pos.y, yy[0], yy[1])) {
            console.log('x' + pos.x, pos.y, yy[0], '-', yy[1], between(pos.y, yy[0], yy[1]))
          }
        })
        pos.y -= distance
        break

      case 'D':
        // check y
        if (movements[0]['x' + pos.x] === undefined) { break }
        movements[0]['x' + pos.x].forEach((yy) => {
          if (between(pos.y, yy[0], yy[1])) {
            console.log('x' + pos.x, pos.y, yy[0], '-', yy[1], between(pos.y, yy[0], yy[1]))
          }
        })
        pos.y += distance
        break

      default:
        break
    }
    // return true
  })
})
*/

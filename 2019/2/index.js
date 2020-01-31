const fs = require('fs')

// const data = [ 1, 0, 0, 0, 99 ]
// const data = [ 2,4,4,5,99,0 ]
// const data = [ 1,1,1,4,99,5,6,0,99 ]



let p = 0

const parse = (p, ops) => {
  let op = ops[p]
  let a = ops[p+1]
  let b = ops[p+2]
  let z = ops[p+3]
  let c = -1
  switch (op) {
    case 1:
      c = ops[a] + ops[b]
      break
    case 2:
      c = ops[a] * ops[b]
      break
    case 99:
      return ops
    default:
      break
  }
  ops[z] = c

  // console.log(p, ops[p], a, b, c)
  // console.log(ops)
  return parse(p + 4, ops)
}

// part 1
// fs.readFile('./input.txt', 'utf8', function (err, data) {
//   if (err) {
//     throw err
//   }
//   let d = data.split(',').map((n) => parseInt(n)).filter((n) => !isNaN(n))
//   d[1] = 12
//   d[2] = 2
//   // console.log(d)
//   console.log(parse(p, d)[0])
// })
// part 2
fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    throw err
  }

  // target 19690720
  for (let a=0; a<=100000; a++) {
    for (let b=0; b<=100000; b++) {
      const d = data.split(',').map((n) => parseInt(n)).filter((n) => !isNaN(n))
      d[1] = a
      d[2] = b
      let x = parse(p, d)[0]
      console.log(x, a, b)
      if (x == 19690720) {
        console.log(a, b, '=', x)
        process.exit(0)
      }
    }
  }
})

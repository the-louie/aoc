const fs = require('fs')

// const data = [ 1, 0, 0, 0, 99 ]
// const data = [ 2,4,4,5,99,0 ]
// const data = [ 1,1,1,4,99,5,6,0,99 ]

const INPUT = 1

// let p = 0
const parseOp = (opmp) => {
  console.log('opmp', opmp)
  const op = opmp % 100
  let mo = String(Math.floor(opmp / 100)).split('')
  let n = 0
  let N = [0,0,0,0]
  while (mo !== undefined && mo.length !== 0) {
    N[n] = parseInt(mo.pop())
  }
  return [op, N]
}
const parseOps = (ops, p) => {
  const opmp = ops[p]
  console.log('?', '#'+p, ops[p], ops[p+1], ops[p+2], ops[p+3], ops[p+4])
  let a
  let b
  let c

  let popmp = parseOp(opmp)
  let op = popmp[0]
  let N = popmp[1]

  console.log(op, N)

  switch (opmp) {
    case 3: // INPUT
      return [opmp, INPUT, ops[++p], undefined, undefined, ++p]

    case 4: // OUTPUT
      return [opmp, ops[++p], undefined, undefined, undefined, ++p]

    case 1:
      // [op, N] = parseOp(opmp)
      a = N[0] === 0 ? ops[ops[++p]] : ops[++p]
      b = N[1] === 0 ? ops[ops[++p]] : ops[++p]
      c = N[2] === 0 ? ops[ops[++p]] : ops[++p]
      // console.log(op, a+b, a, b, ++p)
      return [op, a + b, a, b, c, ++p]

    case 2:
      // [op, N] = parseOp(opmp)
      a = N[0] === 0 ? ops[ops[++p]] : ops[++p]
      b = N[1] === 0 ? ops[ops[++p]] : ops[++p]
      c = N[2] === 0 ? ops[ops[++p]] : ops[++p]
      // console.log(op, a+b, a, b, ++p)
      return [op, a * b, a, b, c, ++p]

      // returnera mer av instruktionen!
      // retunera värden att addera eller multiplicera

      return [op, N]

    default:
      return [0, undefined, undefined, undefined, undefined, ++p]
  }
}

const parse = (p, ops) => {

  // console.log('opmp', opmp)

  const r = parseOps(ops, p)
  const op = r[0]
  const val = r[1]
  const a = r[2]
  const b = r[3]
  const c = r[4]
  p = r[5]
  console.log('=', {op: op, val: val, a: a, b: b, p: p})

  switch (op) {
    case 1:
      console.log(op, 'ADD', a + '+' + b, '=', val, '@', c)
      // console.log(op, 'ADD', ops[++p], ops[++p])
      break
    case 2:
      // c = ops[a] * ops[b]
      break
    case 3:
      // ops[ops[p]] = INPUT
      console.log(op, 'STORE', val, '@', a)
      break
    case 4:
      break
    case 99:
      return ops
    default:
      break
  }
  console.log('> p =', p)
  return parse(p, ops)
}

// part 1
fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    throw err
  }
  let d = data.split(',').map((n) => parseInt(n)).filter((n) => !isNaN(n))
  // d[1] = 12
  // d[2] = 2
  // console.log(d)
  console.log(parse(0, d))
})


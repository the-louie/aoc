/**
 * problemet är att värden sparas inte i ops array
 *
 * operation { op: 3, val: 1, dst: 225, p: 2 } 0
 * operation { op: 1, val: 1101, a: 1, b: 1100, dst: 1100, p: 6 } 0
 * ERRROR 1100
 *
 * den #2 instruktionen borde skriva 1101 till position 6, och skriva över 1100
 */

const fs = require('fs')

const dbg = true

// const INPUT = 1 // problem 1
const INPUT = 5 // problem 2

// Parse OP BitMask
const parseOpBM = (opmp) => {
  const op = opmp % 100
  let mo = String(Math.floor(opmp / 100)).split('').map(d => parseInt(d))
  while (mo.length < 3) {
    mo.unshift(0)
  }
  mo.reverse()
  return {op: op, bitmask: mo}
}

const OPS=[
  undefined,
  'ADD',
  'MUL',
  'INP',
  'OUT',
  'JMT',
  'JMF',
  'JML',
  'JME'
]

function parseOp (p, ops) {
  // // console.log('pO() ops[6]', ops[6])
  const D = [ ops[p], ops[p + 1], ops[p + 2], ops[p + 3] ]
  const opmp = ops[p]
  const P = p
  if (opmp === 3) { // INPUT
    const D = [ ops[p], ops[p + 1] ]
    return {
      P: P,
      op: opmp,
      val: INPUT,
      dst: ops[++p],
      p: ++p,
      D: D.join(',')
    }
  } else if (opmp === 99) {
    return { op: opmp, p: -1, D: D.slice(0, 1).join(',') }
  } else {
    const opmpparsed = parseOpBM(opmp)
    // console.log('opmpparsed.op', opmpparsed.op, opmpparsed.bitmask)
    const op = opmpparsed.op
    const bits = opmpparsed.bitmask

    if (op === 1) { // ADD
      const a = (bits[0] === 0 ? ops[ops[++p]] : ops[++p])
      const b = (bits[1] === 0 ? ops[ops[++p]] : ops[++p])
      const val = a + b
      const dst = ops[++p]

      if (dbg) console.log(P, OPS[op], a, b, '=', val, ' STORE @', dst)

      if (P === 304) {
        console.log('**************************')
        console.log(D, bits[0], bits[1], ops[P+1], ops[P+2], ops[ops[P+1]], ops[ops[P+2]])
        console.log('**************************')
      }

      return {
        P: P,
        op: op,
        val: val,
        a: a,
        b: b,
        dst: dst,
        p: ++p,
        bm: bits.join(','),
        D: D.join(',')
      }
    } else if (op === 2) { // MULTIPLY
      const a = bits[0] === 0 ? ops[ops[++p]] : ops[++p]
      const b = bits[1] === 0 ? ops[ops[++p]] : ops[++p]
      const val = a * b
      const dst = ops[++p]

      if (dbg) console.log(P, OPS[op], a, b, '=', val, ' STORE @', dst)

      return {
        P: P,
        op: op,
        val: val,
        a: a,
        b: b,
        dst: dst,
        p: ++p,
        bm: bits.join(','),
        D: D.join(',')
      }
    } else if (op === 4) { // OUTPUT
      const a = bits[0] === 0 ? ops[ops[++p]] : ops[++p]
      return {
        P: P,
        op: op,
        val: a,
        p: ++p,
        bm: bits.join(','),
        D: D.slice(0, 2).join(',')
      }
    } else if (op === 5) { // JUMP TRUE
      const a = bits[0] === 0 ? ops[ops[++p]] : ops[++p]
      const b = bits[1] === 0 ? ops[ops[++p]] : ops[++p]

      if (dbg) console.log(P, OPS[op], a, 'TO', b)

      return {
        P: P,
        op: op,
        a: a,
        b: b,
        p: a !== 0 ? b : ++p,
        bm: bits.join(','),
        D: D.slice(0, 2).join(',')
      }
    } else if (op === 6) { // JUMP FALSE
      const a = bits[0] === 0 ? ops[ops[++p]] : ops[++p]
      const b = bits[1] === 0 ? ops[ops[++p]] : ops[++p]

      if (dbg) console.log(P, OPS[op], a, 'TO', b)

      return {
        P: P,
        op: op,
        a: a,
        b: b,
        p: a === 0 ? b : ++p,
        bm: bits.join(','),
        D: D.slice(0, 2).join(',')
      }
    } else if (op === 7) { // JUMP LESS
      const a = bits[0] === 0 ? ops[ops[++p]] : ops[++p]
      const b = bits[1] === 0 ? ops[ops[++p]] : ops[++p]
      const c = bits[2] === 0 ? ops[ops[++p]] : ops[++p]

      if (dbg) console.log(P, OPS[op], a, '<', b, 'TO', c)

      return {
        P: P,
        op: op,
        a: a,
        b: b,
        c: c,
        p: a < b ? c : ++p,
        bm: bits.join(','),
        D: D.join(',')
      }
    } else if (op === 8) { // JUMP EQUALS
      const a = bits[0] === 0 ? ops[ops[++p]] : ops[++p]
      const b = bits[1] === 0 ? ops[ops[++p]] : ops[++p]
      const c = bits[2] === 0 ? ops[ops[++p]] : ops[++p]

      if (dbg) console.log(P, OPS[op], a, '=', b, 'TO', c)

      return {
        P: P,
        op: op,
        a: a,
        b: b,
        c: c,
        p: a === b ? c : ++p,
        bm: bits.join(','),
        D: D.join(',')
      }
    } else {
      console.log('ERRROR', opmp)
      return { op: op, D: D, p: p, error: true }
    }

  }
}


function parse (p, ops) {
  // // console.log('p() ops[6]:', ops[6])
  const newops = ops.slice()
  const operation = parseOp(p, newops)
  // console.log('operation', operation.D, newops[224])
  console.log('operation', operation, newops[224])


  if (operation.error !== undefined) {
    return { p: -1 }
  } else if (operation.dst !== undefined) { // UPDATE
    newops[operation.dst] = operation.val
  } else if (operation.op === 4) { // OUTPUT
    console.log('* OUT: ', operation.val, operation)
  } else if (operation.op >= 5 && operation.op <=8) { // JUMP
    console.log('* JUMP:', operation.p, operation)
  }

  return {
    p: operation.p,
    ops: newops
  }
}

fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    throw err
  }
  let d = data.split(',').map((n) => parseInt(n)).filter((n) => !isNaN(n))

  let p = 0
  let i = 0
  while (p >= 0) {
    // console.log('ops[6]:', d[6])
    const r = parse(p, d)

    p = r.p
    d = r.ops
    i++
    console.log('')
  }
  console.log(`END AFTER ${i} iteration`)
})
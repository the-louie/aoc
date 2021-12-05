const fs = require('fs')
const c = require('../common')

const testData = c.bufToStrArr(fs.readFileSync('./testData.txt'))
const realData = c.bufToStrArr(fs.readFileSync('./input.txt'))

const xpand = (x1, y1, x2, y2, diag = false) => {
  if (y1 === y2) { // horizontal line
    return c.createSeqArr(Math.max(x1, x2) - Math.min(x1, x2) + 1, Math.min(x1, x2)).map(x => [x, y1])
  } else if (x1 === x2) { // vertical line
    return c.createSeqArr(Math.max(y1, y2) - Math.min(y1, y2) + 1, Math.min(y1, y2)).map(y => [x1, y])
  } else if (diag) { // 45 degree diagonal line (assumed)
    return c.createArr(Math.abs(x1 - x2) + 1).map((_v, n) => [x1 - Math.sign(x1 - x2) * n, y1 - Math.sign(y1 - y2) * n])
  }
}

const formatInput = (data, diag) => data.map((item) => {
  const [start, end] = item.split(' -> ')
  const [x1, y1] = start.split(',').map(c => Number(c))
  const [x2, y2] = end.split(',').map(c => Number(c))
  return xpand(x1, y1, x2, y2, diag)
}).filter(v => v !== undefined)

const countOverlaps = (data) => Object.values(data.reduce((acc, curr) => acc.concat(curr), []).reduce((acc, curr, i) => {
  acc[`${curr[0]},${curr[1]}`] = (acc[`${curr[0]},${curr[1]}`] ?? 0) + 1
  return acc
}, {})).reduce((acc, curr) => curr > 1 ? ++acc : acc, 0)

// console.log(countOverlaps(formatInput(testData)))
console.log('one', countOverlaps(formatInput(realData)))
// console.log(countOverlaps(formatInput(testData, true)))
console.log('two', countOverlaps(formatInput(realData, true)))

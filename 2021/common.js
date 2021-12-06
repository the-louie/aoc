const bufToArr = (buf) => buf.toString().replace(/\r/g, '').split('\n').filter(r => r !== '')
const bufToIntArr = (buf) => bufToArr(buf).map(i => Number(i))
const bufToStrArr = (buf) => bufToArr(buf).map(i => String(i))

const createArr = (l, v = 0) => Array.apply(null, Array(l)).map(() => v)
const createSeqArr = (l, s = 0) => Array.apply(null, Array(l)).map((_n, i) => i + s)

const arrSum = (arr) => arr.reduce((acc, curr) => acc + curr, 0)

module.exports = {
  bufToArr,
  bufToIntArr,
  bufToStrArr,
  createArr,
  createSeqArr,
  arrSum
}

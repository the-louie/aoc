const bufToArr = (buf) => buf.toString().replace(/\r/g, '').split('\n').filter(r => r !== '')
const bufToIntArr = (buf) => bufToArr(buf).map(i => Number(i))
const bufToStrArr = (buf) => bufToArr(buf).map(i => String(i))

const createArr = (l, v) => Array.apply(null, Array(l)).map(() => v)
const createSeqArr = (l) => Array.apply(null, Array(l)).map((_n, i) => i)

module.exports = {
  bufToArr,
  bufToIntArr,
  bufToStrArr,
  createArr,
  createSeqArr
}

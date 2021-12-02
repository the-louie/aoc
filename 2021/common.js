const bufToArr = (buf) => buf.toString().replace(/\r/g, '').split('\n').filter(r => r !== '')
const bufToIntArr = (buf) => bufToArr(buf).map(i => Number(i))
const bufToStrArr = (buf) => bufToArr(buf).map(i => String(i))

module.exports = {
  bufToArr,
  bufToIntArr,
  bufToStrArr
}

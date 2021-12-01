const bufToIntArr = (buf) => buf.toString().replace(/\r/g, '').split('\n').filter(r => r !== '').map(i => Number(i))

module.exports = {
  bufToIntArr
}

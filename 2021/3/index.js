const fs = require('fs')
const c = require('../common')

const testData = c.bufToStrArr(fs.readFileSync('./testData.txt'))
const realData = c.bufToStrArr(fs.readFileSync('./input.txt'))

const getCommon = (data) => data.map((row) => row.split('').map((d) => Number(d))).reduce((acc, curr) => acc.map((d, i) => (curr[i] += d)), Array.apply(null, Array(data[0].length)).map(() => 0)).map((d) => Math.round(d / data.length))
// const inv = (data) => data.split('').map(c => c === '0' ? '1' : '0')

const one = (data) => {
  const gamma = getCommon(data).join('')
  const epsilon = parseInt(gamma, 2) ^ parseInt(Array.apply(null, Array(gamma.length)).map(() => 1).join(''), 2)
  return parseInt(gamma, 2) * epsilon
}

const twoCheck = (data, checkFn) => {
  const dataBytes = data.map(d => parseInt(d, 2))
  for (let checkBitCounter = data[0].length; checkBitCounter >= 0; checkBitCounter--) {
    const localCommon = getCommon(dataBytes.filter(db => db !== undefined).map(db => db.toString(2).padStart(data[0].length, '0'))).join('')
    const checkCommonBitValue = (parseInt(localCommon, 2) & (1 << checkBitCounter - 1)) > 0
    for (const byteI in dataBytes) {
      const checkDataBitValue = (dataBytes[byteI] & (1 << checkBitCounter - 1)) > 0
      if (dataBytes[byteI] && checkFn(checkCommonBitValue, checkDataBitValue)) {
        dataBytes[byteI] = undefined
      }
      if (dataBytes.filter(d => d !== undefined).length === 1) {
        break
      }
    }
  }
  return dataBytes.filter(db => db !== undefined)[0]
}
const two2 = (data) => {
  const o2 = twoCheck(data, (a, b) => a === b)
  const co2 = twoCheck(data, (a, b) => a !== b)
  return (o2 * co2)
}

const two = (data) => {
  const databytesO2 = data.map(d => d.split('').map(s => Number(s)))
  let checkBitO2 = 0
  while (databytesO2.length > 1 && checkBitO2 <= databytesO2.length) {
    const localCommon = getCommon(databytesO2.filter(db => db !== undefined).map(db => db.join('')))
    for (const byteI in databytesO2) {
      if (databytesO2.filter(d => d !== undefined).length === 1) {
        break
      }
      if (databytesO2[byteI] && databytesO2[byteI][checkBitO2] != localCommon[checkBitO2]) {
        databytesO2[byteI] = undefined
      }
    }
    checkBitO2++
  }
  const o2 = databytesO2.filter(db => db !== undefined)[0]

  const databytesCO2 = data.map(d => d.split('').map(s => Number(s)))
  let checkBitCO2 = 0
  while (databytesCO2.length > 1 && checkBitCO2 <= databytesCO2.length) {
    const localCommon = getCommon(databytesCO2.filter(db => db !== undefined).map(db => db.join('')))
    for (const byteI in databytesCO2) {
      if (databytesCO2.filter(d => d !== undefined).length === 1) {
        break
      }
      if (databytesCO2[byteI] && databytesCO2[byteI][checkBitCO2] == localCommon[checkBitCO2]) {
        databytesCO2[byteI] = undefined
      }
    }
    checkBitCO2++
  }
  const co2 = parseInt(databytesCO2.filter(db => db !== undefined)[0].join(''), 2)
  return (parseInt(o2.join(''), 2) * co2)
}

// console.log('one test', one(testData))
// console.log('one real', one(realData))
// console.log('two test', two(testData))
// console.log('two real', two(realData))
const t1 = two(testData)
const t2 = two2(testData)
console.log('two two', t1 === t2, t1, t2)
const ta1 = two(realData)
const ta2 = two2(realData)
console.log('two two', ta1 === ta2, ta1, ta2)

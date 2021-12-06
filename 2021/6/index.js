const fs = require('fs')
const c = require('../common')

const testData = c.bufToArr(fs.readFileSync('./testData.txt'))[0].split(',').map(Number)
const realData = c.bufToArr(fs.readFileSync('./input.txt'))[0].split(',').map(Number)

const one = (data, days) => {
  const fishCount = data.reduce((acc, curr) => { acc[curr] = (acc[curr] ?? 0) + 1; return acc }, c.createArr(9, 0))
  for (let day = 0; day < days; day++) {
    const zeroCount = fishCount.shift()
    fishCount[6] = fishCount[6] + zeroCount
    fishCount.push(zeroCount)
  }
  return c.arrSum(fishCount)
}

console.log('one test', one(testData, 80), 5934)
console.log('one real', one(realData, 80), 350917)
console.log('two test', one(testData, 256), 26984457539)
console.log('two real', one(realData, 256), 1592918715629)

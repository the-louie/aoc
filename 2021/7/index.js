const fs = require('fs')
const c = require('../common')

const testData = c.bufToArr(fs.readFileSync('./testData.txt'))[0].split(',').map(Number)
const realData = c.bufToArr(fs.readFileSync('./input.txt'))[0].split(',').map(Number)

const one = (data) => {
  const median = data.slice().sort((a, b) => a - b)[Math.floor(data.length / 2)]
  return data.reduce((acc, curr) => acc + Math.abs(curr - median), 0)
}

const two = (data) => {
  const mean = Math.floor(data.reduce((acc, curr) => acc + curr, 0) / data.length)
  return data.reduce((acc, curr) => acc + Math.ceil((Math.pow(Math.abs(curr - mean), 2) + Math.abs(curr - mean)) / 2), 0)
}
console.log('one real', one(testData), 37)
console.log('one real', one(realData), 355989)
console.log('two real', two(testData), 168) // (╯°□°)╯︵ ┻━┻
console.log('two real', two(realData), 102245489)

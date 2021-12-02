const fs = require('fs')
const c = require('../common')

const testData = c.bufToStrArr(fs.readFileSync('./testData.txt'))
const realData = c.bufToStrArr(fs.readFileSync('./input.txt'))

const one = (data) => data.reduce((acc, curr) => {
  const direction = curr.split(' ')[0]
  const amount = Number(curr.split(' ')[1])

  switch (direction) {
    case 'up':
      acc.v = acc.v - amount
      break
    case 'down':
      acc.v = acc.v + amount
      break
    case 'forward':
      acc.h = acc.h + amount
      break

    default:
      break
  }
  acc.r = acc.h * acc.v

  return acc
}, { h: 0, v: 0, r: 0 }).r

const two = (data) => data.reduce((acc, curr) => {
  const direction = curr.split(' ')[0]
  const amount = Number(curr.split(' ')[1])

  switch (direction) {
    case 'up':
      acc.a = acc.a - amount
      break
    case 'down':
      acc.a = acc.a + amount
      break
    case 'forward':
      acc.h = acc.h + amount
      acc.v = acc.v + (amount * acc.a)
      break

    default:
      break
  }
  acc.r = acc.h * acc.v

  return acc
}, { h: 0, v: 0, a: 0, r: 0 }).r

console.log('one test', one(testData))
console.log('one real', one(realData))
console.log('two test', two(testData))
console.log('two real', two(realData))

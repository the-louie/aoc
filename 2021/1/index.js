const fs = require('fs')
const c = require('../common')

const testData = c.bufToIntArr(fs.readFileSync('./testData.txt'))
const realData = c.bufToIntArr(fs.readFileSync('./input.txt'))

const one = (data) => data.reduce((acc, curr, i, all) => (i > 0 && curr > all[i - 1]) ? ++acc : acc, 0)

console.log('one test', one(testData))
console.log('one real', one(realData))

const two = (data) => data.reduce((acc, _curr, i, all) => all.slice(i, i + 3).length !== 3 ? acc : acc.concat([all.slice(i, i + 3).reduce((acc, curr) => acc + curr, 0)]), [])

console.log('two test', one(two(testData)))
console.log('two real', one(two(realData)))

const fs = require('fs')
const testinput = `1721
979
366
299
675
1456`

const testdata = testinput.split('\n').filter(f => f != '').map(d => parseInt(d))

const part1 = (data) => {
    for (let i = 0; i<data.length-1; i++) {
        for (let j=i+1; j<data.length; j++) {
            if (data[i] + data[j] === 2020) {
                return data[i] * data[j]
            }
        }
    }
    return '*ERR*'
}

const part2 = (data) => {
    for (let i = 0; i<data.length-2; i++) {
        for (let j=i+1; j<data.length-1; j++) {
            for (let k=j+1; k<data.length; k++) {
                if (data[i] + data[j] + data[k] === 2020) {
                    return data[i] * data[j] * data[k]
                }
            }
        }
    }
    return '*ERR*'
}

const data = fs.readFileSync('./input.txt').toString().split('\n').filter(f => f != '').map(d => parseInt(d))

const r1 = part1(data)
console.log('part1', r1)

const r2 = part2(data)
console.log('part2', r2)

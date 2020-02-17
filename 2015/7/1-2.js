const fs = require('fs')

// vi kommer nog behöva sortera instruktionerna
// så att ett register har ett värde innan det används.
const sort = (rows) => {

}


let reg = {}

const dec2bin = (dec) => (dec >>> 0).toString(2).padStart(16, '0').substr(-16)
const NOT = (B) => B.split('').map((b) => b == '0' ? '1' : '0').join('')
const bin2dec = (B) => parseInt(B, 2)

const ALU = {
    'AND': (a, b) => a & b,
    'OR': (a, b) => a | b,
    'NOT': (a) => bin2dec(NOT(dec2bin(a))),
    'LSHIFT': (a, b) => a << b,
    'RSHIFT': (a, b) => a >> b,
}

const getVal = (v) => {
    if (!isNaN(parseInt(v))) {
        return parseInt(v)
    } else {
        return reg[v]
    }
}

const parser = [
    () => {}, // placeholder
    (act, dst) => { // a -> dst
        const a = getVal(act[0])
        if (a !== undefined) {
            reg[dst] = a
            return true
        } else {
            // console.log(act, 'missing value for a')
            return false
        }
    },
    (act, dst) => { // INS a -> dst
        const I = act[0]
        const a = getVal(act[1])
        if (a !== undefined) {
            reg[dst] = ALU[I](a)
            return true
        } else {
            // console.log(act, 'missing value for a')
            return false
        }
    },
    (act, dst) => { // a INS b -> dst
        const I = act[1]
        const a = getVal(act[0])
        const b = getVal(act[2])
        if (a !== undefined && b !== undefined) {
            reg[dst] = ALU[I](a, b)
            return true
        } else {
            // console.log(act, 'missing value for a or b')
            return false
        }
    },
]

const run = (rows, b) => {
    let allOK = true
    rows.forEach(cmd => {
        const [leftside, dst] = cmd.split(' -> ')
        const act = leftside.split(' ')
        allOK = parser[act.length](act, dst) && allOK
        if (b !== undefined && dst === 'b') { reg['b'] = b }
    });
    return allOK
}

fs.readFile('./input.txt', 'utf8', (err, input) => {
    const rows = input.split('\n').filter((r) => r !== '')

    // part 1
    let i = 0
    while (!run(rows)) { i++ }
    console.log('1', i, 'reg a:', reg['a'])

    // reset for part 2
    const tmp = reg['a']
    reg = {}
    i = 0
    while (!run(rows, tmp)) {  i++ }
    console.log('2', i, 'reg a:', reg['a'])

})

// testrun
// run([
//     '123 -> x',
//     '456 -> y',
//     'x AND y -> d',
//     'x OR y -> e',
//     'x LSHIFT 2 -> f',
//     'y RSHIFT 2 -> g',
//     'NOT x -> h',
//     'NOT y -> i',
// ])
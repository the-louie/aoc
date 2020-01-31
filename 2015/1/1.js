const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, input) => {
    const endfloor = input
        .split("")
        .reduce((acc, curr) => (acc + (curr === '(' ? 1 : -1)), 0)
    console.log(endfloor)

    const basementSteps = input
        .split("")
        .reduce((acc, curr, i) => {if (acc === -1) { console.log('o', i); } return (acc + (curr === '(' ? 1 : -1))}, 0)
    console.log(basementSteps)
})

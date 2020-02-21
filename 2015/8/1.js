const fs = require('fs')

const strip = (str) => {
    let s = str.replace(/^"/g,'').replace(/"$/g, '').replace(/\\\\/g, '\\').replace(/\\\"/g, '"').replace(/\\x[a-f0-9]{2}/g, 'X')
    return s
}

const calc = (rows) => {
    let size = 0
    rows.forEach((row) => {
        const srow = strip(row)
        size += row.length - srow.length
    })
    return size
}

fs.readFile('./input.txt', 'utf8', (err, input) => {
    const rows = input.split('\n').filter((r) => r !== '')
    const size = calc(rows)
    console.log(size)
})

const fs = require('fs')

const destrip = (str) => {
    let s = '"' + str.replace(/\\/g, '\\\\').replace(/"/g,'\\"') + '"'
    return s
}

const calc = (rows) => {
    let size = 0
    rows.forEach((row) => {
        const srow = destrip(row)
        size += srow.length - row.length
    })
    return size
}

fs.readFile('./input.txt', 'utf8', (err, input) => {
    const rows = input.split('\n').filter((r) => r !== '')
    const size = calc(rows)
    console.log(size)
})

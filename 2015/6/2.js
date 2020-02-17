const fs = require('fs')
const W = 1000
const H = 1000
let lights = Array(W*H)
for (let l=0; l<lights.length; l++) { lights[l] = 0 }

const parse = (str) => {
    // turn off 446,432 through 458,648
    // toggle 322,558 through 977,958
    console.log(str)
    const arr = str.split(' ')
    let offset
    let cmd
    if (arr[0] === 'turn') {
        cmd = arr[1]
        offset=1
    } else {
        offset=0
        cmd = arr[0]
    }
    const start_xy = arr[1+offset].split(',').map((i) => parseInt(i))
    const end_xy = arr[3+offset].split(',').map((i) => parseInt(i))
    console.log(cmd, start_xy, end_xy)
    // console.log(cmd, start_xy, end_xy)
    for (let x = start_xy[0]; x<=end_xy[0]; x++) {
        for (let y = start_xy[1]; y<=end_xy[1]; y++) {
            if (cmd === 'on') {
                lights[x + y*W] += 1
            } else if (cmd === 'off') {
                lights[x + y*W] = Math.max(0, lights[x + y*W] - 1)
            } else {
                lights[x + y*W] += 2
            }
            // console.log(`${x},${y} -> ${cmd}`)
        }
    }
}



fs.readFile('./input.txt', 'utf8', (err, input) => {
    const rows = input.split('\n').filter((r) => r !== '')
    // parse(rows[0])
    rows.forEach(parse)
    // const on_count = lights.reduce((acc, curr) => curr ? acc + 1 : acc, 0)
    const brightness = lights.reduce((acc, curr) => acc+curr, 0)

    console.log(brightness)
})
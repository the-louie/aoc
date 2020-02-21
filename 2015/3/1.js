const fs = require('fs')
fs.readFile('./input.txt', 'utf8', (err, input) => {
    let poslist = ['0,0']
    let currpos = { x: 0, y: 0 }
    let count = 1

    const res = input.split('').filter((c) => c!=='').forEach((e, i) => {
        switch (e) {
            case '<':
                currpos.x -= 1
                break;
            case '>':
                currpos.x += 1
                break;
            case '^':
                currpos.y -= 1
                break;
            case 'v':
                currpos.y += 1
                break;

            default:
                break;
        }
        posstr = `${currpos.x},${currpos.y}`
        if (poslist.indexOf(posstr) < 0) {
            count++
            poslist.push(posstr)
        }

    })
    console.log('result', count)
})


// 9325 - för högt
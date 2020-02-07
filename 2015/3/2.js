const fs = require('fs')
fs.readFile('./input.txt', 'utf8', (err, input) => {
    let poslist = ['0,0']
    let currpos = [{ x: 0, y: 0 }, { x: 0, y: 0 }]
    let count = 1

    const res = input.split('').filter((c) => c!=='').forEach((e, i) => {
        switch (e) {
            case '<':
                currpos[i % 2].x -= 1
                break;
            case '>':
                currpos[i % 2].x += 1
                break;        
            case '^':
                currpos[i % 2].y -= 1
                break;
            case 'v':
                currpos[i % 2].y += 1
                break;        
    
            default:
                break;
        }
        posstr = `${currpos[i % 2].x},${currpos[i % 2].y}`
        if (poslist.indexOf(posstr) < 0) {
            count++
            poslist.push(posstr)
        }

    })
    console.log('result', count)
})


// 9325 - för högt
const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, input) => {
    const rows = input.split('\n').filter((r) => r !== '')
    const all = rows.reduce((acc, curr) => {
        const [l,w,h] = curr.split('x')
        const e = Math.min(l*w, w*h, h*l)
        const r = (2*l*w) + (2*w*h) + (2*h*l) + e
        return acc.concat([r])
    }, [])

    const result1 = all.reduce((acc, curr) => (acc + curr), 0)
    console.log('1', result1)

    const all2 = rows.reduce((acc, curr, i) => {
        const [l,w,h] = curr.split('x').map((i) => parseInt(i))
        const [x, y] = [l,w,h].slice(0).sort((a,b)=>a-b).slice(0,2)
        const r = (l*w*h) + ((2*x) + (2*y))
        return acc.concat([r])
    }, [])
    const result2 = all2.reduce((acc, curr) => (acc + curr), 0)
    console.log('2', result2)
})

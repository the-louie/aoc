const fs = require('fs')

const TESTINPUT = `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`.split('\n').filter((r) => r !== '')

const calcDist = (input) => input.reduce((acc, curr) => ({...acc, [`${curr.split(' ')[0]}-${curr.split(' ')[2]}`]: parseInt(curr.split(' ')[4])}), {})


const getAllPlaces = (input) => Object.keys(input.reduce((acc, curr) => ({...acc, [curr.split(' ')[0]]: true, [curr.split(' ')[2]]: true}), {}))

const genRoutes = (input) => {
    const permute = (res, item, key, arr) => res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1)).reduce(permute, []).map(perm => [item].concat(perm)) || item)
    return input.reduce(permute, [])
}


const part1_2 = (input) => {
    console.log(input)

    const allDists = calcDist(input)
    const allPlaces = getAllPlaces(input)
    const allRoutes = genRoutes(allPlaces)

    console.log('allDists', allDists)
    console.log('allPlaces', allPlaces)
    console.log('allRoutes', allRoutes)

    const distances = allRoutes.reduce((acc, curr) => {
        const legs = curr.reduce((acc, curr, i, all) => {
            return [...acc, all[i+1] !== undefined ? `${curr}-${all[i+1]}` : undefined]
        }, []).filter(f => f !== undefined)
        const distances = legs.reduce((acc, curr) => {
            return acc + (allDists[curr] || allDists[curr.split('-').reverse().join('-')] || NaN)
        }, 0)
        console.log('legs', legs, distances)
        return [Math.max(distances, acc[0]), Math.min(distances, acc[1])]
    }, [0, Number.MAX_SAFE_INTEGER]);

    console.log(distances)
}

part1_2(TESTINPUT)
fs.readFile('./input.txt', 'utf8', (err, input) => {
    const rows = input.split('\n').filter((r) => r !== '')
    part1_2(rows)
})
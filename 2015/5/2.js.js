const fs = require('fs')

const VOWELS = 'aeiou'
const BADSTRS = ['ab', 'cd', 'pq', 'xy']

const isNice1 = (str) => {
    const arr = str.split('')
    let vowels = 0
    let dupes = 0
    let badstr = 0

    arr.forEach((c, i) => {
        if (VOWELS.indexOf(c) !== -1) { vowels++ }
        if (i<arr.length) {
            if (arr[i] === arr[i + 1]) { dupes++ }
            if (BADSTRS.indexOf(arr[i] + arr[i+1]) !== -1) { badstr++ }
        }
    })

    if (vowels >= 3 && dupes >= 1 && badstr <= 0) {
        return true
   } else {
       return false
   }
}

const isNice2 = (str) => {
    const arr = str.split('')

    // find a pair
    let double_pair = false
    for (let i=0; i<arr.length; i++) {
        const pair = [arr[i], arr[i+1]]
        for (let j=i+2; j<arr.length; j++) {
            if (arr[j] == pair[0] && arr[j+1] == pair[1]) {
                double_pair=true
            }
            if (double_pair) { break; }
        }
        if (double_pair) { break; }
    }

    let gap_pair = false
    for (let i=0; i<arr.length-1; i++) {
        if (arr[i] === arr[i+2]) {
            gap_pair = true
            break
        }
    }

    return double_pair && gap_pair
}

fs.readFile('./input.txt', 'utf8', (err, input) => {
    const rows = input.split('\n').filter((r) => r !== '')
    const nice1 = rows.reduce((acc, curr) => {
        return isNice1(curr) ? acc + 1 : acc
    }, 0)
    console.log('nice1', nice1)

    const rowst = [
        'qjhvhtzxzqqjkmpb',
        'xxyxx',
        'uurcxstgmygtbstg',
        'ieodomkazucvgmuy'
    ]
    const nice2 = rows.reduce((acc, curr) => {
        return isNice2(curr) ? acc + 1 : acc
    }, 0)
    console.log('nice2', nice2)


})
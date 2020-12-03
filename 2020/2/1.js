const testdata = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`.split('\n').filter(r=>r!='')

const data = require('fs').readFileSync('./input.txt').toString().split('\n').filter(f => f != '')

const parseRule = (str) => {
    const [count, char] = str.split(' ')
    return { char, min: parseInt(count.split('-')[0]), max: parseInt(count.split('-')[1]) }
}

const countChar1 = (chr, str) => {
    return (str.match(new RegExp(chr, 'g')) || []).length
}

const checkLimit = (val, min, max) => {
    return (val >= min && val <= max)
}

const countChar2 = (pos, chr, str) => {
    return 0 + (str[pos[0]] == chr ? 1 : 0) + (str[pos[1]] == chr ? 1 : 0)
}

const part1 = (data) => {
    // console.log(data)
    return data.reduce((acc, curr) => {
        const [ruleStr, passwd] = curr.split(':')
        const rule = parseRule(ruleStr)
        const counts = countChar1(rule.char, passwd)
        return acc + (checkLimit(counts, rule.min, rule.max) ? 1 : 0)
    }, 0)
}
const part2 = (data) => {
    // console.log(data)
    return data.reduce((acc, curr) => {
        const [ruleStr, passwd] = curr.split(':')
        const rule = parseRule(ruleStr)
        const counts = countChar2([rule.min, rule.max], rule.char, passwd)
        console.log(counts, passwd, rule.char, rule.min, rule.max, passwd[rule.min], passwd[rule.max])

        return acc + (counts === 1 ? 1 : 0)
    }, 0)
}

// const r1 = part1(data)
// console.log(r1)
const r2 = part2(data)
console.log(r2)
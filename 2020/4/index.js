// split passports inte an array, individual passports are separated by empty lines.
const parseInput = (str) => str.split(/^\s*\n/gm).map(r => r.replace(/\n/g, ' ').replace(/ $/, ''))

const testData = parseInput(`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`)

const testInvalid = parseInput(`eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`)

const testValid = parseInput(`pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`)


const data = parseInput(require('fs').readFileSync('./input.txt', 'ascii'))

const reqFields = [
    'byr', // (Birth Year)
    'iyr', // (Issue Year)
    'eyr', // (Expiration Year)
    'hgt', // (Height)
    'hcl', // (Hair Color)
    'ecl', // (Eye Color)
    'pid', // (Passport ID)
]

const part1 = (data) => {
    // Split all field names into an array and check each required
    // field against it.
    return data.reduce((acc, passport) => {
        const fields = passport.split(' ').map(fv => fv.split(':')[0])
        const correct = reqFields.reduce((a, c) => {
            return (fields.indexOf(c) !== -1) && a
        }, true)
        return acc + (correct ? 1 : 0)
    }, 0)
}

//  Generic number test, to save a few lines of code
const valueBetween = (v, min, max) => {
    const n = parseInt(v)
    return (n >= min) && (n <= max)
}

// Validate functions for all fields that are required.
const validate = {
    'byr': v => valueBetween(v, 1920, 2002),
    'iyr': v => valueBetween(v, 2010, 2020),
    'eyr': v => valueBetween(v, 2020, 2030),
    'hgt': v => v.indexOf('cm') !== -1 ? valueBetween(v, 150, 193) : v.indexOf('in') !== -1 ? valueBetween(v, 59, 76) : false,
    'hcl': v => v.match(/^#[0-9a-fA-F]{6}$/),
    'ecl': v => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(v) !== -1,
    'pid': v => v.match(/^[0-9]{9}$/) !== null, 
}

const part2 = (data) => {
    return data.reduce((count, passport) => {
        // Create an object with all names and values.
        const fields = passport.split(' ').reduce((fieldsObj, field) => {
            const [name, value] = field.split(':')
            return {...fieldsObj, [name]: value }
        }, {})

        // Iterate over the required fields and run a validator function
        // on each value.
        const allFieldsValid = Object.keys(validate).reduce((allOk, name) => {
            const fn = validate[name]
            const value = fields[name]
            const valid = value && fn(value) 
            return valid && allOk
        }, true) 

        return count + (allFieldsValid ? 1 : 0)
    }, 0)

}

// Test 1
const rt = part1(testData)
console.log('rt', rt, rt === 2)

// Part 1
const r1 = part1(data)
console.log('r1', r1)

// Test 2 & 3
const rti = part2(testInvalid)
console.log('rti', rti, rti === 0)
const rtv = part2(testValid)
console.log('rtv', rtv, rtv === 4)

// Part 2
const r2 = part2(data)
console.log('r2', r2)

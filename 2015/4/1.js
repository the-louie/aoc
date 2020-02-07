const crypto = require('crypto')
// const input = 'yzbqklnj'
// const input = 'abcdef'

//let hash = crypto.createHash('md5').update('some_string').digest("hex")
const P = parseInt(process.argv[2]) || 1
const I = parseInt(process.argv[3]) || 1
console.log(P,I)
for (let i = I; i <= 1000000000; i += P) {

    if (crypto.createHash('md5').update(`yzbqklnj${i}`).digest("hex").substr(0,6) === '000000') {
        console.log(i, crypto.createHash('md5').update(`yzbqklnj${i}`).digest("hex")); break;
    }
    if ((i-I % 100000 === 0) { 
        console.log(i, crypto.createHash('md5').update(`yzbqklnj${i}`).digest("hex").substr(0,6))

    }
}


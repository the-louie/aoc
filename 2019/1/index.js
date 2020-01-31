const fs = require('fs')



const calc = (input) => {
  return (Math.floor(input / 3) - 2)
}

fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    throw err
  }
  const input = data.split('\n').filter((v) => !isNaN(parseInt(v)))
  // console.log(input)
  let result = input.reduce((acc, curr) => {
    const mf = acc[0] + calc(parseInt(curr))

    let c = mf
    let ff = 0
    while (c > 0) {
      c = calc(c)
      if (c>=0) {
        ff += c
        // console.log('c2', result, c, c2)
      }
    }


    return [mf, ff]
  }, [0, 0])
  console.log(result, result[0] + result[1])

  // let c = result
  // let c = result
  // let c2 = 0
  // while (c > 0) {
  //   let c3 = calc(c)
  //   if (c3>=0) {
  //     c2 += c3
  //     // result += c
  //     console.log('c2', result, c, c2)
  //   }
  //   c=c3
  // }
  // console.log('r', result + c2)
})



// const test = {
//   12: 2,
//   14: 2,
//   1969: 654,
//   100756: 33583
// }
// Object.keys(test).forEach((i) => {
//   console.log(i, test[i], calc(i), (test[i] === calc(i)))
// })

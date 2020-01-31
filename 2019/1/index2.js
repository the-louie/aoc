// försök 2 för del 2

const fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    throw err
  }
  const input = data.split('\n').filter((v) => !isNaN(parseInt(v))).map((v) => parseInt(v))
  let fuel = []

  for (let n = 0; n < input.length; n++) {
    const modulefuel = Math.floor(input[n] / 3) - 2

    let fuelfuel = modulefuel
    let fuelfuelacc = 0

    do {
      fuelfuel = Math.floor(fuelfuel / 3) - 2
      fuelfuelacc += fuelfuel
    } while (fuelfuel > 6)

    fuel.push([input[n], modulefuel, fuelfuelacc])
  }
  const fuelsum = fuel.reduce((acc, curr) => acc + curr[1], 0)
  const fuelfuelsum = fuel.reduce((acc, curr) => acc + curr[1] + curr[2], 0)
  console.log(fuelsum, fuelfuelsum)
})

const min = 146810
const max = 612564

let count = 0
let groupcount = 0
let dupegroups = false
for (let n = min; n <= max; n++) {
  const str = String(n).split('').map((n)=>parseInt(n))
  const sstr = str.slice().sort()
  let dupe = false
  let sorted = true
  let dupecount = {}
  for (let i=0; i < str.length; i++) {
    if (i > 0 && str[i] === str[i - 1]) {
      if (dupecount[str[i]] === undefined) { dupecount[str[i]] = 1 }
      dupecount[str[i]]++

      dupe = true
    }
    if (str[i] !== sstr[i]) {
      sorted = false
      break
    }
  }
  if (Object.keys(dupecount).length > 0) {
    dupegroups = Object.keys(dupecount).reduce((acc, curr) => {
      console.log(curr, dupecount[curr])
      return acc || (dupecount[curr] === 2)
    }, false)

  }
  if (dupe && sorted) {
    count++
    if (dupegroups) { groupcount++ }
    console.log(count, groupcount, str)
  }
}
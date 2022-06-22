const xs = [1, 2, 3, 4, 5]

const average = (xs) => {
  const fred = 1
  let sum = 0
  let nums = 0

  console.log(`\nCalculating sum of [${xs}]`)

  for (let i = 1; i < xs.length; i++) {
    sum += xs[i]
    nums++
  }

  console.log(`sum = ${sum}, nums summed = ${nums}`)

  let average = 0

  if (sum !== 0) {
    average = sum / xs.length
  }

  return average
}

const avg = average(xs)

console.log(`\nxs = ${xs}, average = ${avg}, expected average = 3!\n`)
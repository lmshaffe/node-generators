function* createCounter() {
  yield 1
  yield 2
  const four = yield* create3To4Counter()
  // manually logging 4 to show we can get return values and use it here
  console.log(four)
  yield 5
}

function* create3To4Counter() {
  yield 3
  // could yield 4 but showing that we can return values
  return 4
}

const counter = createCounter()
// ES6 for of loop - pauses and resumes the generator automatically
// and passes back the values the generator yields
for (let i of createCounter()) {
  console.log(i)
}

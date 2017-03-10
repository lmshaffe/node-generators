function* createLogger() {
  console.log('Start')
  yield
  console.log('Second block')
  yield
  console.log('Third block')
  yield
  console.log('End')
}

// generators return an instance
const logger = createLogger()
logger.next()
logger.next()
logger.next()
logger.next()

function* createHello() {
  // generators look synchronous but the yield keyword changes that
    try {
      const name = yield
      console.log(`Hello ${name}`)
    } catch (err) {
      console.log('ERROR', err)
    }
}

const hello = createHello()
hello.next()
// --> There's a pause here so anything that runs here will be asynchronous
hello.throw('Something went wrong')
hello.next('Lee')

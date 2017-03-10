const url =
'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
const fetch = require('node-fetch')
const co = require('co')

// code looks synchronous - no callbacks :)
function* createQuoteFetcher() {
  // we pause when the promise comes in and when the promise comes in we resolve the yield with
  // the result of the promise and pass that back in the generator
  const response = yield fetch(url)
  const quote = yield response.json()
  return `${quote.quoteText} -${quote.quoteAuthor}`
}

const quoteFetcher = createQuoteFetcher()

// next() starts and pauses the first yield and returns fetch(url) which is a promise
quoteFetcher.next().value
  // when the promise resolves(got the data back from fetch), take the response and start the generator again
  // which passes back to the response variable above and that code resumes until next yield
  .then(res => quoteFetcher.next(res).value)
  // response.json is the value and that returns a promise, so we wait for that to resolve
  // when done we take the response and start the generator again which gets saved in the quote variable
  // and that code continues to run all the way through the return
  .then(res => quoteFetcher.next(res).value)
  // the formatted quote is the string value that is returned from value and just log it
  .then(quote => console.log(quote))
  .catch(err => console.log(err))


const coroutine = (gen) => {
  const generator = gen()

  const handle = (result) => {
    if (result.done) return Promise.resolve(result.value)
    // recursively handle result, wait for value and pass it back into the generator.
    // No longer need to specify multiple .then(res => quoteFetcher.next(res).value)
    return Promise.resolve(result.value)
    .then(res => handle(generator.next(res)))
  }

  return handle(generator.next())
}

// const enhancedQuoteFetcher = coroutine(createQuoteFetcher)
// co will
const enhancedQuoteFetcher = co(createQuoteFetcher)
// much cleaner looking
enhancedQuoteFetcher.then(quote => console.log(quote))

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const cors = require('cors');

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const randomError = function (req, res, next) {
  const magicNumber = Math.floor(Math.random() * 1000)

  if(isPrime(magicNumber)) {
    console.log('Generating random error')
    return res.status(500).send("Something went wrong! (Note: this is intentional)")
  }
  next()
}

const randomDelay = function (req, res, next) {
  const magicNumber = Math.floor(Math.random() * 300)

  if(isPrime(magicNumber)) {
    console.log('Generating delay')
    setTimeout(() => next(), 2000)
  } else {
    next()
  }
}

server.use(cors({ origin: true }));
server.options('*', cors());
server.use(randomError)
server.use(randomDelay)

server.use(middlewares)
server.use(router)
server.listen(5000, () => {
  console.log('JSON Server is running')
})
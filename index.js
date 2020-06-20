const http = require('http')

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end('Hello world, text has been change to test nodemon, using nodeon to then we do not need to turn of server')
})

const port = 5000
app.listen(port)
console.log(`Server running on port ${port}`)
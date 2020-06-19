const http = require('http')

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end('<b>Hello World</b>')
})

const port = 5000
app.listen(port)
console.log(`Server running on port ${port}`)
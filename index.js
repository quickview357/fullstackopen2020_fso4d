require('dotenv').config()

//start node server
const express = require('express')
const app = express()
app.use(express.json())
const port = process.env.PORT
app.listen(port, ()=>{
  console.log(`Server running on port ${port}`)
})


//const Note = mongoose.model('Note', noteSchema)
const Note = require('./models/note')

//
//api
//
app.get('/', (req,res)=>{
  res.send('wellcome node web server')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  response.send(id.toString());  
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})



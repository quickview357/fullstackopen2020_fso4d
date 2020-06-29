const express = require('express')
const mongoose = require('mongoose')

//start node server
const app = express()
const port = 5000
app.listen(port, ()=>{
  console.log(`Server running on port ${port}`)
})

//mongo db connect
const url = `mongodb+srv://fullstackopen:quang2000@cluster0-lbo1o.mongodb.net/fullstackopendb?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

//note schema and instance of note
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})
const Note = mongoose.model('Note', noteSchema)

//using id auto of mongo like our id (options)
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


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
  const id = Number(request.params.id)
  response.send(id.toString());  
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  response.send(id.toString());  
})
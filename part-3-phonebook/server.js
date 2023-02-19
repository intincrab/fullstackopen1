const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3001


app.use(express.json())
morgan.token("post", function (req) {
	if (req.method === "POST") {
		return JSON.stringify(req.body)
	} else {
		return " "
	}
})

app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :post"
	)
)

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//response with a json file of person
app.get('/api/persons',(req ,res) => {
    res.json(persons)
})

app.get('/api/persons/:id',(req,res) => {
  //request is stored in id of id
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
    res.json(person)
  }else {
    res.status(404).end()
  }
})

app.get('/info', (req,res) => {
  const currentDate = new Date()
  res.send(`<h3>Phonebook has info for ${persons.length} people </h3>
  <h3> ${currentDate} </h3>`)
})//

app.delete('/api/persons/:id',(req,res) => {
  const id = Number(req.params.id)
  persons= persons.filter(person => person.id != id)

  res.status(204).end()

})

app.post('/api/persons',(req,res) => {
  const body = req.body

  if(!body.name ) {
    return res.status(400).json({ 
      error: 'name is missing' 
    })
  }

  if(!body.number ) {
    return res.status(400).json({ 
      error: 'name is missing' 
    })
  }

  if(persons.some(entry => entry.name === body.name)) {
    return res.status(400).json({
      error:"name must be unique"
    })
  }

  let entry  = {
    id :Math.floor(Math.random() * 100),
    name: body.name,
    number: body.number
  }
  persons.concat(entry)

  res.json(entry)

})
 
//show me that json file on PORT =3001 ---> listen to it 
app.listen(PORT,() => {
    console.log(`Server active on ${PORT}`);
})



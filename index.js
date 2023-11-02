require("dotenv").config()
require("./app")
const express = require("express")
const cors = require("cors")
let morgan = require('morgan')
const Person = require("./models/person")
const middleware = require("./utils/middleware")

const app = express()

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send("<h2>hello frontend</h2>")
})

app.get("/api/persons", async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.json(persons)
  } catch (error) {
    next(error)
  }
})

app.get("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id
  try {
    const person = await Person.findById(id)
    if (!person) { return res.status(404).json({ "error": "person does not exist" }) }
    res.status(200).json(person)
  } catch (error) {
    next(error)
  }
})

app.post("/api/persons", async (req, res, next) => {
  const { name, number } = req.body
  const person = new Person({
    name,
    number
  })
  try {
    await person.save()
    res.status(201).json(person)
  } catch (error) {
    next(error)
  }

})

app.put("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id
  const newInfo = req.body
  try {
    const person = await Person.findByIdAndUpdate(id, newInfo, { new: true, runValidators: true })
    res.json(person)
  } catch (error) {
    next(error)
  }
})

app.delete("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id
  try {
    await Person.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.get("/info", async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.send(`<p>Phonebook has info for ${persons.length} people<br /> ${new Date()}</p>`)
  } catch (error) {
    next(error)
  }
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listening for connection on PORT ${PORT}`)
})
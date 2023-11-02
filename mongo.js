const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("error: add password as argument")
    process.exit(1)
} else if (process.argv.length > 5) {
    console.log("error: too many arguments, name must be enclosed in quotes(\"\") if it contains space")
    process.exit(1)
}

const password = process.argv[2]

// const url = `mongodb+srv://admin:${password}@fso-database.ytlbifi.mongodb.net/phonebook?retryWrites=true&w=majority`
const testURL = "mongodb://0.0.0.0:27017/phonebookApp"


const schema = new mongoose.Schema({
    name: String,
    number: Number
})


const Person = mongoose.model("Person", schema)

if (process.argv.length === 3) {
    getAll().catch(err => console.log(err))
} else {
    const name = process.argv[3]
    const number = process.argv[4]
    main(name, number).catch(err => console.log(err))
}


// add new entry to the database
async function main(name, number) {
    await mongoose.connect(testURL)

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(() => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        setTimeout(() => {
            mongoose.connection.close()
        }, 1000)
    })
}

// return all entries in the database
async function getAll() {
    await mongoose.connect(testURL)

    const people = await Person.find({})
    console.log('phonebook:')
    phonebook.map(person => {
        console.log(`${person.name} ${person.number} `)
    })


    setTimeout(() => {
        mongoose.connection.close()
    }, 1000)
}
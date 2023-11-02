const mongoose = require("mongoose")

const password = process.env.PASSWORD

const url = `mongodb+srv://admin:${password}@fso-database.ytlbifi.mongodb.net/phonebook?retryWrites=true&w=majority`
// const testURL = process.env.TESTURL

mongoose.connect(url).then(()=> {
    console.log("connected successfully. Ready to handle request")
}).catch(err => {
    console.log(err.message)
})

const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    number: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            // Define the regular expression pattern for the phone number format
            const phoneRegex = /^(\d{2,3})-(\d{6,})$/;
    
            // Check if the value matches the regex pattern
            return phoneRegex.test(value);
          },
          message: 'Invalid phone number format. It should be in the format XX-XXXXXXXX or XXX-XXXXXXXX.'
        }
      }
})

schema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

const Person = mongoose.model("Person", schema)

module.exports = Person;
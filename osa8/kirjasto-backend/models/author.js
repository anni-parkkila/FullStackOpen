const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
    },
    born: {
      type: Number,
    },
  },
  {
    virtuals: {
      bookCount: {
        options: {
          ref: 'Book',
          localField: '_id',
          foreignField: 'author',
          count: true,
        },
      },
    },
  }
)

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', schema)

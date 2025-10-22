'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const LabelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '¡El nombre del label es obligatorio!'],
      unique: 'El nombre debe ser único!'
    },
    slug: {
      type: String,
      unique: 'El slug debe ser único!'
    },
    description: {
      type: String
    }
  },
  {
    collection: 'labels'
  }
)

LabelSchema.plugin(timestamps, {
  createdAt: { index: true }
})

LabelSchema.plugin(mongooseBeautifulUniqueValidation)

LabelSchema.index({
  name: 1,
  slug: 1
})

module.exports = mongoose.model('Label', LabelSchema)

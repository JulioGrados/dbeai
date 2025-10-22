'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '¡El nombre de la categoria es obligatorio!']
    },
    slug: {
      type: String,
      required: [true, '¡El slug del nombre de la categoria es obligatorio!'],
      unique: '¡El slug debe ser único!'
    },
    image: {
      type: String
    },
    description: {
      type: String
    }
  },
  {
    collection: 'categories'
  }
)

CategorySchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

CategorySchema.plugin(mongooseBeautifulUniqueValidation)

CategorySchema.index({
  name: 1,
  slug: 1
})

module.exports = mongoose.model('Category', CategorySchema)

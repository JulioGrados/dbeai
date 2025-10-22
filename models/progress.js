'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const ProgressSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Debes agregar un nombre para el progreso.'],
      unique: 'El nombre debe ser único.'
    },
    key: {
      type: String,
      default: 'progress'
    },
    pipes: [
      {
        type: String
      }
    ],
    order: {
      type: Number,
      unique: 'El orden debe ser único.'
    },
    color: {
      type: String
    }
  },
  {
    collection: 'progress'
  }
)

ProgressSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

ProgressSchema.plugin(mongooseBeautifulUniqueValidation)

ProgressSchema.index({
  name: 1,
  order: 1
})

module.exports = mongoose.model('Progress', ProgressSchema)

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')
// Nombres, apellidos, cédula de ciudadanía, correo, celular.
const ConfirmationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: 'Ya existe un usuario'
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    isConfirmation: {
      type: Boolean,
      default: false
    },
    dateCreated: {
      type: Date,
      default: Date.now
    },
    dateConfirmation: {
      type: Date
    }
  },
  {
    collection: 'confirmations'
  }
)

ConfirmationSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

ConfirmationSchema.plugin(mongooseBeautifulUniqueValidation)

ConfirmationSchema.index({
  user: 1,
  course: 1
})

module.exports = mongoose.model('Confirmation', ConfirmationSchema)

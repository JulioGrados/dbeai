'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const ContactSchema = new Schema(
  {
    names: {
      type: String
    },
    email: {
      type: String
    },
    affair: {
      type: String
    },
    message: {
      type: String
    },
    status: {
      type: String,
      default: 'Revisar',
      enum: ['Revisar', 'Contestado', 'Cancelado']
    }
  },
  {
    collection: 'contacts'
  }
)

ContactSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

ContactSchema.index({
  email: 1
})

module.exports = mongoose.model('Contact', ContactSchema)

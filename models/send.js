'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const SendSchema = new Schema(
  {
    assigned: {
      username: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    date: {
      type: Date,
      default: Date.now
    },
    to: {
      type: String,
      required: [true, 'Debes agregar un remitente para realizar el envío.']
    },
    content: {
      type: String,
      required: [true, 'Debes agregar un contenido para realizar el envío.']
    },
    subject: {
      type: String,
      required: [true, 'Debes agregar un subject para realizar el envío.']
    }
  },
  {
    collection: 'sends'
  }
)

SendSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

SendSchema.index({
  assigned: 1,
  date: 1
})

module.exports = mongoose.model('Send', SendSchema)

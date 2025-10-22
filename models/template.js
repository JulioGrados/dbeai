'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const TemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Debes indicar un nombre al template']
    },
    content: {
      type: String
    },
    description: {
      type: String
    },
    author: {
      username: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    type: {
      type: String,
      default: 'Email',
      enum: ['Email', 'WhatsApp']
    },
    area: {
      type: String,
      default: 'sales',
      enum: ['sales', 'accounting']
    },
    from: {
      type: String
    },
    sender: {
      type: String
    },
    preheader: {
      type: String
    },
    variables: [
      {
        name: {
          type: String
        },
        field: {
          type: String
        }
      }
    ]
  },
  {
    collection: 'templates'
  }
)

TemplateSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

TemplateSchema.index({
  name: 1,
  author: 1
})

module.exports = mongoose.model('Template', TemplateSchema)

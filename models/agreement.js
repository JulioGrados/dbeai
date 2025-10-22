'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const AgreementSchema = new Schema(
  {
    institution: {
      type: String,
      required: [true, '¡El nombre de la institución es requerida!']
    },
    slug: {
      type: String,
      required: [true, '¡El slug de la institución es requerida!'],
      unique: '¡El slug debe ser unico!'
    },
    sizeX: {
      type: Number
    },
    sizeY: {
      type: Number
    },
    template: {
      type: String,
      default: 'template 1',
      enum: ['template 1', 'template 2']
    },
    dean: {
      names: {
        type: String
      },
      moodleId: {
        type: Number
      },
      username: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: 'agreements'
  }
)

AgreementSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

AgreementSchema.plugin(mongooseBeautifulUniqueValidation)

AgreementSchema.index({
  institution: 1
})

module.exports = mongoose.model('Agreement', AgreementSchema)

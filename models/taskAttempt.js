'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const TaskAttemptSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now
    },
    score: {
      type: Number
    },
    number: {
      type: Number
    },
    isTaken: {
      type: Boolean,
      default: false
    },
    attempts: [
      {
        number: {
          type: Number
        },
        score: {
          type: Number
        },
        statusSend: {
          type: String,
          default: 'No entregado',
          enum: ['No entregado', 'Entregado', 'Revisado']
        },
        statusRating: {
          type: String,
          default: 'Sin calificar',
          enum: ['Sin calificar', 'Por calificar', 'Calificado']
        },
        comment: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        },
      }
    ],
    statusSend: {
      type: String,
      default: 'No entregado',
      enum: ['No entregado', 'Entregado', 'Revisado']
    },
    statusRating: {
      type: String,
      default: 'Sin calificar',
      enum: ['Sin calificar', 'Por calificar', 'Calificado']
    },
    comment: {
      type: String
    },
    fileSend: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    }
  },
  {
    collection: 'taskattempts'
  }
)

TaskAttemptSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

TaskAttemptSchema.plugin(mongooseBeautifulUniqueValidation)

TaskAttemptSchema.index({
  name: 1,
  number: 1
})

module.exports = mongoose.model('TaskAttempt', TaskAttemptSchema)

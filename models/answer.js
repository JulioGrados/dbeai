'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const AnswerSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    },
    text: {
      type: String
    },
    isCorrect: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'answers'
  }
)

AnswerSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

AnswerSchema.plugin(mongooseBeautifulUniqueValidation)

AnswerSchema.index({
  institution: 1
})

module.exports = mongoose.model('Answer', AnswerSchema)

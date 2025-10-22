'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const QuestionSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
      }
    ],
    points: {
      type: Number
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
    collection: 'questions'
  }
)

QuestionSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

QuestionSchema.plugin(mongooseBeautifulUniqueValidation)

QuestionSchema.index({
  institution: 1
})

module.exports = mongoose.model('Question', QuestionSchema)

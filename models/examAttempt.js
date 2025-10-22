'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const ExamAttemptSchema = new Schema(
  {
    duration: {
      type: Number
    },
    end: {
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
        duration: {
          type: Number
        },
        corrects: {
          type: Number
        },
        faileds: {
          type: Number
        },
        end: {
          type: Date,
          default: Date.now
        },
      }
    ],
    corrects: {
      type: Number
    },
    faileds: {
      type: Number
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
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'examattempts'
  }
)

ExamAttemptSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

ExamAttemptSchema.plugin(mongooseBeautifulUniqueValidation)

ExamAttemptSchema.index({
  name: 1,
  number: 1
})

module.exports = mongoose.model('ExamAttempt', ExamAttemptSchema)

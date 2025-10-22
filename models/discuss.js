'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const DiscussSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Debes agregar un nombre para el examen.']
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Question'
      }
    ],
    number: {
      type: Number
    },
    moodleId: {
      type: Number
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    course: {
      name: {
        type: String
      },
      moodleId: {
        type: Number
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'exams'
  }
)

DiscussSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

DiscussSchema.plugin(mongooseBeautifulUniqueValidation)

DiscussSchema.index({
  name: 1,
  number: 1
})

module.exports = mongoose.model('Discuss', DiscussSchema)

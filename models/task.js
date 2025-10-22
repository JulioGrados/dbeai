'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Debes agregar un nombre para el examen.']
    },
    description: {
      type: String
    },
    number: {
      type: Number
    },
    moodleId: {
      type: Number
    },
    file: {
      type: String
    },
    evaluation: {
      type: Schema.Types.ObjectId,
      ref: 'Exam'
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
  },
  {
    collection: 'tasks'
  }
)

TaskSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

TaskSchema.plugin(mongooseBeautifulUniqueValidation)

TaskSchema.index({
  name: 1,
  number: 1
})

module.exports = mongoose.model('Task', TaskSchema)

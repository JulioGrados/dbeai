'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const ExamVersionSchema = new Schema(
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
    options: [{
        question: String,
        id: String,
        text: String,
        isCorrect: Boolean
    }],
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: true
    },
    versionNumber: {
        type: Number,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    content: {
        type: String
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
    isFavorite: {
        type: Boolean,
        default: false
    },
    edits: [{
      editPrompt: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'examversions'
  }
)

ExamVersionSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

ExamVersionSchema.plugin(mongooseBeautifulUniqueValidation)

ExamVersionSchema.index({
  name: 1
})

module.exports = mongoose.model('ExamVersion', ExamVersionSchema)

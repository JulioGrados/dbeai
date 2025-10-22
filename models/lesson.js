'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const LessonSchema = new Schema(
  {
    name: {
      type: String
    },
    moodleId: {
      type: String,
      unique: 'El codigo debe ser único',
      sparse: true
    },
    order: {
      type: Number
    },
    slug: {
      type: String
    },
    description: {
      type: String
    },
    published: {
      type: Date,
      default: Date.now
    },
    chapters: [
      {
        name: {
          type: String
        },
        order: {
          type: Number
        },
        moodleId: {
          type: Number
        },
        ref: {
          type: Schema.Types.ObjectId,
          ref: 'Chapter'
        }
      }
    ],
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
    evaluation: {
      name: {
        type: String
      },
      number: {
        type: Number
      },
      moodleId: {
        type: Number
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Exam'
      }
    },
    task: {
      name: {
        type: String
      },
      number: {
        type: Number
      },
      moodleId: {
        type: Number
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
      }
    }
  },
  {
    collection: 'lessons'
  }
)

LessonSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})
LessonSchema.plugin(mongooseBeautifulUniqueValidation)

LessonSchema.index({
  email: 1
})

module.exports = mongoose.model('Lesson', LessonSchema)

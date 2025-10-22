'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const ChapterSchema = new Schema(
  {
    name: {
      type: String
    },
    slug: {
      type: String
    },
    description: {
      type: String
    },
    order: {
      type: Number
    },
    video: {
      type: String
    },
    url: {
      type: String
    },
    file: {
      type: String
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    status: {
      type: String,
      default: 'video',
      enun: ['video', 'article', 'file', 'url']
    },
    moodleId: {
      type: Number,
      unique: 'El codigo debe ser único',
      sparse: true
    },
    published: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'chapters'
  }
)

ChapterSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})
ChapterSchema.plugin(mongooseBeautifulUniqueValidation)

ChapterSchema.index({
  email: 1
})

module.exports = mongoose.model('Chapter', ChapterSchema)

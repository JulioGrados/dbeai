'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const ChapterVersionSchema = new Schema(
  {
    name: {
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
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true
    },
    versionNumber: {
        type: Number,
        required: true
    },
    versionNumber: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    wordCount: {
        type: Number,
        default: 0
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
  },
  {
    collection: 'chapterversions'
  }
)

// Calcular palabras automáticamente antes de guardar
ChapterVersionSchema.pre('save', function(next) {
  if (this.content) {
    this.wordCount = this.content.split(/\s+/).length
  }
  next()
})


ChapterVersionSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})
ChapterVersionSchema.plugin(mongooseBeautifulUniqueValidation)

ChapterVersionSchema.index({
  email: 1
})

module.exports = mongoose.model('ChapterVersion', ChapterVersionSchema)

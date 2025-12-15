'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const UploadSchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    filename: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    extractedText: {
        type: String
    },
    theme: {
        type: String // A qué tema pertenece este archivo
    },
  },
  {
    collection: 'uploads'
  }
)

UploadSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

UploadSchema.index({
  user: 1,
  enrol: 1,
  status: 1
})

module.exports = mongoose.model('Upload', UploadSchema)
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const BlogSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String
    },
    subject: {
      type: String
    },
    content: {
      type: String
    },
    description: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    image: {
      type: String
    }
  },
  {
    collection: 'blogs'
  }
)

BlogSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

BlogSchema.index({
  linked: 1,
  title: 1
})

module.exports = mongoose.model('Blog', BlogSchema)

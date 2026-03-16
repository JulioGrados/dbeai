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
      type: String,
      required: [true, 'Debes agregar un título para el blog.']
    },
    subject: {
      type: String
    },
    content: {
      type: String,
      required: [true, 'Debes agregar el contenido del blog.']
    },
    description: {
      type: String,
      required: [true, 'Debes agregar una descripción para el blog.']
    },
    date: {
      type: Date,
      default: Date.now
    },
    image: {
      type: String
    },
    status: {
      type: String,
      enum: ['Borrador', 'Publicado', 'Archivado'],
      default: 'Borrador'
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

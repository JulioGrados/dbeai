'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const TimetableSchema = new Schema(
  {
    linked: {
      username: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    name: {
      type: String
    },
    type: {
      type: String,
      enum: ['Trabajo', 'Fuera'],
      default: 'Trabajo'
    },
    stage: {
      type: String,
      enum: ['Inicio', 'Fin'],
      default: 'Inicio'
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'timetable'
  }
)

TimetableSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

TimetableSchema.index({
  linked: 1,
  name: 1
})

module.exports = mongoose.model('Timetable', TimetableSchema)

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const TimelineSchema = new Schema(
  {
    linked: {
      names: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    assigned: {
      username: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    deal: {
      type: Schema.Types.ObjectId,
      ref: 'Deal'
    },
    name: {
      type: String
    },
    type: {
      type: String,
      enum: ['Cuenta', 'Curso', 'Deal', 'Progreso', 'Etapa', 'Email']
    },
    prev: {
      type: String
    },
    next: {
      type: String
    },
    note: {
      type: String
    },
    extra: {
      type: Schema.Types.Mixed
    },
    kind: {
      type: String,
      default: 'timeline'
    },
    isCompleted: {
      type: Boolean,
      default: true
    }
  },
  {
    collection: 'timeline'
  }
)

TimelineSchema.plugin(timestamps, {
  createdAt: { index: true }
})

TimelineSchema.index({
  lead: 1,
  type: 1,
  deal: 1
})

module.exports = mongoose.model('Timeline', TimelineSchema)

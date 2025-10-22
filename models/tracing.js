'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const TracingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    enrol: {
      type: Schema.Types.ObjectId,
      ref: 'Enrol'
    },
    examLast: [
      {
        name: {type: String},
        score: {type: Number},
        moodleId: {type: Number}
      }
    ],
    examPresent: [
      {
        name: {type: String},
        score: {type: Number},
        moodleId: {type: Number}
      }
    ],
    taskLast: [
      {
        name: {type: String},
        score: {type: Number},
        moodleId: {type: Number}
      }
    ],
    taskPresent: [
      {
        name: {type: String},
        score: {type: Number},
        moodleId: {type: Number}
      }
    ],
    status: {
      type: String,
      enum: ['timingWeek', 'timingMonth', 'endModule'],
    },
    change: [
      {
        type: {
          type: String,
          enum: ['task', 'exam']
        },
        score: { type: Number },
        name: { type: String },
        moodleId: { type: Number }
      }
    ]
  },
  {
    collection: 'tracing'
  }
)

TracingSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

TracingSchema.index({
  user: 1,
  enrol: 1,
  status: 1
})

module.exports = mongoose.model('Tracing', TracingSchema)
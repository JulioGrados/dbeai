'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const CallSchema = new Schema(
  {
    name: {
      type: String
    },
    number: {
      type: Number
    },
    hour: {
      type: String
    },
    duration: {
      type: String
    },
    note: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    cdrid: {
      type: String
    },
    callService: {
      type: String
    },
    direction: {
      type: String,
      enum: ['OUT', 'IN']
    },
    callingname: {
      type: String
    },
    called: {
      type: String
    },
    calling: {
      type: String
    },
    status: {
      type: String
    },
    duration: {
      type: Number
    },
    billseconds: {
      type: Number
    },
    price: {
      type: String
    },
    service: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String
    },
    code: {
      type: String
    },
    record: {
      type: String
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
    linked: {
      names: {
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
    isCompleted: {
      type: Boolean,
      default: false
    },
    kind: {
      type: String,
      default: 'call'
    }
  },
  {
    collection: 'calls'
  }
)

CallSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

CallSchema.index({
  linked: 1,
  deal: 1,
  assigned: 1,
  date: 1
})

module.exports = mongoose.model('Call', CallSchema)

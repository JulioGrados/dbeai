'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const TokenaccSchema = new Schema(
  {
    token: {
      type: String
    },
    refreshToken: {
      type: String
    },
    date: {
      type: String
    }
  },
  {
    collection: 'tokenacc'
  }
)

TokenaccSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

TokenaccSchema.index({
  token: 1
})

module.exports = mongoose.model('Tokenacc', TokenaccSchema)

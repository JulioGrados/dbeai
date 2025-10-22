'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const PaymentSchema = new Schema(
  {
    amount: {
      type: Number
    },
    currency: {
      type: String
    },
    url: {
      type: String
    },
    type: {
      type: String
    }
  },
  {
    collection: 'payments'
  }
)

PaymentSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

PaymentSchema.index({
  type: 1
})

module.exports = mongoose.model('Payment', PaymentSchema)

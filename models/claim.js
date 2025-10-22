'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const ClaimSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    dni: {
      type: String
    },
    address: {
      type: String
    },
    mobile: {
      type: String
    },
    detail: {
      type: String
    },
    order: {
      type: String
    },
    option: {
      type: String,
      default: 'Reclamo',
      enum: ['Reclamo', 'Queja']
    },
    status: {
      type: String,
      default: 'Revisar',
      enum: ['Revisar', 'Contestado', 'Cancelado']
    }
  },
  {
    collection: 'claims'
  }
)

ClaimSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

ClaimSchema.index({
  email: 1
})

module.exports = mongoose.model('Claim', ClaimSchema)

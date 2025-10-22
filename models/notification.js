'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const NotificationSchema = new Schema(
  {
    assigned: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    linked: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    deal: {
      type: Schema.Types.ObjectId,
      ref: 'Deal'
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    viewed: {
      type: Boolean,
      default: false
    },
    typeRef: {
      type: Schema.Types.ObjectId
    },
    type: {
      type: String,
      enum: ['Llamada', 'Correo', 'WhatsApp', 'Venta', 'Voucher', 'Plantilla']
    }
  },
  {
    collection: 'notifications'
  }
)

NotificationSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

NotificationSchema.index({
  asigned: 1,
  viewed: 1,
  type: 1
})

module.exports = mongoose.model('Notification', NotificationSchema)

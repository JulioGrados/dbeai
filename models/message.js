'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const MessageSchema = new Schema(
  {
    assigned: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    linked: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat'
    },
    senderId: {
      type: String
    },
    text: {
      type: String
    },
    wamid: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read']
    },
    channel: {
      type: String,
      default: 'Whatsapp'
    }
  },
  {
    collection: 'messages'
  }
)

MessageSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

MessageSchema.index({
  linked: 1,
  status: 1
})

module.exports = mongoose.model('Message', MessageSchema)

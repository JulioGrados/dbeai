'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const EmailSchema = new Schema(
  {
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
    template: {
      name: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Template'
      }
    },
    date: {
      type: Date,
      default: Date.now
    },
    subject: {
      type: String
    },
    to: {
      type: String
    },
    content: {
      type: String
    },
    from: {
      type: String
    },
    fromname: {
      type: String
    },
    sender: {
      type: String
    },
    preheader: {
      type: String
    },
    deal: {
      type: Schema.Types.ObjectId,
      ref: 'Deal'
    },
    status: {
      type: String,
      default: 'Enviado',
      enum: [
        'Enviado',
        'Entregado',
        'Abierto',
        'Interacción',
        'Spam',
        'Rechazado'
      ]
    },
    attachments: [
      {
        filename: {
          type: String
        },
        url: {
          type: String
        }
      }
    ],
    kind: {
      type: String,
      default: 'email'
    },
    isCompleted: {
      type: Boolean,
      default: true
    }
  },
  {
    collection: 'emails'
  }
)

EmailSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

EmailSchema.index({
  linked: 1,
  'linked.ref': 1,
  template: 1,
  date: 1
})

module.exports = mongoose.model('Email', EmailSchema)

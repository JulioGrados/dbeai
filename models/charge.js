'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const ChargeSchema = new Schema(
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
    payer: {
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
      document: {
        type: String
      }
    },
    authorization: {
      type: String
    },
    statusPayment: {
      type: String,
      enum: ['Por Pagar', 'Pago', 'Cancelada'],
      default: 'Por Pagar'
    },
    isClosed: {
      type: Boolean,
      default: false
    },
    country: {
      type: String
    },
    money: {
      type: String
    },
    symbol: {
      type: String
    },
    amount: {
      type: Number
    },
    paymentMethodId: {
      type: String
    },
    paymentMethodFlow: {
      type: String
    },
    payer: {
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
      document: {
        type: String
      }
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    },
    deal: {
      type: Schema.Types.ObjectId,
      ref: 'Deal'
    },
    reference: {
      type: String,
      unique: 'la referencia debe ser única',
      sparse: true
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    payDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    token: {
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
    waytopay: {
      type: String,
      enum: ['Paycash', 'dLocal'],
      default: 'Paycash'
    },
    kind: {
      type: String,
      default: 'charge'
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isCompleted: {
      type: Boolean,
      default: true
    }
  },
  {
    collection: 'charges'
  }
)

ChargeSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

ChargeSchema.index({
  linked: 1,
  deal: 1,
  assigned: 1
})

module.exports = mongoose.model('Charge', ChargeSchema)
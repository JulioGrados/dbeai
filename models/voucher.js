'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const VoucherSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, 'El código del voucher es requerido.'],
      unique: 'El código del voucher debe ser único.'
    },
    amount: {
      type: Number,
      required: [true, 'El monto del voucher es requerido.']
    },
    residue: {
      type: Number
    },
    isUsed: {
      default: false,
      type: Boolean
    },
    date: {
      default: Date.now,
      type: Date
    },
    currency: {
      type: String,
      default: 'PEN'
    },
    money: {
      symbol: {
        type: String
      },
      code: {
        type: String
      },
      name: {
        type: String
      }
    },
    methodName: {
      type: String,
      default: 'Deposito a cuenta',
      enum: ['Deposito a cuenta', 'Efectivo', 'Visa', 'Cheque', 'Credito']
    },
    operationNumber: {
      type: String,
      required: [true, 'El código de operación es requerido.']
    },
    assigned: {
      username: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario que realiza la operación es requerido.']
      }
    },
    bank: {
      name: {
        type: String,
        required: [true, 'El banco es requerido.']
      },
      code: {
        type: String
      }
    },
    annular: {
      type: Boolean,
      default: false
    },
    validation: {
      type: Boolean,
      default: false
    },
    validator: {
      username: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    paymentOrder: {
      type: String
    },
    note: {
      type: String
    },
    image: {
      type: String,
      required: [true, 'La imagen del voucher es requerida.']
    },
    extras: [
      {
        type: String
      }
    ]
  },
  {
    collection: 'vouchers'
  }
)

VoucherSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

VoucherSchema.plugin(mongooseBeautifulUniqueValidation)

VoucherSchema.index({
  code: 1
})

module.exports = mongoose.model('Voucher', VoucherSchema)

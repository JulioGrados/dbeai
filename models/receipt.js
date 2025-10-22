'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const ReceiptSchema = new Schema(
  {
    code: {
      type: String,
      unique: 'El codigo del recibo debe ser único',
      sparse: true
    },
    serie: {
      type: String
    },
    sequential: {
      type: String
    },
    amount: {
      type: Number
    },
    deal: {
      type: Schema.Types.ObjectId,
      ref: 'Deal'
    },
    sale: {
      type: Schema.Types.ObjectId,
      ref: 'Sale'
    },
    assigned: {
      username: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario asignado es obligatorio.']
      }
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: [true, 'Se necesitan ordenes.']
      }
    ],
    methodName: {
      type: String,
      default: 'Deposito a cuenta',
      enum: ['Deposito a cuenta', 'Efectivo', 'Visa', 'Cheque', 'Credito']
    },
    isBill: {
      type: Boolean,
      default: false
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    names: {
      type: String
    },
    document: {
      type: String,
      default: 'DNI',
      enum: ['DNI', 'Carné de Extranjería', 'Pasaporte', 'Otros', 'AR DNI', 'BO DNI', 'BR DNI', 'CL DNI', 'CO DNI', 'CR DNI', 'CU DNI', 'DO DNI', 'EC DNI', 'MX DNI', 'PA DNI', 'PY DNI', 'UY DNI', 'VE DNI']
    },
    dni: {
      type: String
    },
    email: {
      type: String
    },
    ruc: {
      type: String
    },
    businessName: {
      type: String
    },
    address: {
      type: String
    },
    send: {
      type: String
    },
    date: {
      default: Date.now,
      type: Date
    },
    status: {
      type: String,
      default: 'Pendiente',
      enun: ['Pendiente', 'Procesado', 'Finalizada', 'Anulada']
    },
    file: {
      type: String
    },
    isFacture: {
      type: Boolean,
      default: false
    },
    voucher_id: {
      type: String
    },
    isTicket: {
      type: Boolean,
      default: false
    },
    isCompleted: {
      type: Boolean,
      default: true
    },
    exonerated: {
      type: Boolean,
      default: false
    },
    annular: {
      type: String
    },
    unsubscribe: {
      type: Boolean,
      default: false
    },
    dateEmit: {
      type: Date
    },
    voucher_id_note: {
      type: String
    },
    fileNote: {
      type: String
    },
    isNoteCreditFac: {
      type: Boolean,
      default: false
    },
    isNoteCreditTic: {
      type: Boolean,
      default: false
    },
    noteCode: {
      type: String
    },
    dateNote: {
      type: Date
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
    }
  },
  {
    collection: 'receips'
  }
)

ReceiptSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

ReceiptSchema.plugin(mongooseBeautifulUniqueValidation)

ReceiptSchema.index({
  code: 1,
  operationNumber: 1
})

module.exports = mongoose.model('Receipt', ReceiptSchema)

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const SaleSchema = new Schema(
  {
    user: {
      names: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        required: [true, 'El usuario es requerido'],
        ref: 'User'
      }
    },
    assigned: {
      username: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        required: [true, 'El asesor es requerido'],
        ref: 'User'
      }
    },
    amount: {
      type: Number,
      required: [true, 'Debes agregar un monto a la venta.']
    },
    currency: {
      type: String,
      default: 'pen'
    },
    dateOfSale: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      default: 'Pendiente',
      enum: ['Pendiente', 'Pagando', 'Finalizada', 'Cancelada']
    },
    deal: {
      type: Schema.Types.ObjectId,
      ref: 'Deal'
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order'
      }
    ],
    annular: {
      type: Boolean,
      default: false
    },
    kind: {
      type: String,
      default: 'sale'
    },
    isCompleted: {
      type: Boolean,
      default: true
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
    collection: 'sales'
  }
)

SaleSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

SaleSchema.index({
  user: 1,
  'user.ref': 1,
  dateOfSale: 1
})

module.exports = mongoose.model('Sale', SaleSchema)

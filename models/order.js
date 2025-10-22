'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const OrderSchema = new Schema(
  {
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
    sale: {
      type: Schema.Types.ObjectId,
      ref: 'Sale'
    },
    quotaNumber: {
      type: Number
    },
    amount: {
      type: Number
    },
    chargeDate: {
      type: Date
    },
    paymentDate: {
      type: Date
    },
    status: {
      type: String,
      default: 'Por Pagar',
      enum: ['Por Pagar', 'Pagada', 'Usada', 'Cancelada']
    },
    student: {
      names: {
        type: String
      },
      email: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        required: [true, 'El estudiante es requerido'],
        ref: 'User'
      }
    },
    course: {
      name: {
        type: String
      },
      price: {
        type: Number
      },
      agreement: {
        institution: {
          type: String
        },
        ref: {
          type: Schema.Types.ObjectId,
          ref: 'Agreement'
        }
      },
      ref: {
        type: Schema.Types.ObjectId,
        required: [true, 'El curso es requerido'],
        ref: 'Course'
      }
    },
    receipt: {
      code: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Receipt'
      }
    },
    voucher: {
      code: {
        type: String
      },
      bank: {
        name: {
          type: String
        },
        code: {
          type: String
        }
      },
      operationNumber: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Voucher'
      }
    },
    annular: {
      type: Boolean,
      default: false
    },
    isBill: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    dni: {
      type: Number
    },
    ruc: {
      type: Number
    },
    businessName: {
      type: String
    },
    isCompleted: {
      type: Boolean,
      default: true
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
    }
  },
  {
    collection: 'orders'
  }
)

OrderSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

OrderSchema.index({
  user: 1,
  'user.ref': 1
})

module.exports = mongoose.model('Order', OrderSchema)

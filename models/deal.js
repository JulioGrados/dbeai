'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')

const DealSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    reasign: {
      type: Number,
      default: 0
    },
    origin: {
      type: String,
      enum: ['facebook lead', 'sitio web', 'desconocido', 'facebook chat', 'facebook comment', 'instagram lead', 'linkedin', 'llamada', 'referido', 'whatsApp', 'tiktok', 'otros']
    },
    statusActivity: {
      type: String,
      enum: ['delay', 'todo', 'done', 'now']
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Abierto', 'Ganado', 'Pausado', 'Perdido']
    },
    statusPayment: {
      type: String,
      enum: ['Abierto', 'Sale', 'Pago'],
      default: 'Sale'
    },
    isClosed: {
      type: Boolean,
      default: false
    },
    progress: {
      name: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Progress'
      }
    },
    progressPayment: {
      name: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Progress'
      }
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
    students: [
      {
        student: {
          names: {
            type: String
          },
          firstName: {
            type: String
          },
          lastName: {
            type: String
          },
          email: {
            type: String
          },
          document: {
            type: String
          },
          country: {
            type: String
          },
          dni: {
            type: String
          },
          mobileCode: {
            type: Number
          },
          mobile: {
            type: Number
          },
          ref: {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
        },
        courses: [
          {
            name: {
              type: String
            },
            price: {
              type: Number
            },
            priceOffert: {
              type: Number
            },
            brochure: {
              type: String
            },
            academicHours: {
              type: Number
            },
            teachers: [
              {
                username: {
                  type: String
                },
                names: {
                  type: String
                },
                last_name: {
                  type: String
                },
                description: {
                  type: String
                },
                photo: {
                  type: String
                },
                ref: {
                  type: Schema.Types.ObjectId,
                  ref: 'User'
                }
              }
            ],
            asked: {
              default: Date.now,
              type: Date
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
            modality: {
              type: String,
              enum: ['Físico', 'Virtual'],
              default: 'Físico'
            },
            ref: {
              type: Schema.Types.ObjectId,
              ref: 'Course'
            }
          }
        ]
      }
    ],
    company: {
      name: {
        type: String
      },
      slug: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
      }
    },
    assessor: {
      username: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    sale: {
      type: Schema.Types.ObjectId,
      ref: 'Sale'
    },
    pauseReason: {
      type: String
    },
    pauseNote: {
      type: String
    },
    lostReason: {
      type: String
    },
    lostNote: {
      type: String
    },
    reassignedReason: {
      type: String
    },
    reassignedNote: {
      type: String
    },
    traslateReason: {
      type: String
    },
  },
  {
    collection: 'deals'
  }
)

DealSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

DealSchema.index({
  username: 1,
  'linked.ref': 1,
  status: 1
})

module.exports = mongoose.model('Deal', DealSchema)
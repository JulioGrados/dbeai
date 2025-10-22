'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const TestimonySchema = new Schema(
  {
    linked: {
      ref: {
        type: Schema.Types.ObjectId,
        required: [true, 'El usuario es requerido'],
        ref: 'User'
      }
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    dni: {
      type: Number
    },
    city: {
      type: String
    },
    department: {
      type: String
    },
    photo: {
      type: String
    },
    rate: {
      type: Number
    },
    moodleId: {
      type: Number,
      unique: 'El codigo debe ser único',
      sparse: true
    },
    status: {
      type: String,
      default: 'Revisar',
      enum: ['Revisar', 'No visible', 'Visible']
    },
    comment: {
      type: String
    },
    kind: {
      type: String,
      default: 'Texto',
      enum: ['Video', 'Texto', 'Social']
    },
    video: {
      type: String
    },
    cover: {
      type: String
    },
    iframe: {
      type: String
    },
    photo: {
      type: String
    },
    main: {
      type: Boolean,
      default: false
    },
    course: {
      name: {
        type: String
      },
      slug: {
        type: String
      },
      category: {
        name: {
          type: String
        },
        ref: {
          type: Schema.Types.ObjectId,
          ref: 'Category'
        }
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    }
    // teacher: {
    //   names: {
    //     type: String
    //   },
    //   ref: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    //   }
    // }
  },
  {
    collection: 'testimonies'
  }
)

TestimonySchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

TestimonySchema.plugin(mongooseBeautifulUniqueValidation)

TestimonySchema.index({
  name: 1,
  number: 1
})

module.exports = mongoose.model('Testimony', TestimonySchema)

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const CertificateSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, 'El codigo es requerido'],
      unique: 'El codigo debe ser único',
      sparse: true
    },
    shortCode: {
      type: String,
      unique: 'El codigo debe ser único',
      sparse: true
    },
    moodleId: {
      type: Number
    },
    file1: {
      type: String
    },
    file2: {
      type: String
    },
    linked: {
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    course: {
      shortName: {
        type: String
      },
      academicHours: {
        type: Number
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
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
    score: {
      type: Number
    },
    emission: {
      type: Date
    },
    date: {
      type: Date
    }
  },
  {
    collection: 'certificates'
  }
)

CertificateSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})
CertificateSchema.plugin(mongooseBeautifulUniqueValidation)

CertificateSchema.index({
  email: 1
})

module.exports = mongoose.model('Certificate', CertificateSchema)

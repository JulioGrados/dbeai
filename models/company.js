'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const CompanySchema = new Schema(
  {
    name: {
      type: String
    },
    slug: {
      type: String,
      unique: '¡El slug debe ser único!'
    },
    ruc: {
      type: String,
      unique: 'Ya existe una empresa que tiene el mismo ruc.',
      required: [true, 'Debes agregar un ruc.'],
      sparse: true
    },
    businessName: {
      type: String,
      required: [true, '¡La razón social de la empresa es obligatoria!']
    },
    image: {
      type: String
    },
    send: {
      type: String
    },
    country: {
      type: String
    },
    address: {
      type: String
    },
    description: {
      type: String
    },
    increase: {
      type: Number
    }
  },
  {
    collection: 'companies'
  }
)

CompanySchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

CompanySchema.plugin(mongooseBeautifulUniqueValidation)

CompanySchema.index({
  businessName: 1
})

module.exports = mongoose.model('Company', CompanySchema)

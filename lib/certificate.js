'use strict'

const Certificate = require('../models/certificate')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Certificate.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const certificates = await Certificate.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return certificates
}

const create = async body => {
  try {
    const certificate = await Certificate.create(body)
    return certificate
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (certificateId, body) => {
  const certificate = await Certificate.findOne({ _id: certificateId })

  if (certificate === null) {
    const error = {
      status: 404,
      message: 'El certificado no se encontro'
    }
    throw error
  }

  try {
    const certificateUpdate = await Certificate.findOneAndUpdate(
      { _id: certificateId },
      body,
      {
        new: true
      }
    )
    return certificateUpdate
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)
  let certificate

  try {
    certificate = await Certificate.findOne(query, select).populate(populate)
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }

  if (certificate === null) {
    const error = {
      status: 404,
      menssage: 'El certificado no se encontro'
    }

    throw error
  }

  return certificate
}

const remove = async certificateId => {
  const certificate = Certificate.findOne({ _id: certificateId })

  if (certificate === null) {
    const error = {
      status: 404,
      message: 'El certificado no se encontro'
    }

    throw error
  }

  try {
    const certificateRemove = Certificate.deleteOne({ _id: certificateId })
    return certificateRemove
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

module.exports = {
  count,
  list,
  create,
  update,
  detail,
  remove
}

'use strict'

const Confirmation = require('../models/confirmation')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Confirmation.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const companies = await Confirmation.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return companies
}

const create = async body => {
  try {
    const confirmation = await Confirmation.create(body)
    return confirmation
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (confirmationId, body) => {
  const confirmation = await Confirmation.findOne({ _id: confirmationId })

  if (confirmation === null) {
    const error = {
      status: 404,
      message: 'La confirmación que intentas editar no existe.'
    }
    throw error
  }
  delete body.createdAt
  try {
    const confirmation = await Confirmation.findOneAndUpdate({ _id: confirmationId }, body, {
      new: true
    })

    return confirmation
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)
  console.log('query', query)
  try {
    const confirmation = await Confirmation.findOne(query, select).populate(populate)

    if (confirmation === null) {
      const error = {
        status: 404,
        message: 'La confirmación no existe.'
      }
      throw error
    }

    return confirmation
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async confirmationId => {
  const confirmation = await Confirmation.findOne({ _id: confirmationId })

  if (confirmation === null) {
    const error = {
      status: 404,
      message: 'La confirmación que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Confirmation.deleteOne({ _id: confirmationId })

    return confirmation
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

'use strict'

const Payment = require('../models/payment')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Payment.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const payment = await Payment.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return payment
}

const create = async body => {
  try {
    const payment = await Payment.create(body)

    return payment
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (paymentId, body) => {
  const payment = await Payment.findOne({ _id: paymentId })

  if (payment === null) {
    const error = {
      status: 404,
      message: 'La notificación que intentas editar no existe.'
    }
    throw error
  }

  try {
    const payment = await Payment.findOneAndUpdate({ _id: paymentId }, body, {
      new: true
    })

    return payment
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const payment = await Payment.findOne(query, select).populate(populate)

    if (payment === null) {
      const error = {
        status: 404,
        message: 'La notificación no existe.'
      }
      throw error
    }

    return payment
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async paymentId => {
  const payment = await Payment.findOne({ _id: paymentId })

  if (payment === null) {
    const error = {
      status: 404,
      message: 'La notificación que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Payment.deleteOne({ _id: paymentId })

    return payment
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

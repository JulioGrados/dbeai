'use strict'

const Charge = require('../models/charge')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Charge.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const charge = await Charge.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return charge
}

const create = async body => {
  try {
    const charge = await Charge.create(body)

    return charge
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (chargeId, body) => {
  const charge = await Charge.findOne({ _id: chargeId })

  if (charge === null) {
    const error = {
      status: 404,
      message: 'La notificación que intentas editar no existe.'
    }
    throw error
  }
  delete body.createdAt
  try {
    const charge = await Charge.findOneAndUpdate({ _id: chargeId }, body, {
      new: true
    }).populate([
      'linked.ref'
    ])

    return charge
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const charge = await Charge.findOne(query, select).populate(populate)

    if (charge === null) {
      const error = {
        status: 404,
        message: 'La notificación no existe.'
      }
      throw error
    }

    return charge
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async chargeId => {
  const charge = await Charge.findOne({ _id: chargeId })

  if (charge === null) {
    const error = {
      status: 404,
      message: 'La notificación que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Charge.deleteOne({ _id: chargeId })

    return charge
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

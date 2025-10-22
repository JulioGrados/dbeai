'use strict'

const Send = require('../models/send')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Send.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const sends = await Send.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return sends
}

const create = async body => {
  try {
    const send = await Send.create(body)
    return send
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (sendId, body) => {
  const send = await Send.findOne({ _id: sendId })

  if (send === null) {
    const error = {
      status: 404,
      message: 'El send que intentas editar no existe.'
    }
    throw error
  }

  try {
    const send = await Send.findOneAndUpdate({ _id: sendId }, body, {
      new: true
    })

    return send
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const send = await Send.findOne(query, select).populate(populate)

    if (send === null) {
      const error = {
        status: 404,
        message: 'El send no existe.'
      }
      throw error
    }

    return send
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async sendId => {
  const send = await Send.findOne({ _id: sendId })

  if (send === null) {
    const error = {
      status: 404,
      message: 'El send que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Send.deleteOne({ _id: sendId })

    return send
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

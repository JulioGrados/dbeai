'use strict'

const Call = require('../models/call')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Call.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)
  
  const calls = await Call.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return calls
}

const create = async body => {
  try {
    const call = await Call.create(body)
    return call
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (callId, body) => {
  const call = await Call.findOne({ _id: callId })
  if (call === null) {
    const error = {
      status: 404,
      message: 'La llamada no se encontro'
    }

    throw error
  }

  delete body.createdAt

  try {
    const callUpdate = await Call.findOneAndUpdate({ _id: callId }, body, {
      new: true
    })
    return callUpdate
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const call = Call.findOne(query, select).populate(populate)

    if (call === null) {
      const error = {
        status: 404,
        message: 'La llamada no se encontro'
      }

      throw error
    }

    return call
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async callId => {
  const call = Call.findOne({ _id: callId })

  if (call === null) {
    const error = {
      status: 404,
      message: 'La llamada no se encontro'
    }

    throw error
  }

  try {
    const callRemove = Call.deleteOne({ _id: callId })
    return callRemove
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

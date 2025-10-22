'use strict'

const Tracing = require('../models/tracing')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Tracing.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const tracings = await Tracing.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return tracings
}

const create = async body => {
  try {
    const tracing = await Tracing.create(body)
    return tracing
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (tracingId, body) => {
  const tracing = await Tracing.findOne({ _id: tracingId })

  if (tracing === null) {
    const error = {
      status: 404,
      message: 'El tracing no se encontro'
    }
    throw error
  }

  try {
    const tracingUpdate = await Tracing.findOneAndUpdate(
      { _id: tracingId },
      body,
      { new: true }
    )
    return tracingUpdate
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const tracing = Tracing.findOne(query, select).populate(populate)

    if (tracing === null) {
      const error = {
        status: 404,
        menssage: 'El tracing no se encontro'
      }

      throw error
    }

    return tracing
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

module.exports = {
  count,
  list,
  update,
  create,
  detail
}

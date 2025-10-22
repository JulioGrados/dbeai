'use strict'

const Tokenacc = require('../models/token')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Tokenacc.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const tokenaccs = await Tokenacc.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return tokenaccs
}

const create = async body => {
  try {
    const tokenacc = await Tokenacc.create(body)
    return tokenacc
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (tokenaccId, body) => {
  const tokenacc = await Tokenacc.findOne({ _id: tokenaccId })

  if (tokenacc === null) {
    const error = {
      status: 404,
      message: 'El tokenacc no se encontro'
    }
    throw error
  }

  try {
    const tokenaccUpdate = await Tokenacc.findOneAndUpdate(
      { _id: tokenaccId },
      body,
      { new: true }
    )
    return tokenaccUpdate
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const tokenacc = Tokenacc.findOne(query, select).populate(populate)

    if (tokenacc === null) {
      const error = {
        status: 404,
        menssage: 'El tokenacc no se encontro'
      }

      throw error
    }

    return tokenacc
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

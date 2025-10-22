'use strict'

const Agreement = require('../models/agreement')

const { transformParams } = require('utils').transform

// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Agreement.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const agreements = await Agreement.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return agreements
}

const create = async body => {
  try {
    const agreement = await Agreement.create(body)

    return agreement
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (agreementId, body) => {
  const agreement = await Agreement.findOne({ _id: agreementId })

  if (agreement === null) {
    const error = {
      status: 404,
      message: 'El agreement no se encontro'
    }

    throw error
  }

  try {
    const agreement = await Agreement.findOneAndUpdate(
      { _id: agreementId },
      body,
      { new: true }
    )
    return agreement
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const agreement = await Agreement.findOne(query, select).populate(populate)

    if (agreement === null) {
      const error = {
        status: 404,
        message: 'El agreement no se encontro'
      }

      throw error
    }

    return agreement
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async agreementId => {
  const agreement = await Agreement.findOne({ _id: agreementId })

  if (agreement === null) {
    const error = {
      status: 404,
      message: 'El agreement no se encontro'
    }

    throw error
  }

  try {
    await Agreement.deleteOne({ _id: agreementId })

    return agreement
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

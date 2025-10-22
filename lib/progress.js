'use strict'

const Progress = require('../models/progress')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Progress.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const progress = await Progress.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return progress
}

const create = async body => {
  try {
    const progress = await Progress.create(body)

    return progress
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (progressId, body) => {
  const progress = await Progress.findOne({ _id: progressId })

  if (progress === null) {
    const error = {
      status: 404,
      message: 'El progreso que intentas editar no existe.'
    }
    throw error
  }

  try {
    const progress = await Progress.findOneAndUpdate(
      { _id: progressId },
      body,
      { new: true }
    )

    return progress
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const progress = await Progress.findOne(query, select).populate(populate)

    if (progress === null) {
      const error = {
        status: 404,
        message: 'El progreso no existe.'
      }
      throw error
    }

    return progress
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async progressId => {
  const progress = await Progress.findOne({ _id: progressId })

  if (progress === null) {
    const error = {
      status: 404,
      message: 'El progreso que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Progress.deleteOne({ _id: progressId })

    return progress
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

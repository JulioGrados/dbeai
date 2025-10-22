'use strict'

const Label = require('../models/label')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Label.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const labels = await Label.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return labels
}

const create = async body => {
  try {
    const label = await Label.create(body)

    return label
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (labelId, body) => {
  const label = await Label.findOne({ _id: labelId })

  if (label === null) {
    const error = {
      status: 404,
      message: 'El label que intentas editar no existe.'
    }
    throw error
  }

  try {
    const label = await Label.findOneAndUpdate({ _id: labelId }, body, {
      new: true
    })

    return label
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const label = await Label.findOne(query, select).populate(populate)

    if (label === null) {
      const error = {
        status: 404,
        message: 'El label no existe.'
      }
      throw error
    }

    return label
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async labelId => {
  const label = await Label.findOne({ _id: labelId })

  if (label === null) {
    const error = {
      status: 404,
      message: 'El label que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Label.deleteOne({ _id: labelId })

    return label
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

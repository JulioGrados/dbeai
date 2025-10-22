'use strict'

const Testimony = require('../models/testimony')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Testimony.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const testimonies = await Testimony.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return testimonies
}

const create = async body => {
  try {
    const testimony = await Testimony.create(body)

    return testimony
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (testimonyId, body) => {
  const testimony = await Testimony.findOne({ _id: testimonyId })

  if (testimony === null) {
    const error = {
      status: 404,
      message: 'El usuario que intentas editar no existe.'
    }
    throw error
  }

  delete body.createdAt

  try {
    const testimony = await Testimony.findOneAndUpdate(
      { _id: testimonyId },
      body,
      { new: true }
    )

    return testimony
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const testimony = await Testimony.findOne(query, select).populate(populate)

    if (testimony === null) {
      const error = {
        status: 404,
        message: 'El producto no existe.'
      }
      throw error
    }

    return testimony
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async testimonyId => {
  const testimony = await Testimony.findOne({ _id: testimonyId })

  if (testimony === null) {
    const error = {
      status: 404,
      message: 'El usuario que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Testimony.deleteOne({ _id: testimonyId })

    return testimony
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

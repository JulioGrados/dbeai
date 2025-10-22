'use strict'

const Category = require('../models/category')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Category.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const categories = await Category.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return categories
}

const create = async body => {
  try {
    const category = await Category.create(body)

    return category
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (categoryId, body) => {
  const category = await Category.findOne({ _id: categoryId })

  if (category === null) {
    const error = {
      status: 404,
      message: 'La categoria que intentas editar no existe.'
    }
    throw error
  }

  try {
    const category = await Category.findOneAndUpdate(
      { _id: categoryId },
      body,
      { new: true }
    )

    return category
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const category = await Category.findOne(query, select).populate(populate)

    if (category === null) {
      const error = {
        status: 404,
        message: 'La categoria no existe.'
      }
      throw error
    }

    return category
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async categoryId => {
  const category = await Category.findOne({ _id: categoryId })

  if (category === null) {
    const error = {
      status: 404,
      message: 'La categoria que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Category.deleteOne({ _id: categoryId })

    return category
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

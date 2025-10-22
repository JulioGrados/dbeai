'use strict'

const Task = require('../models/task')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Task.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const tasks = await Task.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return tasks
}

const create = async body => {
  try {
    const task = await Task.create(body)

    return task
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (taskId, body) => {
  const task = await Task.findOne({ _id: taskId })

  if (task === null) {
    const error = {
      status: 404,
      message: 'El task que intentas editar no existe.'
    }
    throw error
  }

  try {
    const task = await Task.findOneAndUpdate({ _id: taskId }, body, {
      new: true
    })

    return task
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const task = await Task.findOne(query, select).populate(populate)

    if (task === null) {
      const error = {
        status: 404,
        message: 'El task no existe.'
      }
      throw error
    }

    return task
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async taskId => {
  const task = await Task.findOne({ _id: taskId })

  if (task === null) {
    const error = {
      status: 404,
      message: 'El task que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Task.deleteOne({ _id: taskId })

    return task
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

'use strict'

const Course = require('../models/course')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Course.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const courses = await Course.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return courses
}

const create = async body => {
  try {
    const course = await Course.create(body)

    return course
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (courseId, body) => {
  const course = await Course.findOne({ _id: courseId })

  if (course === null) {
    const error = {
      status: 404,
      message: 'El curso que intentas editar no existe.'
    }
    throw error
  }

  try {
    const course = await Course.findOneAndUpdate({ _id: courseId }, body, {
      new: true
    })

    return course
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)
  let course
  try {
    course = await Course.findOne(query, select).populate(populate)
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }

  if (course === null) {
    const error = {
      status: 404,
      menssage: 'El curso no se encontro'
    }
    throw error
  }
  return course
}

const remove = async courseId => {
  const course = await Course.findOne({ _id: courseId })

  if (course === null) {
    const error = {
      status: 404,
      message: 'El usuario que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Course.deleteOne({ _id: courseId })

    return course
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

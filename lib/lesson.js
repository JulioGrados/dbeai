'use strict'

const Lesson = require('../models/lesson')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Lesson.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const lessons = await Lesson.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return lessons
}

const create = async body => {
  try {
    const lesson = await Lesson.create(body)
    return lesson
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (lessonId, body) => {
  const lesson = await Lesson.findOne({ _id: lessonId })

  if (lesson === null) {
    const error = {
      status: 404,
      message: 'La lección no se encontro'
    }
    throw error
  }

  try {
    const lessonUpdate = await Lesson.findOneAndUpdate(
      { _id: lessonId },
      body,
      {
        new: true
      }
    )
    return lessonUpdate
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)
  let lesson

  try {
    lesson = await Lesson.findOne(query, select).populate(populate)
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }

  if (lesson === null) {
    const error = {
      status: 404,
      menssage: 'La lección no se encontro'
    }

    throw error
  }

  return lesson
}

const remove = async lessonId => {
  const lesson = Lesson.findOne({ _id: lessonId })

  if (lesson === null) {
    const error = {
      status: 404,
      message: 'La lección no se encontro'
    }

    throw error
  }

  try {
    const lessonRemove = Lesson.deleteOne({ _id: lessonId })
    return lessonRemove
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

'use strict'

const Question = require('../models/question')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Question.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const questions = await Question.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return questions
}

const create = async body => {
  try {
    const question = await Question.create(body)

    return question
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (questionId, body) => {
  const question = await Question.findOne({ _id: questionId })

  if (question === null) {
    const error = {
      status: 404,
      message: 'El question que intentas editar no existe.'
    }
    throw error
  }

  try {
    const question = await Question.findOneAndUpdate({ _id: questionId }, body, {
      new: true
    })

    return question
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const question = await Question.findOne(query, select).populate(populate)

    if (question === null) {
      const error = {
        status: 404,
        message: 'El question no existe.'
      }
      throw error
    }

    return question
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async questionId => {
  const question = await Question.findOne({ _id: questionId })

  if (question === null) {
    const error = {
      status: 404,
      message: 'El question que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Question.deleteOne({ _id: questionId })

    return question
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

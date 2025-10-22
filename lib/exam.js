'use strict'

const Exam = require('../models/exam')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Exam.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const exams = await Exam.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return exams
}

const create = async body => {
  try {
    const exam = await Exam.create(body)

    return exam
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (examId, body) => {
  const exam = await Exam.findOne({ _id: examId })

  if (exam === null) {
    const error = {
      status: 404,
      message: 'El exam que intentas editar no existe.'
    }
    throw error
  }

  try {
    const exam = await Exam.findOneAndUpdate({ _id: examId }, body, {
      new: true
    })

    return exam
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const exam = await Exam.findOne(query, select).populate(populate)

    if (exam === null) {
      const error = {
        status: 404,
        message: 'El exam no existe.'
      }
      throw error
    }

    return exam
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async examId => {
  const exam = await Exam.findOne({ _id: examId })

  if (exam === null) {
    const error = {
      status: 404,
      message: 'El exam que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Exam.deleteOne({ _id: examId })

    return exam
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

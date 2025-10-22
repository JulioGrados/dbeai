'use strict'

const Timetable = require('../models/timetable')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Timetable.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const timetables = await Timetable.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return timetables
}

const create = async body => {
  try {
    const timetable = await Timetable.create(body)
    return timetable
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (timetableId, body) => {
  const timetable = await Timetable.findOne({ _id: timetableId })

  if (timetable === null) {
    const error = {
      status: 404,
      message: 'El timetable no se encontro'
    }
    throw error
  }

  try {
    const timetableUpdate = await Timetable.findOneAndUpdate(
      { _id: timetableId },
      body,
      { new: true }
    )
    return timetableUpdate
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const timetable = Timetable.findOne(query, select).populate(populate)

    if (timetable === null) {
      const error = {
        status: 404,
        menssage: 'El timetable no se encontro'
      }

      throw error
    }

    return timetable
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

module.exports = {
  count,
  list,
  update,
  create,
  detail
}

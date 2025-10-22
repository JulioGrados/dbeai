'use strict'

const Timeline = require('../models/timeline')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Timeline.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const timelines = await Timeline.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return timelines
}

const create = async body => {
  try {
    const timeline = await Timeline.create(body)
    return timeline
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (timelineId, body) => {
  const timeline = await Timeline.findOne({ _id: timelineId })

  if (timeline === null) {
    const error = {
      status: 404,
      message: 'El timeline no se encontro'
    }
    throw error
  }

  try {
    const timelineUpdate = await Timeline.findOneAndUpdate(
      { _id: timelineId },
      body,
      { new: true }
    )
    return timelineUpdate
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const timeline = Timeline.findOne(query, select).populate(populate)

    if (timeline === null) {
      const error = {
        status: 404,
        menssage: 'El timeline no se encontro'
      }

      throw error
    }

    return timeline
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

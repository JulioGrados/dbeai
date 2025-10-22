'use strict'

const Notification = require('../models/notification')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Notification.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const notification = await Notification.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return notification
}

const create = async body => {
  try {
    const notification = await Notification.create(body)

    return notification
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (notificationId, body) => {
  const notification = await Notification.findOne({ _id: notificationId })

  if (notification === null) {
    const error = {
      status: 404,
      message: 'La notificación que intentas editar no existe.'
    }
    throw error
  }

  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId },
      body,
      { new: true }
    )

    return notification
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const notification = await Notification.findOne(query, select).populate(
      populate
    )

    if (notification === null) {
      const error = {
        status: 404,
        message: 'La notificación no existe.'
      }
      throw error
    }

    return notification
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async notificationId => {
  const notification = await Notification.findOne({ _id: notificationId })

  if (notification === null) {
    const error = {
      status: 404,
      message: 'La notificación que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Notification.deleteOne({ _id: notificationId })

    return notification
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

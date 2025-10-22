'use strict'

const Email = require('../models/email')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Email.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const emails = await Email.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return emails
}

const search = async params => {
  
  try {
    const query = params.query.map(JSON.parse)
    console.log('query', query)
    const emails = await Email.aggregate(
        [
          {
            $lookup: {
              from: 'users',
              localField: 'linked.ref',
              foreignField: '_id',
              as: 'linked.ref'
            }
          },
          {
            $unwind: '$linked.ref'
          },
          {
            $match: {
              $and: query
            }
          }
        ]
      )

    return emails
  } catch (errorDB) {
    throw errorDB
  }
}

const create = async body => {
  try {
    const email = await Email.create(body)
    return email
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (emailId, body) => {
  const email = await Email.findOne({ _id: emailId })

  if (email === null) {
    const error = {
      status: 404,
      message: 'El email que intentas editar no existe.'
    }
    throw error
  }

  try {
    const email = await Email.findOneAndUpdate({ _id: emailId }, body, {
      new: true
    })

    return email
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const email = await Email.findOne(query, select).populate(populate)

    if (email === null) {
      const error = {
        status: 404,
        message: 'El email no existe.'
      }
      throw error
    }

    return email
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async emailId => {
  const email = await Email.findOne({ _id: emailId })

  if (email === null) {
    const error = {
      status: 404,
      message: 'El email que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Email.deleteOne({ _id: emailId })

    return email
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

module.exports = {
  count,
  list,
  search,
  create,
  update,
  detail,
  remove
}

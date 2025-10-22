'use strict'

const Claim = require('../models/claim')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Claim.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const claims = await Claim.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return claims
}

const create = async body => {
  try {
    const claim = await Claim.create(body)
    return claim
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (claimId, body) => {
  const claim = await Claim.findOne({ _id: claimId })

  if (claim === null) {
    const error = {
      status: 404,
      message: 'El reclamo no se encontro'
    }
    throw error
  }

  try {
    const claimUpdate = await Claim.findOneAndUpdate(
      { _id: claimId },
      body,
      {
        new: true
      }
    )
    return claimUpdate
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const claim = Claim.findOne(query, select).populate(populate)

    if (claim === null) {
      const error = {
        status: 404,
        menssage: 'El reclamo no se encontro'
      }

      throw error
    }

    return claim
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async claimId => {
  const claim = Claim.findOne({ _id: claimId })

  if (claim === null) {
    const error = {
      status: 404,
      message: 'El reclamo no se encontro'
    }

    throw error
  }

  try {
    const claimRemove = Claim.deleteOne({ _id: claimId })
    return claimRemove
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

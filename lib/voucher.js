'use strict'

const Voucher = require('../models/voucher')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Voucher.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const vouchers = await Voucher.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return vouchers
}

const create = async body => {
  try {
    const voucher = await Voucher.create(body)
    return voucher
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (voucherId, body) => {
  const voucher = await Voucher.findOne({ _id: voucherId })

  if (voucher === null) {
    const error = {
      status: 404,
      message: 'El voucher que intentas editar no existe.'
    }
    throw error
  }
  // delete body.createdAt
  // console.log('body', body)
  try {
    // const voucher = await Voucher.updateOne({ _id: userId }, {$unset: {photo:1}})
    const voucherUpdate = await Voucher.updateOne({ _id: voucherId }, body)
    const voucher = await Voucher.findOne({ _id: voucherId })
    return voucher
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const voucher = await Voucher.findOne(query, select).populate(populate)

    if (voucher === null) {
      const error = {
        status: 404,
        message: 'El voucher no existe.'
      }
      throw error
    }

    return voucher
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async voucherId => {
  const voucher = await Voucher.findOne({ _id: voucherId })

  if (voucher === null) {
    const error = {
      status: 404,
      message: 'El voucher que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Voucher.deleteOne({ _id: voucherId })

    return voucher
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

'use strict'

const Sale = require('../models/sale')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Sale.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const sales = await Sale.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return sales
}

const search = async params => {
  try {
    const query = params.query.map(JSON.parse)
    const { aggregate, sort } = transformParams(params)
    console.log('query', query)
    const sales = await Sale
    .aggregate(
        [
          {
            $lookup: {
              from: 'users',
              localField: 'user.ref',
              foreignField: '_id',
              as: 'user.ref'
            }
          },
          {
            $unwind: '$user.ref'
          },
          {
            $match: {
              $and: query
            }
          }
        ]
      )
    return sales
  } catch (errorDB) {
    throw errorDB
  }
}

const create = async body => {
  try {
    const sale = await Sale.create(body)
    const saleFind = await Sale.findOne({ _id: sale._id }).populate(['orders'])
    return saleFind
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const updateAdmin = async (saleId, body) => {
  const sale = await Sale.findOne({ _id: saleId })

  if (sale === null) {
    const error = {
      status: 404,
      message: 'La venta que intentas editar no existe.'
    }
    throw error
  }

  delete body.createdAt

  try {
    const newSale = await Sale.findOneAndUpdate({ _id: saleId }, body, {
      new: true
    }).populate(['orders', 'user.ref'])
    return newSale
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (saleId, body) => {
  const sale = await Sale.findOne({ _id: saleId })

  if (sale === null) {
    const error = {
      status: 404,
      message: 'La venta que intentas editar no existe.'
    }
    throw error
  }

  delete body.createdAt

  try {
    const newSale = await Sale.findOneAndUpdate({ _id: saleId }, body, {
      new: true
    }).populate(['orders'])
    return newSale
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const updateOne = async (saleId, body) => {
  const sale = await Sale.findOne({ _id: saleId })

  if (sale === null) {
    const error = {
      status: 404,
      message: 'La venta que intentas editar no existe.'
    }
    throw error
  }

  try {
    const updateSale = await Sale.updateOne({ _id: saleId }, { $set: body }, {
      upsert: true, 
    })
    const sale = await Sale.findOne({ _id: saleId }).populate(['user.ref', 'deal', 'orders.voucher.ref', 'orders.receipt.ref'])
    return sale
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}


const detail = async params => {
  const { query, select, populate } = transformParams(params)

  const sale = await Sale.findOne(query, select).populate(populate)

  if (sale === null) {
    const error = {
      status: 404,
      message: 'La venta no existe.'
    }
    throw error
  }

  try {
    return sale
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async saleId => {
  const sale = await Sale.findOne({ _id: saleId })

  if (sale === null) {
    const error = {
      status: 404,
      message: 'La venta que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Sale.deleteOne({ _id: saleId })

    return sale
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
  updateAdmin,
  updateOne,
  detail,
  remove
}

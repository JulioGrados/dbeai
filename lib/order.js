'use strict'

const mongoose = require('mongoose')
const Order = require('../models/order')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Order.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const orders = await Order.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return orders
}

const create = async body => {
  try {
    const orderCreate = await Order.create(body)
    const order = await Order.findOne({ _id: orderCreate._id }).populate(['voucher.ref', 'student.ref', 'course.ref'])
    return order  
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (voucherId, body) => {
  const order = await Order.findOne({ _id: voucherId })

  if (order === null) {
    const error = {
      status: 404,
      message: 'El order que intentas editar no existe.'
    }
    throw error
  }
  delete body.createdAt
  try {
    const order = await Order.findOneAndUpdate({ _id: voucherId }, body, {
      new: true
    }).populate([
      'voucher.ref', 'student.ref', 'course.ref'
    ])

    return order
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  const order = await Order.findOne(query, select).populate(populate)

  if (order === null) {
    const error = {
      status: 404,
      message: 'La order no existe.'
    }
    throw error
  }

  try {
    return order
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const assessor = async params => {
  
  try {
    const date = new Date()
    const end = date.setDate(date.getDate() + 1)
    const start = date.setDate(date.getDate() - 40)
    const orders = await Order.aggregate(
        [
          {
            $lookup: {
              from: 'users',
              localField: 'student.ref',
              foreignField: '_id',
              as: 'student.ref'
            }
          },
          {
            $unwind: '$student.ref'
          },
          {
            $lookup: {
              from: 'courses',
              localField: 'course.ref',
              foreignField: '_id',
              as: 'course.ref'
            }
          },
          {
            $unwind: '$course.ref'
          },
          {
            $lookup: {
              from: 'receips',
              localField: 'receipt.ref',
              foreignField: '_id',
              as: 'receipt.ref'
            }
          },
          {
            $unwind: '$receipt.ref'
          },
          {
            $lookup: {
              from: 'vouchers',
              localField: 'voucher.ref',
              foreignField: '_id',
              as: 'voucher.ref'
            }
          },
          {
            $unwind: '$voucher.ref'
          },
        {
          $match: {
            $and:
              [
                { status: { $in: ['Pagada', 'Usada', 'Cancelada'] } },
                { 'assigned.ref': mongoose.Types.ObjectId(params.userId) },
                { 'voucher.ref.date': { $gte: new Date(start), $lte: new Date(end) } },
              ]
          }
        },
          // {   
          //   $project: {
          //       _id: 1,
          //       students : 1,
          //       startDate : 1,
          //       progress : 1,
          //       progressPayment : 1,
          //       statusActivity : 1,
          //       status : 1,
          //       createdAt : 1,
          //       assessor : 1,
          //       client: { _id: 1, names: 1, firstName: 1, lastName: 1, email: 1, mobile: 1, dni: 1, country: 1, city: 1, extras: 1}
          //   } 
          // }
        ]
      ).sort({'voucher.ref.date': -1})

    return orders
  } catch (errorDB) {
    throw errorDB
  }
}

const updateOne = async (orderId, body) => {
  const order = await Order.findOne({ _id: orderId })

  if (order === null) {
    const error = {
      status: 404,
      message: 'La venta que intentas editar no existe.'
    }
    throw error
  }

  try {
    const orderUpdate = await Order.updateOne({ _id: orderId }, { $set: body }, {
      upsert: true, 
    })
    const order = await Order.findOne({ _id: orderId }).populate(['voucher.ref', 'student.ref', 'course.ref'])
    return order
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async saleId => {
  const order = await Order.findOne({ _id: saleId })

  if (order === null) {
    const error = {
      status: 404,
      message: 'La order que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Order.deleteOne({ _id: saleId })

    return order
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

module.exports = {
  count,
  list,
  assessor,
  create,
  update,
  updateOne,
  detail,
  remove
}

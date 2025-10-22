'use strict'

const mongoose = require('mongoose')
const Deal = require('../models/deal')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Deal.countDocuments(query)
  return count
}

const list = async params => {
  
  const { query, select, populate, sort, limit, skip } = transformParams(params)
  
  const deals = await Deal
    .find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return deals
}

const search = async params => {
  
  try {
    const { aggregate, sort } = transformParams(params)
    // console.log('aggregate', aggregate)
    const deals = await Deal
      .aggregate(aggregate)
      .sort(sort)

    return deals
  } catch (errorDB) {
    throw errorDB
  }
}

const dash = async params => {
  
  try {
    const query = params.query.map(JSON.parse)
    const find = query.find(item => item._id)
    
    if (find) {
      query.forEach(element => {
        if (element._id) {
          element._id = mongoose.Types.ObjectId(element._id)
        }
      })
    }
    
    const deals = await Deal
      .aggregate(
        [
          {
            $lookup: {
              from: 'users',
              localField: 'client',
              foreignField: '_id',
              as: 'client'
            }
          },
          {
            $unwind: '$client'
          },
          {
            $match: {
              $and: query
            }
          }
        ]
      )

    return deals
  } catch (errorDB) {
    throw errorDB
  }
}

const assessor = async params => {
  
  try {
    
    const deals = await Deal
      .aggregate(
        [
          {
            $lookup: {
              from: 'users',
              localField: 'client',
              foreignField: '_id',
              as: 'client'
            }
          },
          {
            $unwind: '$client'
          },
          { $match: { $and:[ {status: 'Abierto'}, {'assessor.ref': mongoose.Types.ObjectId(params.userId)}] } },
          {   
            $project: {
                _id: 1,
                students : 1,
                startDate : 1,
                progress : 1,
                progressPayment : 1,
                statusActivity : 1,
                status : 1,
                createdAt : 1,
                assessor : 1,
                client: { _id: 1, names: 1, firstName: 1, lastName: 1, email: 1, mobile: 1, dni: 1, document: 1, country: 1, city: 1, extras: 1}
            } 
          }
        ]
      )
      .sort({startDate: 1})

    return deals
  } catch (errorDB) {
    throw errorDB
  }
}

const general = async params => {
  
  try {
    // const { aggregate, sort } = transformParams(params)
  
    const deals = await Deal
      .aggregate(
        [
          {
            $lookup: {
              from: 'users',
              localField: 'client',
              foreignField: '_id',
              as: 'client'
            }
          },
          {
            $unwind: '$client'
          },
          { $match: { $and:[ {status: 'Abierto'}] } },
          {   
            $project: {
                _id: 1,
                students : 1,
                startDate : 1,
                progress : 1,
                progressPayment : 1,
                statusActivity : 1,
                status : 1,
                createdAt : 1,
                assessor : 1,
                client: { _id: 1, names: 1, firstName: 1, lastName: 1, email: 1, mobile: 1, dni: 1, document: 1, country: 1, city: 1, extras: 1}
            } 
          }
        ]
      )
      .sort({startDate: 1})

    return deals
  } catch (errorDB) {
    throw errorDB
  }
}

const create = async body => {
  try {
    const deal = await Deal.create(body)

    return await Deal.findById(deal._id).populate([
      { path: 'client'},
      {
        path: 'students.student.ref'
      },
      { path: 'students.courses.ref' },
      { path: 'assessor.ref' }
    ])
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const updateOne = async (dealId, body, populate) => {
  // console.log('deal lib', dealId)
  const deal = await Deal.findOne({ _id: dealId })
  // console.log('paso', deal)
  if (deal === null) {
    const error = {
      status: 404,
      message: 'El deal no se encontro'
    }

    throw error
  }

  // delete body.updateAt

  try {
    const updateDeal = await Deal.updateOne({ _id: dealId }, { $set: body }, {
      upsert: true, 
    })
    const deal = await Deal.findOne({ _id: dealId }).populate([
      { path: 'client', select: 'names firstName lastName email mobile dni document country city extras academicLevel' },
      {
        path: 'students.student.ref'
      },
      { path: 'students.courses.ref' }
    ])
    return deal
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (dealId, body, populate) => {
  // console.log('deal lib', dealId)
  const deal = await Deal.findOne({ _id: dealId })
  // console.log('paso', deal)
  if (deal === null) {
    const error = {
      status: 404,
      message: 'El deal no se encontro'
    }

    throw error
  }

  delete body.createdAt

  try {
    const deal = await Deal.findOneAndUpdate({ _id: dealId }, body, {
      new: true, 
    }).populate([
      { path: 'client', select: 'names firstName lastName email mobile dni document country city extras academicLevel' },
      {
        path: 'students.student.ref'
      },
      { path: 'students.courses.ref' }
    ])

    return deal
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const deal = await Deal.findOne(query, select).populate(populate)

    if (deal === null) {
      const error = {
        status: 404,
        message: 'El deal no se encontro'
      }

      throw error
    }

    return deal
  } catch (errorDB) {
    // console.log('erroDB', errorDB)
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async dealId => {
  const deal = await Deal.findOne({ _id: dealId })

  if (deal === null) {
    const error = {
      status: 404,
      message: 'El deal no se encontro'
    }

    throw error
  }

  try {
    await Deal.deleteOne({ _id: dealId })

    return deal
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

module.exports = {
  count,
  list,
  assessor,
  general,
  search,
  create,
  update,
  updateOne,
  detail,
  remove,
  dash
}

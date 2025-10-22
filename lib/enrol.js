'use strict'

const Enrol = require('../models/enrol')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Enrol.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const enrols = await Enrol.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return enrols
}

const create = async body => {
  try {
    const enrol = await Enrol.create(body)

    return enrol
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (enrolId, body) => {
  const enrol = await Enrol.findOne({ _id: enrolId })

  if (enrol === null) {
    const error = {
      status: 404,
      message: 'El enrol que intentas editar no existe.'
    }
    throw error
  }
  delete body.createdAt
  try {
    const enrol = await Enrol.findOneAndUpdate({ _id: enrolId }, body, {
      new: true
    })

    return enrol
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const ratings = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const enrol = await Enrol.aggregate(
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
            from: 'certificates',
            localField: 'certificate.ref',
            foreignField: '_id',
            as: 'certificate.ref'
          }
        },
        {
          $unwind: '$certificate.ref'
        },
        { $match: { $and:[ {isFinished: true}] } },
        {   
          $project:{
            linked : {
              ref: { email: 1, firstName: 1, lastName: 1, beforeName: 1 }
            },
            course : {
              ref: { name: 1, agreement: 1, numberEvaluation: 1, academicHours: 1, typeOfEvaluation: 1, moodleId: 1 }
            },
            exams : 1,
            tasks: 1,
            shipping: 1,
            certificate : {
              ref: { shortCode: 1, score: 1, date: 1, createdAt: 1, _id: 1 }
            },
            agreement: 1,
            modality: 1
          } 
        },
        { $sort: { 'certificate.ref.date': -1 } },
        { $limit: 50 }
      ]
    )

    if (enrol === null) {
      const error = {
        status: 404,
        message: 'El enrol no existe.'
      }
      throw error
    }

    return enrol
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const general = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const enrol = await Enrol.aggregate(
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
        { $match: { $and:[ {isFinished: true}] } },
        {   
          $project:{
            linked : {
              ref: { email: 1, firstName: 1, lastName: 1, beforeName: 1 }
            },
            course : {
              ref: { name: 1 }
            },
            agreement: 1
          } 
        }
      ]
    ).sort({date: 1})

    if (enrol === null) {
      const error = {
        status: 404,
        message: 'El enrol no existe.'
      }
      throw error
    }

    return enrol
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const enrol = await Enrol.findOne(query, select).populate(populate)

    if (enrol === null) {
      const error = {
        status: 404,
        message: 'El enrol no existe.'
      }
      throw error
    }

    return enrol
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async enrolId => {
  const enrol = await Enrol.findOne({ _id: enrolId })

  if (enrol === null) {
    const error = {
      status: 404,
      message: 'El enrol que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Enrol.deleteOne({ _id: enrolId })

    return enrol
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

module.exports = {
  count,
  list,
  general,
  create,
  update,
  detail,
  ratings,
  remove
}

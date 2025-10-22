'use strict'

const Company = require('../models/company')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Company.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const companies = await Company.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return companies
}

const create = async body => {
  try {
    const company = await Company.create(body)
    return company
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (companyId, body) => {
  const company = await Company.findOne({ _id: companyId })

  if (company === null) {
    const error = {
      status: 404,
      message: 'La compania que intentas editar no existe.'
    }
    throw error
  }
  delete body.createdAt
  try {
    const company = await Company.findOneAndUpdate({ _id: companyId }, body, {
      new: true
    })

    return company
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const company = await Company.findOne(query, select).populate(populate)

    if (company === null) {
      const error = {
        status: 404,
        message: 'La compania no existe.'
      }
      throw error
    }

    return company
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async companyId => {
  const company = await Company.findOne({ _id: companyId })

  if (company === null) {
    const error = {
      status: 404,
      message: 'La compania que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Company.deleteOne({ _id: companyId })

    return company
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

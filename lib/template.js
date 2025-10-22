'use strict'

const Template = require('../models/template')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Template.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const templates = await Template.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return templates
}

const create = async body => {
  try {
    const template = await Template.create(body)
    return template
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (templateId, body) => {
  const template = await Template.findOne({ _id: templateId })

  if (template === null) {
    const error = {
      status: 404,
      message: 'El template no se encontro'
    }
    throw error
  }

  delete body.createdAt

  try {
    const templateUpdate = await Template.findOneAndUpdate(
      { _id: templateId },
      body,
      { new: true }
    )
    return templateUpdate
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const template = Template.findOne(query, select).populate(populate)

    if (template === null) {
      const error = {
        status: 404,
        menssage: 'El template no se encontro'
      }

      throw error
    }

    return template
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async templateId => {
  const template = await Template.findOne({ _id: templateId })

  if (template === null) {
    const error = {
      status: 404,
      message: 'El template no se encontro'
    }

    throw error
  }

  try {
    await Template.deleteOne({ _id: templateId })
    return template
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

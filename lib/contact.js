'use strict'

const Contact = require('../models/contact')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Contact.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const contacts = await Contact.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return contacts
}

const create = async body => {
  try {
    const contact = await Contact.create(body)
    return contact
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (contactId, body) => {
  const contact = await Contact.findOne({ _id: contactId })

  if (contact === null) {
    const error = {
      status: 404,
      message: 'El contacto no se encontro'
    }
    throw error
  }

  try {
    const contactUpdate = await Contact.findOneAndUpdate(
      { _id: contactId },
      body,
      {
        new: true
      }
    )
    return contactUpdate
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const contact = Contact.findOne(query, select).populate(populate)

    if (contact === null) {
      const error = {
        status: 404,
        menssage: 'El contacto no se encontro'
      }

      throw error
    }

    return contact
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async contactId => {
  const contact = Contact.findOne({ _id: contactId })

  if (contact === null) {
    const error = {
      status: 404,
      message: 'El contacto no se encontro'
    }

    throw error
  }

  try {
    const contactRemove = Contact.deleteOne({ _id: contactId })
    return contactRemove
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

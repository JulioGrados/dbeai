'use strict'

const Receipt = require('../models/receipt')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Receipt.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const receipts = await Receipt.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return receipts
}

const create = async body => {
  if (body.isBill) {
    if (!body.ruc || !body.businessName) {
      const error = {
        status: 402,
        message: 'Debes agregar un Ruc y un nombre del negocio'
      }
      throw error
    }
  } else {
    if (!body.names) {
      const error = {
        status: 402,
        message: 'Debes agregar un Nombre de la persona'
      }
      throw error
    }

    if (body.amount > 700 && !body.dni) {
      const error = {
        status: 402,
        message: 'Debes agregar un dni para crear el recibo'
      }
      throw error
    }
  }

  try {
    const receipt = await Receipt.create(body)

    return receipt
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (receiptId, body) => {
  const receipt = await Receipt.findOne({ _id: receiptId })

  if (receipt === null) {
    const error = {
      status: 404,
      message: 'El recibo que intentas editar no existe.'
    }
    throw error
  }

  delete body.createdAt

  try {
    const receipt = await Receipt.findOneAndUpdate({ _id: receiptId }, body, {
      new: true
    })

    return receipt
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const receipt = await Receipt.findOne(query, select).populate(populate)

    if (receipt === null) {
      const error = {
        status: 404,
        message: 'El recibo no existe.'
      }
      throw error
    }

    return receipt
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async receiptId => {
  const receipt = await Receipt.findOne({ _id: receiptId })

  if (receipt === null) {
    const error = {
      status: 404,
      message: 'El recibo que intentas eliminar no existe.'
    }
    throw error
  }

  try {
    await Receipt.deleteOne({ _id: receiptId })

    return receipt
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

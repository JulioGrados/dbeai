'use strict'

const Chapter = require('../models/chapter')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Chapter.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const chapters = await Chapter.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return chapters
}

const create = async body => {
  try {
    const chapter = await Chapter.create(body)
    return chapter
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (chapterId, body) => {
  const chapter = await Chapter.findOne({ _id: chapterId })

  if (chapter === null) {
    const error = {
      status: 404,
      message: 'El capítulo no se encontro'
    }
    throw error
  }

  try {
    const chapterUpdate = await Chapter.findOneAndUpdate(
      { _id: chapterId },
      body,
      {
        new: true
      }
    )
    return chapterUpdate
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)
  let chapter

  try {
    chapter = await Chapter.findOne(query, select).populate(populate)
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }

  if (chapter === null) {
    const error = {
      status: 404,
      menssage: 'El capítulo no se encontro'
    }

    throw error
  }

  return chapter
}

const remove = async chapterId => {
  const chapter = Chapter.findOne({ _id: chapterId })

  if (chapter === null) {
    const error = {
      status: 404,
      message: 'El capítulo no se encontro'
    }

    throw error
  }

  try {
    const chapterRemove = Chapter.deleteOne({ _id: chapterId })
    return chapterRemove
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

'use strict'

const ChapterVersion = require('../models/chapterVersion')

const { transformParams } = require('utils').transform
// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await ChapterVersion.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const chapters = await ChapterVersion.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return chapters
}

const create = async body => {
  try {
    const chapterVersion = await ChapterVersion.create(body)
    return chapterVersion
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (chapterId, body) => {
  const chapterVersion = await ChapterVersion.findOne({ _id: chapterId })

  if (chapterVersion === null) {
    const error = {
      status: 404,
      message: 'El capítulo no se encontro'
    }
    throw error
  }

  try {
    const chapterUpdate = await ChapterVersion.findOneAndUpdate(
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
  let chapterVersion

  try {
    chapterVersion = await ChapterVersion.findOne(query, select).populate(populate)
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }

  if (chapterVersion === null) {
    const error = {
      status: 404,
      menssage: 'El capítulo no se encontro'
    }

    throw error
  }

  return chapterVersion
}

const remove = async chapterId => {
  const chapterVersion = ChapterVersion.findOne({ _id: chapterId })

  if (chapterVersion === null) {
    const error = {
      status: 404,
      message: 'El capítulo no se encontro'
    }

    throw error
  }

  try {
    const chapterRemove = ChapterVersion.deleteOne({ _id: chapterId })
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

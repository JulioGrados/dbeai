'use strict'

const Blog = require('../models/blog')

const { transformParams } = require('utils').transform

// const { parseErrorDB } = require('utils').errors

const count = async params => {
  const { query } = transformParams(params)
  const count = await Blog.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const blogs = await Blog.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return blogs
}

const create = async body => {
  try {
    const blog = await Blog.create(body)

    return blog
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const update = async (blogId, body) => {
  const blog = await Blog.findOne({ _id: blogId })

  if (blog === null) {
    const error = {
      status: 404,
      message: 'El blog no se encontro'
    }

    throw error
  }

  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: blogId },
      body,
      { new: true }
    )
    return blog
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const blog = await Blog.findOne(query, select).populate(populate)

    if (blog === null) {
      const error = {
        status: 404,
        message: 'El blog no se encontro'
      }

      throw error
    }

    return blog
  } catch (errorDB) {
    // const error = parseErrorDB(errorDB)
    throw errorDB
  }
}

const remove = async blogId => {
  const blog = await Blog.findOne({ _id: blogId })

  if (blog === null) {
    const error = {
      status: 404,
      message: 'El blog no se encontro'
    }

    throw error
  }

  try {
    await Blog.deleteOne({ _id: blogId })

    return blog
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

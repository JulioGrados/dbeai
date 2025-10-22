'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El curso debe tener nombre.']
    },
    slug: {
      type: String,
      required: [true, 'El curso debe tener un slug.'],
      unique: 'El Slug del curso debe ser único.'
    },
    shortName: {
      type: String
    },
    isFree: {
      type: Boolean,
      default: false
    },
    isHidden: {
      type: Boolean,
      default: false
    },
    isForo: {
      type: Boolean,
      default: false
    },
    isConfirmation: {
      type: Boolean,
      default: false
    },
    numberEvaluation: {
      type: Number
    },
    price: {
      type: Number
    },
    discount: {
      type: Number
    },
    brochure: {
      type: String
    },
    brochureDrive: {
      type: String
    },
    googleId: {
      type: String
    },
    published: {
      type: Date,
      default: Date.now
    },
    migrateTesty: {
      type: Date
    },
    migrateMod: {
      type: Date
    },
    migrateCert: {
      type: Date
    },
    academicHours: {
      type: Number
    },
    description: {
      type: String
    },
    descriptionGeneral: {
      type: String
    },
    priceOffert: {
      type: Number
    },
    image: {
      type: String
    },
    shortimage: {
      type: String
    },
    typeOfEvaluation: {
      type: String,
      default: 'exams',
      enum: ['exams', 'tasks', 'both']
    },
    opengraph: {
      type: String
    },
    titleSEO: {
      type: String
    },
    descriptionSEO: {
      type: String
    },
    percentageTeacher: {
      type: Number,
      default: 10
    },
    category: {
      name: {
        type: String
      },
      slug: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
      }
    },
    labels: [
      {
        name: {
          type: String
        },
        slug: {
          type: String
        },
        ref: {
          type: Schema.Types.ObjectId,
          ref: 'Label'
        }
      }
    ],
    author: {
      username: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    agreement: {
      institution: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Agreement'
      }
    },
    moodleId: {
      type: Number
    },
    teachers: [
      {
        username: {
          type: String
        },
        names: {
          type: String
        },
        last_name: {
          type: String
        },
        description: {
          type: String
        },
        photo: {
          type: String
        },
        ref: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
      }
    ],
    lessons: [
      {
        name: {
          type: String
        },
        slug: {
          type: String
        },
        chapters: [
          {
            name: {
              type: String
            },
            slug: {
              type: String
            }
          }
        ]
      }
    ],
    coins: [
      {
        name: {
          type: String
        },
        code: {
          type: String
        },
        symbol: {
          type: String
        },
        price: {
          type: Number
        },
        priceOffert: {
          type: Number
        }
      }
    ],
    countries: [
      {
        name: {
          type: String
        },
        code: {
          type: String
        },
        callingCode: {
          type: String
        },
        currency: {
          type: String
        }
      }
    ],
    brochures: [
      {
        url: {
          type: String
        },
        upload: {
          type: Boolean
        },
        money: {
          type: String
        }
      }
    ],
    points: {
      type: Number
    }
  },
  {
    collection: 'courses'
  }
)

CourseSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

CourseSchema.plugin(mongooseBeautifulUniqueValidation)

CourseSchema.index({
  name: 1,
  'teacher.username': 1,
  'category.name': 1
})

module.exports = mongoose.model('Course', CourseSchema)

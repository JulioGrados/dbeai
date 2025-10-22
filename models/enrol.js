'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const EnrolSchema = new Schema(
  {
    linked: {
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      username: {
        type: String
      },
      email: {
        type: String
      },
      moodleId: {
        type: Number
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    course: {
      name: {
        type: String
      },
      price: {
        type: Number
      },
      moodleId: {
        type: Number
      },
      academicHours: {
        type: Number
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
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
    modality: {
      type: String,
      enum: ['Físico', 'Virtual'],
      default: 'Físico'
    },
    exams: [
      {
        number: {
          type: Number
        },
        name: {
          type: String
        },
        score: {
          type: Number
        },
        date: {
          type: Number
        },
        percent: {
          type: Number
        },
        isTaken: {
          type: Boolean
        },
        examattempt: {
          type: Schema.Types.ObjectId,
          ref: 'ExamAttempt'
        },
        exam: {
          type: Schema.Types.ObjectId,
          ref: 'Exam'
        }
      }
    ],
    tasks: [
      {
        number: {
          type: Number
        },
        name: {
          type: String
        },
        score: {
          type: Number
        },
        date: {
          type: Number
        },
        percent: {
          type: Number
        },
        isTaken: {
          type: Boolean
        },
        fileSend: {
          type: String
        },
        statusSend: {
          type: String,
          default: 'No entregado',
          enum: ['No entregado', 'Entregado', 'Revisado']
        },
        statusRating: {
          type: String,
          default: 'Sin calificar',
          enum: ['Sin calificar', 'Por calificar', 'Calificado']
        },
        comments: {
          type: String
        },
        taskattempt: {
          type: Schema.Types.ObjectId,
          ref: 'TaskAttempt'
        },
        task: {
          type: Schema.Types.ObjectId,
          ref: 'Task'
        }
      }
    ],
    shipping: {
      moodleId: {
        type: Number
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      dni: {
        type: String
      },
      cellphone: {
        type: String
      },
      date: {
        type: Number
      },
      address: {
        type: String
      },
      country: {
        type: String
      },
      department: {
        type: String
      },
      province: {
        type: String
      },
      district: {
        type: String
      }
    },
    moodleId: {
      type: String
    },
    isFinished: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number
    },
    finalScore: {
      type: Number
    },
    certificate: {
      code: {
        type: String
      },
      shortCode: {
        type: String
      },
      ref: {
        type: Schema.Types.ObjectId,
        ref: 'Certificate'
      }
    },
    poll: {
      pointsCourse: {
        type: Number
      },
      recommendCourse: {
        type: Boolean
      },
      qualityTeacher: {
        type: Number
      },
      pointsTeacher: {
        type: Number
      },
      testimony: {
        type: String
      }
    },
    pollAction: {
      type: Boolean,
      default: false
    },
    shippingAction: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'enrols'
  }
)

EnrolSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})
EnrolSchema.plugin(mongooseBeautifulUniqueValidation)

EnrolSchema.index({
  email: 1
})

module.exports = mongoose.model('Enrol', EnrolSchema)

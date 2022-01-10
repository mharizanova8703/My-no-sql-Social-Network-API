const { Schema, model } = require('mongoose')
const moment = require('moment')

//Schema to create User model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Enter a valid email address',
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior

    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
)
//Initialize our User model
const User = model('User', UserSchema)

UserSchema.virtual('friendCount').get(function () {
  return this.friends.lenght
})

//export The user model
module.exports = User

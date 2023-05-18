const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
  },
  { timestamps: true }
)

module.exports = UserModel = mongoose.model('User', UserSchema)

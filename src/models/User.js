import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
)

const userModel = mongoose.model('User', userSchema)

export default userModel

import bcrypt from 'bcrypt'
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
    },
    password: {
      type: String,
      max: 255,
      required: true
    }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) return next();

  const saltRound = 10
  const password = this.password

  const salt = await bcrypt.genSalt(saltRound)
  const hash = await bcrypt.hash(password, salt)

  this.password = hash
  next()
})


const userModel = mongoose.model('User', userSchema)

export default userModel

import express from 'express'
import { signUp } from '../../controllers/auths.js'

const authRouter = express.Router()

authRouter
  .route('/signup')
  .post(signUp)

export default authRouter

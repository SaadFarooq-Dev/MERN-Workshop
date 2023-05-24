import express from 'express'
import { signUp } from '../../controllers/auths.js'
import passport from 'passport'

import { loginUser, signUp } from '../../controllers/auths.js'

const authRouter = express.Router()

authRouter
  .route('/signup')
  .post(signUp)

authRouter
  .route('/login')
  .post(passport.authenticate('login', { session: false, failWithError: true }), loginUser)

export default authRouter

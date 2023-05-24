import express from 'express'
import { createUser, deleteUser, getUser, getUsers, patchUser } from '../../controllers/users.js';

const userRouter = express.Router()

userRouter
  .route('/')
  .get(getUsers)
  .post(createUser)

userRouter
  .route('/:id')
  .get(getUser)
  .patch(patchUser)
  .delete(deleteUser)

export default userRouter

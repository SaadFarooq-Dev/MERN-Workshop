import express from 'express'
import { createPost, deletePost, getPost, getPosts, patchPost } from '../../controllers/posts.js'

const postRouter = express.Router()

postRouter
  .route('/')
  .get(getPosts)
  .post(createPost)

postRouter
  .route('/:id')
  .get(getPost)
  .patch(patchPost)
  .delete(deletePost)

export default postRouter

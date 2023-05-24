import { model, Schema } from 'mongoose'

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }

}, { timestamps: true })

PostSchema.index({ _id: 1, author: 1 }, { unique: true })

const PostModel = model('Post', PostSchema)

export default PostModel

import PostModel from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const Posts = await PostModel.find().sort({ createdAt: '-1' })
    return res.status(200).json(Posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server Error: ' + error.message);
  }
}


export const getPost = async (req, res) => {
  try {
    const Post = await PostModel.findById(req.params.id)
    if (Post) {
      return res.status(200).json(Post)
    }
    return res.status(404).json({ errors: [{ message: 'No such document exists for the given Id' }] })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server Error: ' + error.message);
  }
}

export const createPost = async (req, res) => {
  try {
    if (req.body.body && req.body.title) {

      const { title, body, author } = req.body
      const post = await PostModel.create({ title, body, author })
      return res.status(200).json(post)
    }
    res.status(403).json({ msg: "Invalid Data" })
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
}

export const patchPost = async (req, res) => {
  try {
    if (req.body.title || req.body.body || req.body.author) {
      const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (post) {
        return res.status(200).json(post)
      }
      return res.status(404).json({ errors: [{ message: 'No such document exists for the given Id' }] })
    }
    return res.status(403).json({ errors: [{ message: 'Invalid Data' }] })

  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
}

export const deletePost = async (req, res) => {
  try {
    const post = await PostModel.deleteOne({ _id: req.params.id })
    if (post.deletedCount) {
      return res.status(200).json(`Post: ${req.params.id} deleted`)
    }
    return res.status(404).json({ errors: [{ message: 'No such document exists for the given Id' }] })
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
}


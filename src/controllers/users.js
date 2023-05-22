import UserModel from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate('posts').sort({ createdAt: '-1' })
    return res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server Error: ' + error.message);
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate('posts')
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(404).json({ errors: [{ message: 'No such document exists for the given Id' }] })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server Error: ' + error.message);
  }
}

export const createUser = async (req, res) => {
  try {
    if (req.body.email && req.body.name) {

      const { name, email, password } = req.body

      let user = await UserModel.findOne({ email })
      if (user) {
        return res.status(422).json({ errors: [{ message: 'User already exists' }] })
      }
      user = await UserModel.create({ name, email, password })
      user = user.toObject()
      delete user.password
      return res.status(200).json(user)
    }
    res.status(403).json({ msg: "Invalid Data" })
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
}

export const patchUser = async (req, res) => {
  try {
    if (req.body.name || req.body.email || req.body.password) {
      const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (user) {
        return res.status(200).json(user)
      }
      return res.status(404).json({ errors: [{ message: 'No such document exists for the given Id' }] })
    }
    return res.status(403).json({ errors: [{ message: 'Invalid Data' }] })

  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.deleteOne({ _id: req.params.id })
    if (user.deletedCount) {
      return res.status(200).json(`User: ${req.params.id} deleted`)
    }
    return res.status(404).json({ errors: [{ message: 'No such document exists for the given Id' }] })
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
}

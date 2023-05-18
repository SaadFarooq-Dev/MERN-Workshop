import express from 'express'

import userModel from '../../models/User.js';

const userRouter = express.Router()

// When creating routes please make routes with doesn't require :id or any other params to bs placed in the last
// While the routes without params should be created first.
// So when the request is made it first compares with the non params route and then compares with the params route
// Here I am taking about path params only

// @route     GET api/users
// @desc      Get all users
// @access    Public

userRouter.get('/', async (req, res) => {
  try {
    const users = await userModel.find().sort({ createdAt: '-1' })
    return res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
});

// @route     POST api/users
// @desc      Create a user
// @access    Public

userRouter.post('/', async (req, res) => {
  try {
    if (req.body.email && req.body.name) {

      const { name, email } = req.body

      let user = await userModel.findOne({ email })
      if (user) {
        return res.status(422).json({ errors: [{ message: 'User already exists' }] })
      }
      user = await userModel.create({ name, email })
      return res.status(200).json(user)
    }
    res.status(403).json({ msg: "Invalid Data" })
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
});

// @route     GET api/users/:id
// @desc      Get user by Id
// @access    Public

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(404).json({ errors: [{ message: 'No such document exists for the given Id' }] })
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
});

// @route     DELETE api/users/:id
// @desc      Delete a user
// @access    Public

userRouter.delete('/:id', async (req, res) => {
  try {
    const user = await userModel.deleteOne({ _id: req.params.id })
    if (user.deletedCount) {
      return res.status(200).json(`User: ${req.params.id} deleted`)
    }
    return res.status(404).json({ errors: [{ message: 'No such document exists for the given Id' }] })
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
});

// @route     PATCH api/users/:id
// @desc      Patch a user
// @access    Public

userRouter.patch('/:id', async (req, res) => {
  try {
    if (req.body.name || req.body.email) {
      const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
});

export default userRouter

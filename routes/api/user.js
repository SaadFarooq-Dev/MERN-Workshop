const express = require('express')
const router = express.Router()
const UserModel = require('../../models/User')

let users = [
  { id: '1', name: 'John' },
  { id: '2', name: 'Doe' },
  { id: '3', name: 'Alex' },
  { id: '4', name: 'Smith' },
  { id: '5', name: 'Tom' }
]


// @route     GET api/users
// @desc      Get all users
// @access    Public

router.get('/', async (req, res) => {
  try {
    return res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
});

// @route     POST api/users
// @desc      Create a user
// @access    Public

router.post('/', async (req, res) => {
  try {
    if (req.body.email && req.body.name) {
      const { name, email } = req.body
      let user = await UserModel.findOne({ email })
      if (user) {
        return res.status(400).json({ errors: [{ message: 'User already exists' }] })
      }
      user = await UserModel.create({ name, email})
      return res.status(200).json(user)
    }
    res.status(400).json({ msg: "Invalid user data" })
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
});

// @route     GET api/users/:id
// @desc      Get user by Id
// @access    Public

router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const user = users.filter(user => user.id === req.params.id)
    if (user.length > 0) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ msg: 'User not found' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
});



// @route     DELETE api/users/:id
// @desc      Delete a user
// @access    Public

router.delete('/:id', async (req, res) => {
  try {
    existingUser = users.filter(user => user.id === req.params.id)
    if (existingUser.length > 0) {
      users.splice(users.findIndex(user => user.id === req.params.id), 1);

      return res.status(200).json({ msg: 'user deleted successfully' })
    }
    return res.status(400).json({ msg: 'User does not exists' })

  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
});

module.exports = router

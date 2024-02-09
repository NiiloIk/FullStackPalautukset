const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    response.status(400).json({ error: 'Password too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    author: 1,
    title: 1,
    url: 1,
  })

  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id).populate('blogs', {
      author: 1,
      title: 1,
      url: 1,
    })
    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }
    response.json(user);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = usersRouter

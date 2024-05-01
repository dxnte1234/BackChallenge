const express = require('express')
const router = express.Router()
const Users = require('../models/usersBK')
const auth = require('../middlewares/userValidation')
const Messages = require('../models/mssgBK')

router.get('/', async (req, res) => {
  try {
    const message = await Messages.find()
    res.send({ message: 'All message', data: message })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

router.get('/:toid', auth.validUser, async (req, res) => {
  try {
    const { toid } = req.params
    const receiver = await Users.findById(toid)
    const user = req.user
    const mfrom = await Messages.find({
      $or: [
        {
          from: user.first_name,
          to: receiver.first_name
        },
        {
          to: user.first_name,
          from: receiver.first_name
        }
      ]
    })
    const messages = mfrom.sort((a, b) => b.createdAt - a.createdAt)
    res.send({ message: 'Messages historial', data: messages })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

router.post('/:toid', auth.validUser, async (req, res) => {
  try {
    const { toid } = req.params
    let message = req.body
    message.from = req.user.first_name
    const toUser = await Users.findById(toid)
    if (!toUser) {
      res.status(404).send({ message: 'User doesn´t exist' })
    } else {
      message.to = toUser.first_name
      const newMessage = await Messages.create(message)
      res.status(200).send({ message: 'Message sent', data: newMessage })
    }
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

router.put('/:messageid', auth.validUser, async (req, res) => {
  try {
    const { messageid } = req.params
    const message = req.body
    const upMsg = await Messages.findByIdAndUpdate(messageid, message, {
      returnOriginal: false
    })
    res.status(200).send({ message: 'Message sent', data: upMsg })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Messages.findByIdAndDelete(id)
    res.status(200).send({ message: 'Message deleted' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})
module.exports = router
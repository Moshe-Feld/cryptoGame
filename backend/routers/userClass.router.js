const express = require('express')
const { getAllUserClass, getUserClassById, addUserClass, getUserClassByUser, deleteAllUserClass, getJoinedUsers, leaveClass } = require('../controllers/userClass.contriller')

const router = express.Router()

router.get('/', getAllUserClass)

router.get('/:id', getUserClassById)

router.get('/join-class/:userId', getUserClassByUser)

router.get('/joined-users/:id', getJoinedUsers)

router.post('/:joinCode', addUserClass)

router.delete('/', deleteAllUserClass)

module.exports = router
const express = require('express')
const { getAllUserClass, getUserClassById, addUserClass, getUserClassByUser, deleteAllUserClass, getJoinedUsers, leaveClass, deleteUserClass } = require('../controllers/userClass.contriller')

const router = express.Router()

router.get('/', getAllUserClass)

router.get('/:id', getUserClassById)

router.get('/join-class/:userId', getUserClassByUser)

router.get('/joined-users/:id', getJoinedUsers)

router.post('/:joinCode', addUserClass)

router.delete('/:classId', deleteUserClass)

router.delete('/', deleteAllUserClass)

module.exports = router
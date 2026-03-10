const express = require('express')
const { getAllUserClass, getUserClassById, addUserClass, getUserClassByUser } = require('../controllers/userClass.contriller')

const router = express.Router()

router.get('/', getAllUserClass)

router.get('/:id', getUserClassById)

router.get('/join-class/:userId', getUserClassByUser)

router.post('/:joinCode', addUserClass)

module.exports = router
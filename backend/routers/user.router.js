const express = require('express');
const { getAllUsers, addUser, getUserById, addCoinsToUser } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getAllUsers)

router.get('/:email', getUserById)

router.post('/', addUser)

router.put('/:email', addCoinsToUser)

module.exports = router;
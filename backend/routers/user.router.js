const express = require('express');
const { getAllUsers, addUser, getUserById, editUser } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getAllUsers)

router.get('/:email', getUserById)

router.post('/', addUser)

router.put('/', editUser)

module.exports = router;
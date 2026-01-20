const express = require('express');
const { getAllUsers, addUser, getUserById, getUserByUserName, deleteAllUsers, updateUser, completedLevel } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getAllUsers)

router.get('/:_id', getUserById);

router.get('/user-name/:userName', getUserByUserName);

router.post('/', addUser)

router.put('/:_id', updateUser);

router.put('/stag-progress/:_id', completedLevel)

router.delete('/', deleteAllUsers);

module.exports = router;
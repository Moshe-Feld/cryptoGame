const express = require('express');
const { getAllUsers, addUser, getUserById, deleteAllUsers, getTop10, updateUser, getUserByEmail } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getAllUsers)

router.get('/top10', getTop10);

router.get('/:userName', getUserById)

router.get('/email/:email', getUserByEmail)

router.post('/', addUser)

router.put('/:email', updateUser)

router.delete('/', deleteAllUsers);

module.exports = router;
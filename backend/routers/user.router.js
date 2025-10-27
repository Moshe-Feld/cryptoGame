const express = require('express');
const { getAllUsers, addUser, getUserById, deleteAllUsers, getTop10, updateUser } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getAllUsers)

router.get('/top10', getTop10);

router.get('/:userName', getUserById)

router.post('/', addUser)

router.put('/:userName', updateUser)

router.delete('/', deleteAllUsers);

module.exports = router;
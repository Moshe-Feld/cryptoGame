const express = require('express');
const { getAllUsers, addUser, getUserById, getUserByUserName, getUserProgress, deleteAllUsers, updateUser, updateProfile } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getAllUsers)

router.get('/:_id', getUserById);

router.get('/user-name/:userName', getUserByUserName);

router.get('/user-progress/:_id', getUserProgress)

router.post('/', addUser)

router.put('/:_id', updateUser);

router.put('/update-profile/:userName', updateProfile)

router.delete('/', deleteAllUsers);

module.exports = router;
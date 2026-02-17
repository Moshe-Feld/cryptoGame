const express = require('express');
const { getAllUsers, addUser, getUserById, getUserByUserName, deleteAllUsers, updateUser, resetPass, updateProfile } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getAllUsers)

router.get('/:_id', getUserById);

router.get('/user-name/:userName', getUserByUserName);

router.post('/', addUser)

router.put('/:_id', updateUser);

router.put('/update-profile/:userName', updateProfile)

router.put('/reset-password/:email', resetPass)

router.delete('/', deleteAllUsers);

module.exports = router;
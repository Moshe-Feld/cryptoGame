const express = require('express');
const { getAllUsers, addUser, getUserById, addCoinsToUser, deleteAllUsers, getTop10, setLevel } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getAllUsers)

router.get('/top10', getTop10);

router.get('/:email', getUserById)

router.post('/', addUser)

router.put('/:email', addCoinsToUser)

router.put('/:email/level', setLevel);

router.delete('/', deleteAllUsers);

module.exports = router;
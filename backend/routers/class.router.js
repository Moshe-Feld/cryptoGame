const express = require('express');
const { getAllClasses, addClass, deleteClass, getClassesOfTeacher, getClssById, deleteAllClasses, updateClass, addQuote } = require('../controllers/class.controller');

const router = express.Router();

router.get('/', getAllClasses);

router.get('/:_id', getClssById)

router.get('/by-creater/:userId', getClassesOfTeacher);

router.post('/', addClass);

router.put('/add-quote/:id', addQuote)

router.put('/:_id', updateClass)

router.delete('/:_id', deleteClass);

router.delete('/', deleteAllClasses);

module.exports = router;
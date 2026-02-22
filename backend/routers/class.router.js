const express = require('express');
const { getAllClasses, addClass, joinToClass, deleteClass, getClassesOfTeacher, getClssById, getClassesOfStudents, deleteAllClasses, updateClass } = require('../controllers/class.controller');

const router = express.Router();

router.get('/', getAllClasses);

router.get('/:_id', getClssById)

router.get('/by-creater/:userId', getClassesOfTeacher);

router.get('/joinedUsers/:userName', getClassesOfStudents);

router.post('/', addClass);

router.put('/join/', joinToClass);

router.put('/:_id', updateClass)

router.delete('/:_id', deleteClass);

router.delete('/', deleteAllClasses);

module.exports = router;
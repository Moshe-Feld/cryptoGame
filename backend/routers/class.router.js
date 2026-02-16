const express = require('express');
const { getAllClasses, addClass, joinToClass, deleteClass, getClassesOfTeacher, getClssById, getClassesOfStudents, deleteAllClasses } = require('../controllers/class.controller');

const router = express.Router();

router.get('/', getAllClasses);

router.get('/:_id', getClssById)

router.get('/by-creater/:teacherId', getClassesOfTeacher);

router.get('/students/:userName', getClassesOfStudents);

router.post('/', addClass);

router.put('/', joinToClass);

router.delete('/:_id', deleteClass);

router.delete('/', deleteAllClasses);

module.exports = router;
const express = require('express');
const { getAllClasses, addClass, editClass, deleteClass, getClassesOfTeacher, getClssById, getClassesOfStudents, deleteAllClasses } = require('../controllers/class.controller');

const router = express.Router();

router.get('/', getAllClasses);

router.get('/id/:_id', getClssById)

router.get('/:teacherId', getClassesOfTeacher);

router.get('/students/:userName', getClassesOfStudents);

router.post('/', addClass);

router.put('/', editClass);

router.delete('/:_id', deleteClass);

router.delete('/', deleteAllClasses);

module.exports = router;
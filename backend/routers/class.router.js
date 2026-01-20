const express = require('express');
const { getAllClasses, addClass, editClass, deleteClass, getClassesOfTeacher, getClssById, getClassesOfStudents, deleteAllClasses } = require('../controllers/class.controller');

const router = express.Router();

router.get('/', getAllClasses);

router.get('/id/:classId', getClssById)

router.get('/:teacherId', getClassesOfTeacher);

router.get('/students/:email', getClassesOfStudents);

router.post('/', addClass);

router.put('/', editClass);

router.delete('/:classId', deleteClass);

router.delete('/', deleteAllClasses);

module.exports = router;
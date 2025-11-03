const express = require('express');
const { getAllClasses, addClass, editClass, deleteClass, getClassesOfTeacher } = require('../controllers/class.controller');

const router = express.Router();

router.get('/', getAllClasses);

router.get('/:teacherId', getClassesOfTeacher);

router.post('/', addClass);

router.put('/:classId', editClass);

router.delete('/:classId', deleteClass);

module.exports = router;
const express = require('express');
const { getQouteByClass, getQouteById, postQoute, getAllQoutes, deleteAllQoutes } = require('../controllers/qoute.controllr');

const router = express.Router();

router.get('/', getAllQoutes);

router.get('/by-class/:classId', getQouteByClass);

router.get('/:id', getQouteById),

router.post('/', postQoute);

router.delete('/', deleteAllQoutes);

// router.put('/:_id');

// router.delete('/:_id');

module.exports = router;
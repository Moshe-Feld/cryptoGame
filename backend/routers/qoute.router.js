const express = require('express');
const { getQouteByClass, getQouteById, postQoute, getAllQoutes } = require('../controllers/qoute.controllr');

const router = express.Router();

router.get('/', getAllQoutes);

router.get('/:teacherId', getQouteByClass);

router.get('/:_id', getQouteById),

router.post('/', postQoute);

// router.put('/:_id');

// router.delete('/:_id');

module.exports = router;
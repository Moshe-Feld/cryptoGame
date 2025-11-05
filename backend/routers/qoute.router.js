const express = require('express');
const { getQouteByClass, getQouteById, postQoute, getAllQoutes } = require('../controllers/qoute.controllr');

const router = express.Router();

router.get('/', getAllQoutes);

router.get('/:classId', getQouteByClass);

router.get('/id/:id', getQouteById),

router.post('/', postQoute);

// router.put('/:_id');

// router.delete('/:_id');

module.exports = router;
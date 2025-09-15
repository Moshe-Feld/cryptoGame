const express = require('express');
const { getQouteOfUser, getQouteById, postQoute } = require('../controllers/qoute.controllr');

const router = express.Router();

router.get('/:userId', getQouteOfUser);

router.get('/:_id', getQouteById),

router.post('/', postQoute);

// router.put('/:_id');

// router.delete('/:_id');

module.exports = router;
const express = require('express');
const { getQuoteByClass, getQuoteById, postQuote, getAllQuotes, deleteAllQuotes, deleteQuote } = require('../controllers/quote.controllr');

const router = express.Router();

router.get('/', getAllQuotes);

router.get('/by-class/:classId', getQuoteByClass);

router.get('/:id', getQuoteById),

router.post('/', postQuote);

router.delete('/', deleteAllQuotes);

router.delete('/:_id', deleteQuote);

module.exports = router;
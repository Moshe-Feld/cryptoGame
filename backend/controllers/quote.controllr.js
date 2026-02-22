const quoteModel = require('../models/quote.model')
const userModel = require('../models/user.modle')
async function getAllQuotes(req, res) {
    try {
        const allQuotes = await quoteModel.find({});
        res.status(200).send(allQuotes);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
async function getQuoteByClass(req, res) {
    try {
        const { classId } = req.params
        const result = await quoteModel.find({ classId })
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function getQuoteById(req, res) {
    try {
        const { id } = req.params;
        const quote = await quoteModel.findById(id)
        res.status(200).send(quote)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function postQuote(req, res) {
    try {
        const newQuote = req.body;
        await quoteModel.create(newQuote);
        res.status(200).send(newQuote)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function deleteQuote(req, res) {
    try {
        const { _id } = req.params
        await userModel.updateMany(
            { levelCompleted: _id  },
            { $pull: { levelCompleted: _id  } }
        );
        const result = await quoteModel.findByIdAndDelete(_id);
        res.status(200).send('quote deleted')
    }catch(err){
        res.status(500).send(err.message);
    }
}

async function deleteAllQuotes(req, res) {
    try {
        const result = await quoteModel.deleteMany({});
        res.status(200).send(`${result.deletedCount} quotes deleted`);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllQuotes,
    getQuoteByClass,
    getQuoteById,
    postQuote,
    deleteQuote,
    deleteAllQuotes
}
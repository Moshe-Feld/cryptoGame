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
        if(result.length < 0) return res.status(404).send({message:"class not found"})
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function getQuoteById(req, res) {
    try {
        const { id } = req.params;
        const result = await quoteModel.findById(id)
        if(!result) return res.status(404).send({message:"quote not found"})
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function postQuote(req, res) {
    try {
        const newQuote = req.body;
        await quoteModel.create(newQuote);
        res.status(201).send("quote added")
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
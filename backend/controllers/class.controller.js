const classModel = require('../models/class.model');
const quoteModel = require('../models/quote.model');
const userModel = require('../models/user.modle');
const userClassModel = require('../models/userClass.model')
async function getAllClasses(req, res) {
    try {
        const result = await classModel.find({});
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function getClssById(req, res) {
    try {
        const { _id } = req.params;
        const result = await classModel.findById(_id);
        if (!result) {
            return res.status(404).send({message:`Class ${_id} not found`});
        }
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function getClassesOfTeacher(req, res) {
    try {
        const { userId } = req.params;
        const result = await classModel.find({ userId });
        if (result.length < 1) {
            return res.status(404).send({message:`${userId} not found`});
        }
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function addClass(req, res) {
    try {
        let joinCode;
        let isUnique = false;
        while (!isUnique) {
            joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            const existing = await classModel.findOne({ joinCode });
            if (!existing) isUnique = true;
        }
        const body = req.body;
        const newClass = {
            ...body,
            joinCode
        }
        await classModel.create(newClass);
        res.status(201).send(`class created`);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function addQuote(req, res) {
    try{
        const {id} = req.params
        const quote = req.body
        const addToClass = await classModel.findById(id)
        if (!addToClass){
            return res.status(404).send({message:`class ${id} not found`})
        }
        if(!addToClass.quotes.includes(quote)){
            addToClass.quotes.push(quote)
            await addToClass.save()
        }
        res.status(201).send(`quote added to the class`)
    }catch(err){
        res.status(500).send(err.message)
    }
}

async function updateClass(req, res) {
    try {
        const { _id } = req.params
        const { subject } = req.body;
        const result = await classModel.findOneAndUpdate(
            { _id },
            { subject },
            { new: true }
        )
        if (!result) {
            return res.status(404).send({message:`class: ${_id} not found`})
        }
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function deleteClass(req, res) {
    try {
        const { _id } = req.params;
        const quotesToDelete = await quoteModel.find({ classId: _id });
        const quotesIds = quotesToDelete.map(quote => quote._id.toString());
        const updateRes = await userModel.updateMany(
            { levelCompleted: { $in: quotesIds } },
            { $pull: { levelCompleted: { $in: quotesIds } } }
        );
        await quoteModel.deleteMany({ classId: _id });
        await userClassModel.deleteMany({classId: _id})
        const result = await classModel.deleteOne({ _id });
        res.status(200).send(`class deleted`)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function deleteAllClasses(req, res) {
    try {
        const result = await classModel.deleteMany({});
        res.status(200).send(`${result.deletedCount} classes deleted`);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllClasses,
    getClssById,
    getClassesOfTeacher,
    addClass,
    addQuote,
    updateClass,
    deleteClass,
    deleteAllClasses
}
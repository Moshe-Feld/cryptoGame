const classModel = require('../models/class.model');
const quoteModel = require('../models/quote.model');
const userModel = require('../models/user.modle');
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
        const response = await classModel.findById(_id);
        if (!response) {
            return res.status(404).send(`${_id} undefine`);
        }
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function getClassesOfTeacher(req, res) {
    try {
        const { userId } = req.params;
        const result = await classModel.find({ userId: userId });
        if (result.length < 1) {
            return res.status(404).send(`${userId} undefine`);
        }
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function getClassesOfStudents(req, res) {
    try {
        const { userName } = req.params;
        const response = await classModel.find({});
        const result = response.filter((item) => item.joinedUsers.includes(userName));
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(res.message);
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
        res.status(200).send(`${body} created`);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function joinToClass(req, res) {
    try {
        const { userName, joinCode } = req.body;
        const classToEdit = await classModel.findOne({ joinCode: joinCode });
        if (!classToEdit) {
            return res.status(404).send(`${joinCode} undefine`);
        }
        if (!classToEdit.joinedUsers.includes(userName)) {
            classToEdit.joinedUsers.push(userName);
            await classToEdit.save();
        }
        res.status(200).send(`${userName} added to class`);
    } catch (err) {
        res.status(500).send(err.message);
    }

}

async function updateClass(req, res) {
    try {
        const { _id } = req.params
        const { subject } = req.body;
        const classToEdit = await classModel.findOneAndUpdate(
            { _id },
            { subject },
            { new: true }
        )
        if (!classToEdit) {
            return res.status(404).send(`class: ${_id} not found`)
        }
        res.status(200).send(classToEdit)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function deleteClass(req, res) {
    try {
        const { _id } = req.params;
        const quotesToDelete = await quoteModel.find({ classId: _id });
        const quotesIds = quotesToDelete.map(quote => quote._id.toString());
        console.log(quotesIds)
        const updateRes = await userModel.updateMany(
            { levelCompleted: { $in: quotesIds } },
            { $pull: { levelCompleted: { $in: quotesIds } } }
        );
        console.log(updateRes);
        await quoteModel.deleteMany({ classId: _id });
        console.log(`deleted ${quotesIds.length} quotes`);
        const result = await classModel.deleteOne({ _id: _id });
        res.status(200).send(`${result} deleted`)
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
    getClassesOfStudents,
    addClass,
    joinToClass,
    updateClass,
    deleteClass,
    deleteAllClasses
}
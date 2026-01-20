const classModel = require('../models/class.model');
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
        const { classId } = req.params;
        const response = await classModel.findOne({ classId: classId });
        if (!response) {
            return res.status(404).send(`${classId} undefine`);
        }
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function getClassesOfTeacher(req, res) {
    try {
        const { teacherId } = req.params;
        const result = await classModel.find({ teacherId: teacherId });
        res.status(200).send(result);
    } catch (err) {
        if (result.length < 1) {
            res.status(404).send(`${teacherId} undefine`);
        }
        else {
            res.status(500).send(err.message);
        }
    }
}

async function getClassesOfStudents(req, res) {
    try{
        const {email} = req.params;
        const response = await classModel.find({});
        const result = response.filter((item)=> item.students.includes(email));
        res.status(200).send(result);
    }catch(err){
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

async function editClass(req, res) {
    try {
        const { email, joinCode } = req.body;
        const classToEdit = await classModel.findOne({ joinCode: joinCode });
        if (!classToEdit) {
            return res.status(404).send(`${joinCode} undefine`);
        }
        if(!classToEdit.students.includes(email)){
            classToEdit.students.push(email);
            await classToEdit.save();
        }
        res.status(200).send(`${email} added to class`);
    } catch (err) {
        res.status(500).send(err.message);
    }

}

async function deleteClass(req, res) {
    try {
        const { classId } = req.params;
        const result = await classModel.findOne({ classId: classId });
        await classModel.deleteOne(result);
        res.status(200).send(`${result} deleted`)
    } catch (err) {
        if (!result) {
            res.status(404).send(`${classId} undegine`)
        }
        else {
            res.status(500).send(err.message);
        }
    }
}

async function deleteAllClasses(req, res) {
    try{
        const result = await classModel.deleteMany({});
        res.status(200).send(`${result.deletedCount} classes deleted`);
    }catch(err){
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllClasses,
    getClssById,
    getClassesOfTeacher,
    getClassesOfStudents,
    addClass,
    editClass,
    deleteClass,
    deleteAllClasses
}
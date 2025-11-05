const classModel = require('../models/class.model');
async function getAllClasses(req, res) {
    try{
        const result = await classModel.find({});
        res.status(200).send(result);
    }catch(err){
        res.status(500).send(err.message);
    }
}

async function getClassesOfTeacher(req, res) {
    try{
        const {teacherId} = req.params;
        const result = await classModel.find({teacherId: teacherId});
        res.status(200).send(result);
    }catch(err){
        if(result.length < 1){
            res.status(404).send(`${teacherId} undefine`);
        }
        else{
            res.status(500).send(err.message);
        }
    }
}

async function addClass(req, res) {
    try{
        const body = req.body;
        await classModel.create(body);
        res.status(200).send(`${body} created`);
    }catch(err){
        res.status(500).send(err.message);
    }
}

async function editClass(req, res) {
    try{
        const {classId} = req.params;
        const {email} = req.body;
        const classToEdid = await classModel.findOneAndUpdate(
            {classId: classId},
            {$push:{students: email}},
            {new: true}
        )
        res.status(200).send(classToEdid);
    }catch(err){
        if(classToEdid.length < 1){
            res.status(404).send(`${classId} undegine`);
        }
        else{
            res.status(500).send(err.message);
        }
    }
}

async function deleteClass(req, res) {
    try{
        const {classId} = req.params;
        const result = await classModel.findOne({classId:classId});
        await classModel.deleteOne(result);
        res.status(200).send(`${result} deleted`)
    }catch(err){
        if(!result){
            res.status(404).send(`${classId} undegine`)
        }
        else{
            res.status(500).send(err.message);
        }
    }
}

module.exports = {
    getAllClasses,
    getClassesOfTeacher,
    addClass,
    editClass,
    deleteClass
}
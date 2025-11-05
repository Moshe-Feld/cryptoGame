const qouteModel = require('../models/qoute.model')

async function getAllQoutes(req, res) {
    try{
        const allQoutes = await qouteModel.find({});
        res.status(200).send(allQoutes);
    }catch(err){
        res.status(500).send(err.message);
    }
}
async function getQouteByClass(req, res) {
    try{
        const {classId} = req.params
        const result = await qouteModel.find({classId: classId})
        res.status(200).send(result)
    }catch(err){
        res.status(500).send(err.message)
    }
}

async function getQouteById(req, res) {
    try{
        const {id} = req.params;
        const qoute = await qouteModel.findById(id)
        res.status(200).send(qoute)
    }catch(err){
        res.status(500).send(err.message)
    }
}

async function postQoute(req, res) {
    try{
        const newQoute = req.body;
        await qouteModel.create(newQoute);
        res.status(200).send(newQoute)
    }catch(err){
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllQoutes,
    getQouteByClass,
    getQouteById,
    postQoute
}